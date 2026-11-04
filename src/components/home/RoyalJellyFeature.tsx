import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { royalJellyFeature } from '../../data/barsData';

interface FeatureCard {
  title: string;
  tag: string;
  body: string;
  image?: string;
  contain?: boolean;
  mirror?: boolean; // flip and crop differently, so a reused photo doesn't look repeated
  composition?: { label: string; range: string; value: number }[];
  source?: string;
}

const cards = royalJellyFeature.cards as FeatureCard[];

function Composition({ rows, source }: { rows: NonNullable<FeatureCard['composition']>; source?: string }) {
  return (
    <div className="absolute inset-0 flex flex-col justify-center px-7 bg-gradient-to-br from-[#2a2112] via-[#2A251F] to-[#211D18]">
      <p className="text-[#D4AF65]/80 text-[10px] font-semibold tracking-[0.35em] uppercase mb-6">Fresh royal jelly</p>
      <ul className="space-y-5">
        {rows.map(({ label, range, value }) => (
          <li key={label}>
            <div className="flex justify-between items-baseline mb-2">
              <span className="font-display text-lg text-[#F5F1E8]">{label}</span>
              <span className="text-[#F5F1E8]/60 text-sm">{range}</span>
            </div>
            <div className="h-1.5 bg-[#F5F1E8]/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#A9822F] via-[#D4AF65] to-[#F1D79A]"
                initial={{ width: 0 }}
                whileInView={{ width: `${value}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </li>
        ))}
      </ul>
      {source && <p className="text-[#F5F1E8]/35 text-[10px] leading-relaxed mt-7">{source}</p>}
    </div>
  );
}

export function RoyalJellyFeature() {
  const track = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const updateEdges = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
  }, []);

  useEffect(() => {
    updateEdges();
    window.addEventListener('resize', updateEdges);
    return () => window.removeEventListener('resize', updateEdges);
  }, [updateEdges]);

  const scrollBy = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector('article');
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.clientWidth + 20), behavior: 'smooth' });
  };

  return (
    <section className="relative py-24 md:py-32 overflow-hidden" aria-labelledby="royal-jelly-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-7">
            <p className="text-[#D4AF65] text-[10px] sm:text-xs font-semibold tracking-[0.4em] uppercase mb-5">{royalJellyFeature.eyebrow}</p>
            <h2 id="royal-jelly-heading" className="font-display text-4xl sm:text-5xl text-[#F5F1E8] leading-[1.1]">
              {royalJellyFeature.headline}
            </h2>
          </div>
          <div className="lg:col-span-5 lg:text-right">
            <p className="text-[#F5F1E8]/55 text-sm leading-relaxed lg:max-w-sm lg:ml-auto mb-6">{royalJellyFeature.intro}</p>
            {/* Arrows only when the cards don't all fit */}
            <div className={`flex gap-2 lg:justify-end ${edges.start && edges.end ? 'hidden' : ''}`}>
              {([-1, 1] as const).map((dir) => {
                const disabled = dir === -1 ? edges.start : edges.end;
                const Icon = dir === -1 ? ChevronLeft : ChevronRight;
                return (
                  <button
                    key={dir}
                    onClick={() => scrollBy(dir)}
                    disabled={disabled}
                    aria-label={dir === -1 ? 'Previous card' : 'Next card'}
                    className="w-10 h-10 flex items-center justify-center border border-[#D4AF65]/40 text-[#D4AF65] hover:bg-[#D4AF65]/10 disabled:opacity-25 disabled:hover:bg-transparent transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div
          ref={track}
          onScroll={updateEdges}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {cards.map((card, i) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="snap-start shrink-0 w-[82vw] sm:w-[360px] lg:w-[calc((100%-2.5rem)/3)]"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#2A251F] border border-[#F5F1E8]/5 group">
                {card.composition ? (
                  <Composition rows={card.composition} source={card.source} />
                ) : card.contain ? (
                  <>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(229,166,56,0.22),transparent_65%)]" />
                    <img src={card.image} alt="" className="absolute inset-0 m-auto h-[82%] w-auto rounded-md shadow-[0_25px_50px_rgba(0,0,0,0.7)] transition-transform duration-700 group-hover:scale-[1.03]" />
                  </>
                ) : (
                  <img
                    src={card.image}
                    alt=""
                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${
                      card.mirror ? '-scale-x-[1.35] scale-y-[1.35] object-[30%_80%] group-hover:-scale-x-[1.42] group-hover:scale-y-[1.42]' : 'group-hover:scale-105'
                    }`}
                  />
                )}
                <span className="absolute top-4 left-4 w-10 h-10 rounded-full bg-[#1A1714]/70 backdrop-blur border border-[#D4AF65]/40 flex items-center justify-center font-display text-sm text-[#F5F1E8]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="absolute bottom-4 left-4 px-3.5 py-2 rounded-full bg-[#1A1714]/75 backdrop-blur border border-[#D4AF65]/30 text-[#F5F1E8] text-[10px] font-semibold tracking-[0.2em] uppercase">
                  {card.tag}
                </span>
              </div>
              <h3 className="font-display text-xl text-[#F5F1E8] mt-5 mb-2">{card.title}</h3>
              <p className="text-[#F5F1E8]/55 text-sm leading-relaxed">{card.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
