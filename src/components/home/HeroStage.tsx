import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AnimatePresence, MotionValue, easeInOut, motion, useMotionTemplate, useMotionValue,
  useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTime, useTransform,
} from 'framer-motion';
import { barsData, flavorIds, ingredientCatalog } from '../../data/barsData';
import { alpha } from '../../lib/color';
import { FlavorSelector } from './FlavorSelector';

export type FlavorId = keyof typeof barsData;
type IngredientKey = keyof typeof ingredientCatalog;
type Item = { key: IngredientKey; name: string; image: string; description: string; note?: string };

/*
 * The hero and the ingredients reveal are one pinned screen. Scrolling through
 * the stage drives a single progress value (0 → 1):
 *   0.00–0.30  hero copy fades, the pack glides to centre and shrinks
 *   0.22–0.38  "Only Five" heading fades in
 *   0.36–0.50  top seal tears off
 *   0.42–0.64  raw bar rises out of the pack
 *   0.58–0.88  ingredients slide in with their arrows
 *   0.88–1.00  hold, then the page scrolls on
 */
const STAGE_VH = 360; // total height of the stage
const SCROLL_VH = STAGE_VH - 100; // how far it scrolls while pinned
const PHASE = {
  travel: [0, 0.3],
  copyOut: [0, 0.18],
  heading: [0.22, 0.38],
  tear: [0.36, 0.5],
  rise: [0.42, 0.64],
  callouts: { start: 0.58, stagger: 0.03, span: 0.12 }, // last arrow finishes by ~0.85
};
const TEAR = 11; // % of the pack height that tears away
const PACK_ASPECT = 0.62; // pack width / height
const RISE = 0.24; // how far the risen bar sticks out above the pack (× pack height)
const LIST_GAP = 28; // px between the pack and the ingredient list below it

// `callouts`: room for the ingredients beside the pack; narrower screens list them below it.
type Layout = { w: number; h: number; mobile: boolean; callouts: boolean };
const readLayout = (): Layout => {
  const w = window.innerWidth;
  return { w, h: window.innerHeight, mobile: w < 768, callouts: w >= 1024 };
};
// Measured from the DOM: where the heading ends and how tall the ingredient list is.
type Measured = { headingBottom: number; listH: number };

/**
 * Pack size and position (px, centre of the pack) in the hero and in the ingredients view.
 * In the ingredients view the pack and the bar rising out of it fit between the heading
 * and the ingredient list, so nothing overlaps on short screens.
 */
function packGeometry({ w, h, mobile, callouts }: Layout, { headingBottom, listH }: Measured) {
  const hero = mobile
    ? { heroH: 0.36 * h, heroX: 0, heroY: 0.31 * h }
    : { heroH: Math.min(0.7 * h, 760), heroX: Math.min(0.22 * w, 340), heroY: 0.54 * h };
  const top = headingBottom + (mobile ? 20 : 36);
  const bottom = callouts ? h - 40 : h - listH - LIST_GAP - 64; // keep the list clear of the bottom fade
  const space = bottom - top;
  const finalH = Math.max(0.16 * h, Math.min((mobile ? 0.3 : 0.42) * h, space / (1 + RISE)));
  const finalY = top + (space - finalH * (1 + RISE)) / 2 + finalH * (RISE + 0.5);
  return { ...hero, finalH, finalY };
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.15 + i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } }),
};

function HoneycombPattern() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.06]" aria-hidden="true">
      <defs>
        <pattern id="honeycomb" width="56" height="97" patternUnits="userSpaceOnUse" patternTransform="scale(0.9)">
          <path d="M28 0 L56 16 L56 48 L28 64 L0 48 L0 16 Z M28 64 L28 97" fill="none" stroke="#D4AF65" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#honeycomb)" />
    </svg>
  );
}

function Callout({ item, side, index, progress }: { item: Item; side: 'left' | 'right'; index: number; progress: MotionValue<number> }) {
  const left = side === 'left';
  const start = PHASE.callouts.start + index * PHASE.callouts.stagger;
  const range = [start, start + PHASE.callouts.span];
  const opacity = useTransform(progress, range, [0, 1]);
  const x = useTransform(progress, range, [left ? -30 : 30, 0], { ease: easeInOut });
  const arrow = useTransform(progress, [start + 0.04, start + PHASE.callouts.span + 0.03], [0, 1]);
  const arrowHead = useTransform(arrow, [0.85, 1], [0, 1]);

  return (
    <motion.div className={`flex items-center gap-3 xl:gap-4 ${left ? 'text-right' : 'flex-row-reverse text-left'}`} style={{ opacity, x }}>
      <div className={`flex-1 min-w-0 max-w-[17rem] ${left ? 'ml-auto' : 'mr-auto'}`}>
        <p className="font-display text-base xl:text-lg text-[#F5F1E8] tracking-[0.06em] leading-snug">{item.name}</p>
        <p className="text-[#F5F1E8]/55 text-xs leading-relaxed mt-1">{item.description}</p>
        {item.note && <p className="text-[#E5A638]/80 text-[9px] font-semibold tracking-[0.25em] uppercase mt-1.5">{item.note}</p>}
      </div>
      <img src={item.image} alt="" className="w-14 h-14 xl:w-20 xl:h-20 rounded-full object-cover ring-1 ring-[#D4AF65]/40 flex-shrink-0" />
      <svg viewBox="0 0 72 24" className={`w-12 h-4 xl:w-[72px] xl:h-6 flex-shrink-0 ${left ? '' : '-scale-x-100'}`} aria-hidden="true">
        <motion.path d="M2 12 C 22 5, 44 5, 66 12" fill="none" stroke="#D4AF65" strokeWidth="1.5" strokeLinecap="round" style={{ pathLength: arrow, opacity: arrow }} />
        <motion.path d="M59 6 L67 12 L59 18" fill="none" stroke="#D4AF65" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: arrowHead }} />
      </svg>
    </motion.div>
  );
}

function MobileItem({ item, index, progress }: { item: Item; index: number; progress: MotionValue<number> }) {
  const start = PHASE.callouts.start + index * PHASE.callouts.stagger;
  const opacity = useTransform(progress, [start, start + PHASE.callouts.span], [0, 1]);
  const y = useTransform(progress, [start, start + PHASE.callouts.span], [14, 0]);
  return (
    <motion.div className="flex items-center gap-3 w-[calc(50%-0.5rem)] sm:w-44" style={{ opacity, y }}>
      <img src={item.image} alt="" className="w-11 h-11 sm:w-14 sm:h-14 rounded-full object-cover ring-1 ring-[#D4AF65]/40 flex-shrink-0" />
      <p className="font-display text-sm sm:text-base text-[#F5F1E8] tracking-[0.05em] leading-tight">{item.name}</p>
    </motion.div>
  );
}

function Glow({ id, active, at }: { id: FlavorId; active: boolean; at: MotionValue<string> }) {
  const color = alpha(barsData[id].hex, 0.32);
  const backgroundImage = useMotionTemplate`radial-gradient(circle at ${at}, ${color} 0%, rgba(229,166,56,0.07) 30%, transparent 58%)`;
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none transition-opacity duration-700"
      style={{ opacity: active ? 1 : 0, backgroundImage }}
    />
  );
}

interface HeroStageProps {
  flavor: FlavorId;
  onFlavorChange: (flavor: FlavorId) => void;
}

export function HeroStage({ flavor, onFlavorChange }: HeroStageProps) {
  const stageRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [layout, setLayout] = useState<Layout>(readLayout);
  const [measured, setMeasured] = useState<Measured>(() => ({ headingBottom: 0.25 * window.innerHeight, listH: 0 }));
  const headingRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const g = packGeometry(layout, measured);
  const geometryRef = useRef(g);
  geometryRef.current = g;

  // Track the heading and list sizes (they change with fonts loading and wrapping).
  useLayoutEffect(() => {
    const measure = () => {
      const heading = headingRef.current;
      setMeasured((m) => {
        const headingBottom = heading ? heading.offsetTop + heading.offsetHeight : m.headingBottom;
        const listH = listRef.current?.offsetHeight ?? 0;
        return headingBottom === m.headingBottom && listH === m.listH ? m : { headingBottom, listH };
      });
    };
    measure();
    const observer = new ResizeObserver(measure);
    [headingRef.current, listRef.current].forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [layout]);

  // Re-measure on width changes only (mobile URL bars change the height constantly).
  useEffect(() => {
    let lastW = window.innerWidth;
    const onResize = () => {
      if (window.innerWidth === lastW) return;
      lastW = window.innerWidth;
      setLayout(readLayout());
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Preload every flavour's pack and bar so switching never shows a half-loaded image.
  useEffect(() => {
    flavorIds.forEach((id) => {
      const b = barsData[id as FlavorId] as { packImage?: string; rawBar: string };
      [b.packImage, b.rawBar].forEach((src) => { if (src) new Image().src = src; });
    });
  }, []);

  const { scrollYProgress } = useScroll({ target: stageRef, offset: ['start start', 'end end'] });
  // One light spring smooths wheel steps without making the motion feel floaty.
  const sprung = useSpring(scrollYProgress, { stiffness: 220, damping: 36, mass: 0.35, restDelta: 0.0002 });
  const progress = reduced ? scrollYProgress : sprung;

  // Pack position and scale.
  const packX = useMotionValue(0);
  const packY = useMotionValue(0);
  const packScale = useMotionValue(1);
  const placePack = () => {
    const g = geometryRef.current;
    const raw = (progress.get() - PHASE.travel[0]) / (PHASE.travel[1] - PHASE.travel[0]);
    const t = easeInOut(Math.min(1, Math.max(0, raw)));
    packX.set(g.heroX * (1 - t));
    packY.set(g.heroY + (g.finalY - g.heroY) * t);
    packScale.set(1 + (g.finalH / g.heroH - 1) * t);
  };
  useMotionValueEvent(progress, 'change', placePack);
  useLayoutEffect(placePack); // also after every render (layout or flavour change)

  // Gentle float while the pack is in the hero.
  const time = useTime();
  const floatY = useTransform([time, progress], ([t, p]: number[]) =>
    reduced ? 0 : Math.sin(t / 950) * 9 * Math.max(0, 1 - p / PHASE.travel[1]));

  // Copy, heading and background.
  const copyOpacity = useTransform(progress, PHASE.copyOut, [1, 0]);
  const copyY = useTransform(progress, PHASE.copyOut, [0, -40]);
  const copyPointer = useTransform(progress, (p) => (p < PHASE.copyOut[1] * 0.8 ? 'auto' : 'none'));
  const headingOpacity = useTransform(progress, PHASE.heading, [0, 1]);
  const headingY = useTransform(progress, PHASE.heading, [24, 0]);
  const honeycomb = useTransform(progress, [0.15, 0.4], [0, 1]);
  const glowX = useTransform(progress, PHASE.travel, [layout.mobile ? 50 : 72, 50]);
  const glowY = useTransform(progress, PHASE.travel, [(g.heroY / layout.h) * 100, (g.finalY / layout.h) * 100]);
  const glowAt = useMotionTemplate`${glowX}% ${glowY}%`;

  // Unwrap.
  const sealX = useTransform(progress, PHASE.tear, [0, 40], { ease: easeInOut });
  const sealY = useTransform(progress, PHASE.tear, [0, -80], { ease: easeInOut });
  const sealRotate = useTransform(progress, PHASE.tear, [0, -18], { ease: easeInOut });
  const sealOpacity = useTransform(progress, [PHASE.tear[0] + 0.05, PHASE.tear[1]], [1, 0]);
  const barY = useTransform(progress, PHASE.rise, ['0%', '-58%'], { ease: easeInOut });

  const bar = barsData[flavor] as (typeof barsData)[FlavorId] & { packImage?: string; rawBar: string };
  const pack = bar.packImage ?? bar.label;
  const item = (key: IngredientKey): Item => ({ key, ...(ingredientCatalog[key] as Omit<Item, 'key'>) });
  const leftItems = [item('dates'), item(bar.featured as IngredientKey), item(bar.nut as IngredientKey)];
  const rightItems = [item('honey'), item('royalJelly')];

  // Callouts span the unwrapped bar, from the top of the risen bar to the bottom of the pack.
  const barTop = g.finalY - g.finalH * (0.5 + RISE);
  const barHeight = g.finalH * (1 + RISE);
  const spacer = g.finalH * PACK_ASPECT + 48;

  // "See what's inside" jumps to the fully unwrapped view.
  const seeInside = () => {
    const stage = stageRef.current;
    if (!stage) return;
    const top = stage.getBoundingClientRect().top + window.scrollY + (SCROLL_VH / 100) * window.innerHeight * 0.92;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <section ref={stageRef} className="relative" style={{ height: `${STAGE_VH}vh` }} aria-label="Royal T nutrition bars">
      {/* Anchor for /#ingredients links: lands on the unwrapped view */}
      <div id="ingredients" className="absolute left-0 w-px h-px" style={{ top: `${((SCROLL_VH * 0.92) / STAGE_VH) * 100}%` }} />

      <div className="sticky top-0 h-svh overflow-hidden">
        {/* Background: flavour glow that follows the pack, and honeycomb for the ingredients view */}
        {flavorIds.map((id) => <Glow key={id} id={id as FlavorId} active={id === flavor} at={glowAt} />)}
        <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity: honeycomb }}>
          <HoneycombPattern />
        </motion.div>

        {/* Hero copy */}
        <motion.div
          className="absolute inset-x-0 bottom-0 top-[52%] md:top-0 flex md:items-center"
          style={{ opacity: copyOpacity, y: copyY, pointerEvents: copyPointer }}
        >
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:pt-16">
            <div className="max-w-xl md:w-1/2">
              <motion.p variants={fadeUp} initial="hidden" animate="show" custom={0}
                className="text-[#D4AF65] text-[10px] sm:text-xs font-semibold tracking-[0.4em] uppercase mb-4 md:mb-7">
                Men&apos;s Health<span className="hidden sm:inline"> &middot; Raw Honey &amp; Royal Jelly</span>
              </motion.p>
              <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1}
                className="font-display text-[2.4rem] leading-[1.02] sm:text-6xl lg:text-7xl text-[#F5F1E8] mb-4 md:mb-7">
                Nutrition,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F1D79A] via-[#D4AF65] to-[#A9822F]">Redefined.</span>
              </motion.h1>
              <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2}
                className="text-[#F5F1E8]/65 text-base md:text-lg leading-relaxed mb-5 md:mb-7">
                Five real ingredients. Three distinct flavors. One Royal Standard.
              </motion.p>
              <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3}>
                <FlavorSelector id="hero" value={flavor} onChange={onFlavorChange} className="-ml-4 sm:-ml-5 mb-6 md:mb-10" />
              </motion.div>
              <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4} className="flex flex-row gap-3 sm:gap-4">
                <button
                  onClick={seeInside}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center px-5 sm:px-8 py-4 bg-gradient-to-r from-[#E4C57E] via-[#D4AF65] to-[#B98F3E] text-[#080808] text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase hover:shadow-[0_0_40px_rgba(212,175,101,0.35)] transition-shadow duration-300"
                >
                  See What's Inside
                </button>
                <Link
                  to="/our-mission"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center px-5 sm:px-8 py-4 border border-[#D4AF65]/40 text-[#D4AF65] text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase hover:border-[#D4AF65] hover:bg-[#D4AF65]/5 transition-colors duration-300"
                >
                  Our Mission
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Ingredients heading */}
        <motion.div
          ref={headingRef}
          className="absolute inset-x-0 text-center px-4 pointer-events-none"
          style={{ top: layout.mobile ? 'calc(64px + 2.5%)' : 'calc(72px + 4%)', opacity: headingOpacity, y: headingY }}
        >
          <p className="text-[#D4AF65] text-[10px] sm:text-xs font-semibold tracking-[0.4em] uppercase mb-3 md:mb-4">The Royal Ingredients</p>
          <h2 className="font-display text-[1.9rem] sm:text-5xl lg:text-[3.4rem] text-[#F5F1E8] leading-tight">
            Only Five. Nothing Unnecessary.
          </h2>
        </motion.div>

        {/* Ingredient callouts (wide screens) */}
        {layout.callouts && (
          <div
            className="absolute inset-x-0 flex justify-center px-6 xl:px-10 pointer-events-none"
            style={{ top: barTop, height: barHeight }}
          >
            <div className="flex-1 max-w-[440px] flex flex-col justify-evenly">
              {leftItems.map((it, i) => <Callout key={it.key} item={it} side="left" index={i} progress={progress} />)}
            </div>
            <div className="flex-shrink-0" style={{ width: spacer }} />
            <div className="flex-1 max-w-[440px] flex flex-col justify-evenly">
              {rightItems.map((it, i) => <Callout key={it.key} item={it} side="right" index={i + 3} progress={progress} />)}
            </div>
          </div>
        )}

        {/* Ingredient list below the pack (phones and tablets) */}
        {!layout.callouts && (
          <div
            ref={listRef}
            className="absolute inset-x-0 mx-auto max-w-2xl px-6 flex flex-wrap justify-center gap-4 pointer-events-none"
            style={{ top: g.finalY + g.finalH / 2 + LIST_GAP }}
          >
            {[...rightItems, ...leftItems].map((it, i) => <MobileItem key={it.key} item={it} index={i} progress={progress} />)}
          </div>
        )}

        {/* The pack: one element from hero to unwrap */}
        <motion.div
          className="absolute left-1/2 top-0 w-0 h-0 pointer-events-none"
          style={{ x: packX, y: packY, scale: packScale, transformOrigin: '0 0', willChange: 'transform' }}
        >
          <motion.div style={{ y: floatY }}>
            <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ height: g.heroH }}>
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={flavor}
                  className="relative h-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  {/* Raw bar, behind the pack, rising out of the torn top */}
                  <motion.div
                    className="absolute left-[12%] w-[76%] top-[13%] h-[64%] rounded-md overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
                    style={{ y: barY }}
                  >
                    <div
                      className="absolute left-1/2 top-1/2 w-[137%] h-[73%]"
                      style={{ backgroundImage: `url(${bar.rawBar})`, backgroundSize: '100% 100%', transform: 'translate(-50%, -50%) rotate(90deg)' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-black/45" />
                    <div className="absolute inset-x-0 top-0 h-2 bg-white/20" />
                  </motion.div>

                  {/* Pack body, open at the tear line */}
                  <img
                    src={pack}
                    alt={`Royal T ${bar.variant} nutrition bar`}
                    className="relative h-full w-auto max-w-none drop-shadow-[0_40px_50px_rgba(0,0,0,0.75)]"
                    style={{ clipPath: `inset(${TEAR}% 0 0 0)` }}
                  />
                  {/* Top seal */}
                  <motion.img
                    src={pack}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-auto max-w-none"
                    style={{ clipPath: `inset(0 0 ${100 - TEAR}% 0)`, transformOrigin: '20% 10%', x: sealX, y: sealY, rotate: sealRotate, opacity: sealOpacity }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>

        {/* Soft fade into the next section */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#1A1714] pointer-events-none" />
      </div>
    </section>
  );
}
