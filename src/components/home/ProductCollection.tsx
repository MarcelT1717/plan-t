import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { barsData, flavorIds } from '../../data/barsData';
import { alpha, tint } from '../../lib/color';
import type { FlavorId } from './ProductViewer';

const cardVariants = {
  rest: { y: 0 },
  hover: { y: -6 },
};

const packageVariants = {
  rest: { y: 0, rotateY: 0, rotateX: 0, scale: 1 },
  hover: { y: -18, rotateY: -12, rotateX: 6, scale: 1.03 },
};

export function ProductCollection() {
  return (
    <section id="collection" className="relative py-28 md:py-36 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#D4AF65] text-[10px] sm:text-xs font-semibold tracking-[0.4em] uppercase mb-5">The Collection</p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#F5F1E8] leading-tight">
            Three Flavors.<br className="sm:hidden" /> One Standard.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {flavorIds.map((id) => {
            const bar = barsData[id as FlavorId];
            const title = bar.variant.charAt(0) + bar.variant.slice(1).toLowerCase();
            return (
              <motion.article
                key={id}
                initial="rest"
                whileHover="hover"
                animate="rest"
                variants={cardVariants}
                className="relative bg-[#2A251F] overflow-hidden border border-[#F5F1E8]/5 flex flex-col"
              >
                {/* Flavour ambient light */}
                <div
                  className="absolute inset-x-0 top-0 h-3/4 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 50% 35%, ${alpha(bar.hex, 0.45)} 0%, transparent 65%)` }}
                />
                <div className="relative pt-12 pb-8 flex justify-center" style={{ perspective: 900 }}>
                  <motion.img
                    src={bar.label}
                    alt={`Royal T ${title} label`}
                    variants={packageVariants}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="h-80 lg:h-96 w-auto rounded-lg shadow-[0_30px_60px_rgba(0,0,0,0.7)]"
                  />
                </div>
                <div className="relative px-8 pb-8 flex flex-col flex-1">
                  <p className="font-display text-2xl tracking-[0.15em] mb-1" style={{ color: tint(bar.hex, 0.35) }}>
                    {bar.variant} <span className="text-[#F5F1E8]/40">·</span> <span className="text-[#F5F1E8]">{bar.flavor}</span>
                  </p>
                  <p className="text-[#F5F1E8]/45 text-xs tracking-[0.15em] uppercase mb-4">
                    {bar.ingredients.map((i: { name: string }) => i.name).join(' · ')}
                  </p>
                  <p className="text-[#F5F1E8]/65 text-sm leading-relaxed mb-8 flex-1">{bar.description}</p>
                  <Link
                    to={`/learn-more#${id}`}
                    className="inline-flex items-center justify-center px-6 py-3.5 border border-[#D4AF65]/40 text-[#D4AF65] text-xs font-bold tracking-[0.25em] uppercase hover:bg-[#D4AF65] hover:text-[#080808] transition-colors duration-300"
                  >
                    View Product
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
