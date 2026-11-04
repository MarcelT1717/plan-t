import React from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { barsData } from '../../data/barsData';
import { tint } from '../../lib/color';
import { FlavorSelector } from './FlavorSelector';
import type { FlavorId } from './ProductViewer';

interface Hero3DProps {
  flavor: FlavorId;
  onFlavorChange: (flavor: FlavorId) => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.15 + i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } }),
};

/** Hero copy. The 3D bar itself lives in <ProductStage>, pinned behind this section. */
export function Hero3D({ flavor, onFlavorChange }: Hero3DProps) {
  const bar = barsData[flavor];

  return (
    <section className="relative h-screen min-h-[640px] flex items-end md:items-center pointer-events-none" aria-label="Royal T nutrition bars">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 md:pb-0">
        <div className="max-w-xl pointer-events-auto">
          <motion.p
            variants={fadeUp} initial="hidden" animate="show" custom={0}
            className="text-[#D4AF65] text-[10px] sm:text-xs font-semibold tracking-[0.4em] uppercase mb-5 md:mb-7"
          >
            Men&apos;s Health<span className="hidden sm:inline"> &middot; Raw Honey &amp; Royal Jelly</span>
          </motion.p>

          <motion.h1
            variants={fadeUp} initial="hidden" animate="show" custom={1}
            className="font-display text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-7xl text-[#F5F1E8] mb-5 md:mb-7"
          >
            Nutrition,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F1D79A] via-[#D4AF65] to-[#A9822F]">Redefined.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp} initial="hidden" animate="show" custom={2}
            className="text-[#F5F1E8]/65 text-base md:text-lg leading-relaxed mb-7 md:mb-9"
          >
            Five real ingredients. Three distinct flavors. One Royal Standard.
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3}>
            <FlavorSelector id="hero" value={flavor} onChange={onFlavorChange} className="-ml-4 sm:-ml-5 mb-4" />
            <div className="h-14 mb-7 md:mb-9" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.div
                  key={flavor}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                >
                  <p className="font-display text-lg tracking-[0.12em]" style={{ color: tint(bar.hex, 0.4) }}>
                    Royal T {bar.variant.charAt(0) + bar.variant.slice(1).toLowerCase()} · {bar.flavor}
                  </p>
                  <p className="text-[#F5F1E8]/50 text-sm mt-1">{bar.ingredients.map((i: { name: string }) => i.name).join(', ')}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a
              href="#collection"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#E4C57E] via-[#D4AF65] to-[#B98F3E] text-[#080808] text-xs font-bold tracking-[0.25em] uppercase hover:shadow-[0_0_40px_rgba(212,175,101,0.35)] transition-shadow duration-300"
            >
              Explore the Bars
            </a>
            <Link
              to="/our-mission"
              className="inline-flex items-center justify-center px-8 py-4 border border-[#D4AF65]/40 text-[#D4AF65] text-xs font-bold tracking-[0.25em] uppercase hover:border-[#D4AF65] hover:bg-[#D4AF65]/5 transition-colors duration-300"
            >
              Our Mission
            </Link>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
