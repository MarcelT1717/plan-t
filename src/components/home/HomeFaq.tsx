import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { faqItems } from '../../data/faq';

const ease = [0.22, 1, 0.36, 1] as const;
const SHOWN = 6; // the rest live on Learn More

export function HomeFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-24 md:py-32 bg-[#211D18] border-t border-[#F5F1E8]/5" aria-labelledby="home-faq-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        <motion.div
          className="lg:col-span-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="text-[#D4AF65] text-[10px] sm:text-xs font-semibold tracking-[0.4em] uppercase mb-5">FAQ</p>
          <h2 id="home-faq-heading" className="font-display text-4xl sm:text-5xl text-[#F5F1E8] leading-[1.1] mb-6">Straight Answers.</h2>
          <p className="text-[#F5F1E8]/55 text-sm leading-relaxed mb-6">Allergens, storage, shipping and what goes into every bar.</p>
          <Link
            to="/learn-more#faq"
            className="inline-flex items-center px-6 py-3.5 border border-[#D4AF65]/40 text-[#D4AF65] text-[10px] font-bold tracking-[0.25em] uppercase hover:border-[#D4AF65] hover:bg-[#D4AF65]/5 transition-colors duration-300"
          >
            All Questions
          </Link>
        </motion.div>

        <div className="lg:col-span-8 border-t border-[#F5F1E8]/10">
          {faqItems.slice(0, SHOWN).map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border-b border-[#F5F1E8]/10">
                <h3>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`home-faq-${i}`}
                    className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                  >
                    <span className={`font-display text-lg sm:text-xl transition-colors ${isOpen ? 'text-[#D4AF65]' : 'text-[#F5F1E8] group-hover:text-[#D4AF65]'}`}>
                      {item.q}
                    </span>
                    <span
                      className={`w-8 h-8 flex-shrink-0 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        isOpen ? 'rotate-45 border-[#D4AF65] text-[#D4AF65]' : 'border-[#F5F1E8]/20 text-[#F5F1E8]/60'
                      }`}
                    >
                      <Plus className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`home-faq-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease }}
                      className="overflow-hidden"
                    >
                      <p className="text-[#F5F1E8]/60 text-sm sm:text-base leading-relaxed pb-6 pr-14">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
