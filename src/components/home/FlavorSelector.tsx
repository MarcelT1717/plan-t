import React from 'react';
import { motion } from 'framer-motion';
import { barsData, flavorIds } from '../../data/barsData';
import { tint } from '../../lib/color';
import type { FlavorId } from './ProductViewer';

interface FlavorSelectorProps {
  value: FlavorId;
  onChange: (flavor: FlavorId) => void;
  /** Unique per instance so the underline animates within its own selector. */
  id: string;
  className?: string;
}

export function FlavorSelector({ value, onChange, id, className = '' }: FlavorSelectorProps) {
  return (
    <div role="radiogroup" aria-label="Choose a flavour" className={`flex items-center ${className}`}>
      {flavorIds.map((flavorId, i) => {
        const bar = barsData[flavorId as FlavorId];
        const selected = flavorId === value;
        return (
          <React.Fragment key={flavorId}>
            {i > 0 && <span className="h-4 w-px bg-[#F5F1E8]/15" aria-hidden="true" />}
            <button
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(flavorId as FlavorId)}
              className="relative px-4 sm:px-5 py-2 font-display text-sm sm:text-base tracking-[0.3em] transition-colors duration-300 focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#D4AF65]"
              style={{ color: selected ? tint(bar.hex, 0.35) : 'rgba(245,241,232,0.45)' }}
            >
              {bar.variant}
              {selected && (
                <motion.span
                  layoutId={`flavor-underline-${id}`}
                  className="absolute left-4 right-4 sm:left-5 sm:right-5 -bottom-0.5 h-px"
                  style={{ background: tint(bar.hex, 0.2) }}
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
            </button>
          </React.Fragment>
        );
      })}
    </div>
  );
}
