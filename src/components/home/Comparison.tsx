import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { comparison } from '../../data/barsData';

const ease = [0.22, 1, 0.36, 1] as const;

export function Comparison() {
  const [brand, ...others] = comparison.columns;

  return (
    <section className="relative py-24 md:py-32" aria-labelledby="comparison-heading">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="text-[#D4AF65] text-[10px] sm:text-xs font-semibold tracking-[0.4em] uppercase mb-5">{comparison.eyebrow}</p>
          <h2 id="comparison-heading" className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#F5F1E8] leading-tight mb-5">
            {comparison.headline}
          </h2>
          <p className="text-[#F5F1E8]/55 max-w-xl mx-auto">{comparison.intro}</p>
        </motion.div>

        <p className="sm:hidden text-right text-[#F5F1E8]/40 text-[10px] font-semibold tracking-[0.3em] uppercase mb-3" aria-hidden="true">Swipe to compare →</p>
        <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          <table className="w-full min-w-[640px] border-separate border-spacing-0 text-left">
            <caption className="sr-only">Royal T compared with typical protein bars and candy bars</caption>
            <thead>
              <tr>
                <th scope="col" className="w-[28%]" />
                <th scope="col" className="w-[28%] px-5 pt-6 pb-4 bg-[#D4AF65]/[0.09] rounded-t-2xl border-x border-t border-[#D4AF65]/25">
                  <span className="font-display text-xl tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-b from-[#F1D79A] via-[#D4AF65] to-[#A9822F]">
                    {brand.toUpperCase()}
                  </span>
                </th>
                {others.map((name) => (
                  <th key={name} scope="col" className="px-5 pt-6 pb-4 text-[#F5F1E8]/40 text-[10px] font-semibold tracking-[0.25em] uppercase align-bottom">
                    {name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((row, i) => {
                const last = i === comparison.rows.length - 1;
                return (
                  <motion.tr
                    key={row.label}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: i * 0.07, ease }}
                  >
                    <th scope="row" className="py-5 pr-4 text-[#F5F1E8] text-sm font-medium border-t border-[#F5F1E8]/10">{row.label}</th>
                    <td className={`px-5 py-5 bg-[#D4AF65]/[0.09] border-x border-t border-x-[#D4AF65]/25 border-t-[#F5F1E8]/10 ${last ? 'rounded-b-2xl border-b border-b-[#D4AF65]/25' : ''}`}>
                      <span className="flex items-center gap-2.5 text-[#F5F1E8] text-sm font-semibold">
                        {row.check && <Check className="w-4 h-4 text-[#D4AF65] flex-shrink-0" strokeWidth={2.5} aria-hidden="true" />}
                        {row.values[0]}
                      </span>
                    </td>
                    {row.values.slice(1).map((value, k) => (
                      <td key={k} className="px-5 py-5 text-[#F5F1E8]/50 text-sm border-t border-[#F5F1E8]/10">{value}</td>
                    ))}
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="text-center text-[#F5F1E8]/35 text-xs mt-8">{comparison.footnote}</p>
      </div>
    </section>
  );
}
