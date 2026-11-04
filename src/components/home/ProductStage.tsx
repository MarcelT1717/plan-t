import React, { Component, lazy, ReactNode, Suspense, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { barsData, flavorIds } from '../../data/barsData';
import { alpha } from '../../lib/color';
import type { FlavorId } from './ProductViewer';

const ProductViewer = lazy(() => import('./ProductViewer'));

function hasWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

class ViewerBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

/** Flat label shown while the 3D viewer loads, or instead of it without WebGL. */
function StaticBar({ flavor }: { flavor: FlavorId }) {
  return (
    <div className="absolute inset-0 flex items-start justify-center pt-[9vh] md:items-center md:pt-0 md:justify-end md:pr-[14%] pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.img
          key={flavor}
          src={barsData[flavor].label}
          alt={`Royal T ${barsData[flavor].variant} label`}
          className="h-[40vh] md:h-[62vh] w-auto rounded-xl shadow-2xl shadow-black/70"
          initial={{ opacity: 0, rotateY: -40 }}
          animate={{ opacity: 1, rotateY: 0, y: [0, -10, 0] }}
          exit={{ opacity: 0, rotateY: 40 }}
          transition={{ duration: 0.5, y: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }}
        />
      </AnimatePresence>
    </div>
  );
}

export function ProductStage({ flavor }: { flavor: FlavorId }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);
  const [webgl] = useState(hasWebGL);
  const [portrait] = useState(() => window.innerWidth < 768);

  // Stop rendering frames when the stage is scrolled out of view.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const fallback = <StaticBar flavor={flavor} />;

  return (
    <div
      id="product-stage"
      ref={ref}
      className="absolute inset-0"
      style={{ '--glow-x': portrait ? '50%' : '68%', '--glow-y': portrait ? '30%' : '50%' } as React.CSSProperties}
    >
      {/* Honey glow plus a flavour glow that cross-fades on change */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at var(--glow-x) var(--glow-y), rgba(229,166,56,0.16) 0%, transparent 42%)' }}
      />
      {flavorIds.map((id) => (
        <div
          key={id}
          className="absolute inset-0 pointer-events-none transition-opacity duration-700"
          style={{
            opacity: id === flavor ? 1 : 0,
            background: `radial-gradient(circle at var(--glow-x) var(--glow-y), ${alpha(barsData[id as FlavorId].hex, 0.38)} 0%, transparent 34%)`,
          }}
        />
      ))}

      <div className="absolute inset-0">
        {webgl ? (
          <ViewerBoundary fallback={fallback}>
            <Suspense fallback={fallback}>
              <ProductViewer flavor={flavor} active={active} />
            </Suspense>
          </ViewerBoundary>
        ) : (
          fallback
        )}
      </div>
    </div>
  );
}
