import React from 'react';
import { highlights } from '../../data/barsData';

/** Endless strip of product highlights. The list is rendered twice so the loop is seamless. */
export function Highlights() {
  return (
    <div className="relative border-y border-[#D4AF65]/15 bg-[#211D18] py-5 overflow-hidden" aria-label="Highlights">
      <ul className="sr-only">
        {highlights.map((h) => <li key={h}>{h}</li>)}
      </ul>
      <div className="flex w-max animate-marquee motion-reduce:animate-none" aria-hidden="true">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0">
            {highlights.map((h) => (
              <span key={h} className="flex items-center gap-8 pr-8 text-[#F5F1E8]/75 text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase whitespace-nowrap">
                {h}
                <span className="w-1.5 h-1.5 rotate-45 bg-[#D4AF65]" />
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#211D18] to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#211D18] to-transparent pointer-events-none" />
    </div>
  );
}
