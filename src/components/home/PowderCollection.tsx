import React from 'react';
import { barsData, flavorIds } from '../../data/barsData';
import { alpha, tint } from '../../lib/color';
import type { FlavorId } from './ProductViewer';

/** Deliberately abstract tub silhouette: a placeholder until real powder packaging exists. */
function ConceptTub({ hex, id }: { hex: string; id: string }) {
  return (
    <svg viewBox="0 0 200 240" className="w-40 h-48 mx-auto" aria-hidden="true">
      <defs>
        <linearGradient id={`tub-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={hex} stopOpacity="0.55" />
          <stop offset="100%" stopColor="#1A1714" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <rect x="38" y="28" width="124" height="26" rx="6" fill="none" stroke="#D4AF65" strokeOpacity="0.6" strokeDasharray="4 4" />
      <path d="M44 58 H156 L150 214 Q149 222 141 222 H59 Q51 222 50 214 Z" fill={`url(#tub-${id})`} stroke="#D4AF65" strokeOpacity="0.45" strokeDasharray="4 4" />
      <text x="100" y="140" textAnchor="middle" fill="#F5F1E8" fillOpacity="0.55" fontSize="13" letterSpacing="5" fontFamily="Cinzel, Georgia, serif">
        CONCEPT
      </text>
    </svg>
  );
}

export function PowderCollection() {
  return (
    <section className="relative py-28 md:py-36">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#D4AF65] text-[10px] sm:text-xs font-semibold tracking-[0.4em] uppercase mb-5">Royal T Powders · In Development</p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#F5F1E8] leading-tight mb-5">
            Your Royal Routine.<br />Your Way.
          </h2>
          <p className="text-[#F5F1E8]/55 max-w-xl mx-auto">
            We're exploring powder versions of each flavor. These are concepts only: packaging,
            ingredients and nutrition information will be confirmed before anything goes on sale.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {flavorIds.map((id) => {
            const bar = barsData[id as FlavorId];
            return (
              <div
                key={id}
                className="relative bg-[#2A251F] border border-dashed border-[#D4AF65]/20 p-8 text-center overflow-hidden"
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 50% 40%, ${alpha(bar.hex, 0.25)} 0%, transparent 60%)` }}
                />
                <span className="absolute top-4 right-4 text-[9px] font-semibold tracking-[0.3em] uppercase text-[#E5A638] border border-[#E5A638]/40 px-2 py-1">
                  Concept
                </span>
                <div className="relative">
                  <ConceptTub hex={bar.hex} id={id} />
                  <p className="font-display text-xl tracking-[0.2em] mt-6" style={{ color: tint(bar.hex, 0.35) }}>
                    {bar.variant} Powder
                  </p>
                  <p className="text-[#F5F1E8]/40 text-xs mt-2">Concept placeholder · details to come</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <a
            href="#subscribe"
            className="inline-flex items-center justify-center px-8 py-4 border border-[#D4AF65]/40 text-[#D4AF65] text-xs font-bold tracking-[0.25em] uppercase hover:border-[#D4AF65] hover:bg-[#D4AF65]/5 transition-colors duration-300"
          >
            Get Notified
          </a>
        </div>
      </div>
    </section>
  );
}
