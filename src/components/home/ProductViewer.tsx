import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, Lightformer, PerformanceMonitor, useGLTF, useTexture } from '@react-three/drei';
import gsap from 'gsap';
import { barsData, flavorIds } from '../../data/barsData';
import { productMotion as m, prefersReducedMotion } from '../../lib/productMotion';

export type FlavorId = keyof typeof barsData;

/*
 * The wrapper comes from the supplied prototype models (public/models/RoyalT_*.glb,
 * dimensions in metres). Their foil and seams ship without materials and the back
 * repeats the front artwork as a placeholder, so this file applies a gold foil
 * finish and shows plain foil on the back. Swap in production GLBs at the same
 * paths and keep the node names (gold_foil_body, front_artwork, back_placeholder,
 * geometry_7..10 = top crimp) for the unwrap to keep working.
 */

const modelUrl = (id: FlavorId) => `/models/RoyalT_${barsData[id].variant}.glb`;
flavorIds.forEach((id) => useGLTF.preload(modelUrl(id as FlavorId)));

/** Model metres → scene units. The pack is 0.112 m tall. */
const S = 16;
const PACK_TOP = 0.056 * S;
const TOP_SEAMS = ['geometry_7', 'geometry_8', 'geometry_9', 'geometry_10'];
/** Hinge line for the torn seal, in model metres. */
const SEAM_PIVOT = 0.0506;

// Unwrapped bar, sized to fit inside the pack.
const RW = 0.84;
const RH = 1.3;
const RD = 0.16;
const RAW_INSIDE_Y = -0.15;
const RAW_OUT_Y = PACK_TOP + RH / 2 + 0.03;
/** How far apart the pack and bar sit once unwrapped. */
const SIDE_OFFSET = 0.75;

const { damp, lerp, clamp } = THREE.MathUtils;
const smoothstep = (t: number) => {
  const c = clamp(t, 0, 1);
  return c * c * (3 - 2 * c);
};
/** Maps u from [a, b] to [0, 1], eased. */
const phase = (u: number, a: number, b: number) => smoothstep((u - a) / (b - a));

const foil = new THREE.MeshPhysicalMaterial({
  color: '#f0c45c',
  metalness: 1,
  roughness: 0.22,
  clearcoat: 0.6,
  clearcoatRoughness: 0.18,
  envMapIntensity: 1.6,
});
const seamFoil = foil.clone();
seamFoil.roughness = 0.38;
seamFoil.color.set('#d9ae4c');
const tornSeamFoil = seamFoil.clone();
tornSeamFoil.transparent = true;

/** Loads a flavour's pack and splits it into the parts the animation needs. */
function usePack(id: FlavorId) {
  const { scene } = useGLTF(modelUrl(id));
  return useMemo(() => {
    const root = scene.clone(true);
    // Top crimp ridges hinge from the top edge of the pack when they tear away.
    const topSeams = new THREE.Group();
    topSeams.position.y = SEAM_PIVOT;
    const seamHolder = new THREE.Group();
    seamHolder.position.y = -SEAM_PIVOT;
    topSeams.add(seamHolder);
    root.traverse((node) => {
      const mesh = node as THREE.Mesh;
      if (!mesh.isMesh) return;
      // The prototype models ship without normals, which lighting needs.
      if (!mesh.geometry.attributes.normal) {
        mesh.geometry = mesh.geometry.clone();
        mesh.geometry.computeVertexNormals();
      }
      if (mesh.name === 'front_artwork') {
        const source = mesh.material as THREE.MeshStandardMaterial;
        if (source.map) source.map.anisotropy = 8;
        mesh.material = new THREE.MeshPhysicalMaterial({
          map: source.map,
          roughness: 0.45,
          metalness: 0,
          clearcoat: 0.5,
          clearcoatRoughness: 0.2,
          envMapIntensity: 0.3,
        });
      } else if (mesh.name === 'back_placeholder' || mesh.name === 'gold_foil_body') {
        mesh.material = foil;
      } else {
        mesh.material = TOP_SEAMS.includes(mesh.name) ? tornSeamFoil : seamFoil;
      }
      mesh.castShadow = true;
    });
    // Collect the top crimp ridges so they can tear away together.
    for (const name of TOP_SEAMS) {
      const seam = root.getObjectByName(name);
      if (seam) seamHolder.add(seam);
    }
    return { root, topSeams };
  }, [scene]);
}

const rawUrls = flavorIds.map((id) => barsData[id as FlavorId].rawBar as string);

function RawBar({ flavor, clip }: { flavor: FlavorId; clip: THREE.Plane }) {
  const [bump, ...maps] = useTexture(['/royal-t/raw-bar-bump.webp', ...rawUrls]) as THREE.Texture[];
  const materials = useMemo(() => {
    // The photo crop is landscape; turn it a quarter so it runs along the bar's long face.
    const prep = (tex: THREE.Texture) => {
      tex.center.set(0.5, 0.5);
      tex.rotation = Math.PI / 2;
      tex.needsUpdate = true;
      return tex;
    };
    prep(bump);
    return Object.fromEntries(
      flavorIds.map((id, i) => {
        const map = prep(maps[i]);
        map.colorSpace = THREE.SRGBColorSpace;
        return [id, new THREE.MeshPhysicalMaterial({
          map,
          bumpMap: bump,
          bumpScale: 3,
          roughness: 0.6,
          clearcoat: 0.3,
          clearcoatRoughness: 0.5,
          clippingPlanes: [clip],
        })];
      })
    ) as unknown as Record<FlavorId, THREE.Material>;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bump, clip, ...maps]);

  return (
    <mesh material={materials[flavor]} castShadow>
      <boxGeometry args={[RW, RH, RD]} />
    </mesh>
  );
}

function Pack({ flavor }: { flavor: FlavorId }) {
  const packs = {
    red: usePack('red' as FlavorId),
    purple: usePack('purple' as FlavorId),
    orange: usePack('orange' as FlavorId),
  } as Record<string, ReturnType<typeof usePack>>;
  const { root, topSeams } = packs[flavor];
  return (
    <group scale={S}>
      <primitive object={root} />
      <primitive object={topSeams} name="top-seams" />
    </group>
  );
}

function Product({ flavor, reduced }: { flavor: FlavorId; reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const wrapper = useRef<THREE.Group>(null);
  const raw = useRef<THREE.Group>(null);
  const rim = useRef<THREE.PointLight>(null);
  const glint = useRef<THREE.PointLight>(null);
  const clip = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), []);
  const tmp = useMemo(() => new THREE.Vector3(), []);
  const tmpNormal = useMemo(() => new THREE.Vector3(), []);
  const flavorColor = useMemo(() => new THREE.Color(), []);

  // Flavour change: a short, gentle turn to swap packs.
  const [shown, setShown] = useState<FlavorId>(flavor);
  const shownRef = useRef(shown);
  useEffect(() => {
    if (flavor === shownRef.current) return;
    const swap = () => { shownRef.current = flavor; setShown(flavor); };
    if (reduced) { swap(); return; }
    const tl = gsap.timeline();
    tl.to(m, { switchRot: 0.6, switchScale: 0.94, duration: 0.35, ease: 'sine.in', onComplete: swap })
      .fromTo(m, { switchRot: -0.6 }, { switchRot: 0, switchScale: 1, duration: 0.6, ease: 'sine.out' });
    return () => { tl.kill(); };
  }, [flavor, reduced]);
  useEffect(() => () => { m.switchRot = 0; m.switchScale = 1; }, []);

  useFrame((state, dt) => {
    const g = group.current;
    if (!g || !wrapper.current || !raw.current) return;
    const { viewport, camera, clock, size } = state;
    const t = clock.elapsedTime;
    const portrait = size.width < 768;
    const u = m.unwrap;

    // Position: hero pose → centre → aside, driven by the scroll timeline.
    const heroX = portrait ? 0 : Math.min(viewport.width * 0.2, 2.1);
    const heroY = portrait ? 0.95 : -0.05;
    const asideX = portrait ? 0 : -viewport.width * 0.3;
    const asideY = portrait ? 2.8 : 0;
    const float = reduced ? 0 : Math.sin(t * 0.8) * 0.04;
    const x = lerp(lerp(heroX, 0, m.center), asideX, m.aside);
    const y = lerp(lerp(heroY, 0, m.center), asideY, m.aside) + float;
    g.position.x = damp(g.position.x, x, 3, dt);
    g.position.y = damp(g.position.y, y, 3, dt);

    const sway = reduced ? 0 : Math.sin(t * 0.35) * 0.12;
    const heroAngle = portrait ? 0 : -0.2 * (1 - m.center);
    g.rotation.y = damp(g.rotation.y, sway + heroAngle + m.switchRot, 4, dt);
    g.rotation.x = reduced ? 0 : Math.sin(t * 0.5) * 0.02;

    // Shrink early in the unwrap so the rising bar stays clear of the top of the screen.
    const scale = (portrait ? 0.5 : 1.1) * m.switchScale * lerp(1, 0.8, m.aside) * lerp(1, 0.66, phase(u, 0, 0.35));
    g.scale.setScalar(damp(g.scale.x, scale, 4, dt));
    camera.position.z = damp(camera.position.z, 6 - m.zoom + u * 0.6, 3, dt);

    // Unwrap: the top crimp tears away, the bar rises out, then it's presented.
    const tear = phase(u, 0, 0.3);
    const rise = phase(u, 0.15, 0.6);
    const present = phase(u, 0.55, 1);

    const seams = wrapper.current.getObjectByName('top-seams');
    if (seams) {
      seams.position.set(0, SEAM_PIVOT + tear * 0.07, -tear * 0.02);
      seams.rotation.set(-tear * 1.2, 0, tear * 0.3);
      seams.visible = tear < 0.999;
    }
    tornSeamFoil.opacity = 1 - phase(u, 0.1, 0.3);

    // Presented side by side: pack to the left, bar to the right, turned slightly towards each other.
    wrapper.current.position.set(-present * SIDE_OFFSET, 0, -present * 0.1);
    wrapper.current.rotation.set(0, present * 0.3, 0);
    wrapper.current.scale.setScalar(1 - present * 0.08);

    raw.current.visible = u > 0.001;
    raw.current.position.set(present * SIDE_OFFSET, lerp(lerp(RAW_INSIDE_Y, RAW_OUT_Y, rise), 0, present), present * 0.2);
    raw.current.rotation.set(0, -present * 0.3, 0);

    // While the bar is still coming out, hide whatever is below the top of the pack.
    wrapper.current.updateWorldMatrix(true, false);
    if (present < 0.001) {
      tmp.set(0, PACK_TOP, 0).applyMatrix4(wrapper.current.matrixWorld);
      tmpNormal.set(0, 1, 0).transformDirection(wrapper.current.matrixWorld);
      clip.setFromNormalAndCoplanarPoint(tmpNormal, tmp);
    } else {
      clip.set(tmpNormal.set(0, 1, 0), 1000);
    }

    if (rim.current) {
      flavorColor.set(barsData[flavor].hex);
      rim.current.color.lerp(flavorColor, 1 - Math.exp(-3 * dt));
    }
    if (glint.current) {
      glint.current.position.set(g.position.x + Math.sin(t * 0.3) * 3, 1.4 + Math.cos(t * 0.22) * 0.5, 2.6);
    }
  });

  return (
    <>
      <pointLight ref={rim} position={[-2.5, 1.2, -2]} intensity={30} distance={12} color={barsData[flavor].hex} />
      <pointLight ref={glint} intensity={14} distance={7} color="#fff2d0" />
      <group ref={group}>
        <group ref={wrapper}>
          <Pack flavor={shown} />
        </group>
        <group ref={raw} visible={false}>
          <RawBar flavor={shown} clip={clip} />
        </group>
      </group>
    </>
  );
}

function StudioLights() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 4, 5]} intensity={1.6} color="#fff1d6" />
      <spotLight position={[0, 5, 4]} angle={0.5} penumbra={1} intensity={40} color="#ffe2a8" />
      <Environment resolution={512} frames={1}>
        <Lightformer form="rect" intensity={3.5} color="#fff4e0" position={[0, 4, 0]} rotation-x={Math.PI / 2} scale={[8, 2.5, 1]} />
        <Lightformer form="rect" intensity={2.6} color="#ffe9c4" position={[-4, 0.5, 1]} rotation-y={Math.PI / 2} scale={[0.8, 6, 1]} />
        <Lightformer form="rect" intensity={2.6} color="#ffe9c4" position={[4, 0.5, 1]} rotation-y={-Math.PI / 2} scale={[0.8, 6, 1]} />
        <Lightformer form="rect" intensity={2} color="#ffffff" position={[-2, 1, 5]} scale={[1.2, 4, 1]} />
        <Lightformer form="rect" intensity={1.5} color="#ffffff" position={[2.5, -0.5, 5]} scale={[0.6, 3, 1]} />
        <Lightformer form="ring" intensity={1.8} color="#E5A638" position={[0, -3, 2]} rotation-x={-Math.PI / 2} scale={3} />
      </Environment>
    </>
  );
}

export default function ProductViewer({ flavor, active }: { flavor: FlavorId; active: boolean }) {
  const [dpr, setDpr] = useState(1.5);
  const reduced = prefersReducedMotion();

  return (
    <Canvas
      dpr={dpr}
      frameloop={active ? 'always' : 'never'}
      camera={{ position: [0, 0, 6], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.NeutralToneMapping;
        gl.localClippingEnabled = true;
      }}
      style={{ pointerEvents: 'none' }}
    >
      <PerformanceMonitor
        onDecline={() => setDpr(1)}
        onIncline={() => setDpr(Math.min(2, window.devicePixelRatio || 1))}
      />
      <StudioLights />
      <Suspense fallback={null}>
        <Product flavor={flavor} reduced={reduced} />
      </Suspense>
      <ContactShadows position={[0, -1.4, 0]} scale={10} blur={2.8} far={4} opacity={0.55} resolution={512} color="#000000" />
    </Canvas>
  );
}
