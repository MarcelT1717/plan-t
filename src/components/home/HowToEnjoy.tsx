import React, { useLayoutEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion';
import { howToEnjoy } from '../../data/barsData';

const ease = [0.22, 1, 0.36, 1] as const;

/*
 * Sticky intro on the left, a timeline on the right. The gold line fills as the
 * list scrolls past the middle of the screen, and each step lights up as the
 * line reaches its dot.
 */
export function HowToEnjoy() {
  const list = useRef<HTMLOListElement>(null);
  const [stops, setStops] = useState<number[]>([]); // each dot's position, as a fraction of the list height
  const [reached, setReached] = useState(0);

  const { scrollYProgress } = useScroll({ target: list, offset: ['start 60%', 'end 60%'] });
  // The line stops at the last dot, so it is full once the last step is reached.
  const lineEnd = stops[stops.length - 1] ?? 1;
  const lineEndRef = useRef(lineEnd);
  lineEndRef.current = lineEnd;
  const sprung = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });
  const fill = useTransform(sprung, (p) => Math.min(1, p / lineEndRef.current));

  useLayoutEffect(() => {
    const measure = () => {
      const el = list.current;
      if (!el) return;
      setStops(Array.from(el.children, (li) => ((li as HTMLElement).offsetTop + 22) / el.offsetHeight));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useMotionValueEvent(scrollYProgress, 'change', (p) => setReached(stops.filter((s) => p >= s).length));

  return (
    <section className="relative py-24 md:py-32" aria-labelledby="enjoy-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10">
        <motion.div
          className="lg:col-span-5 lg:sticky lg:top-32 self-start"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="text-[#D4AF65] text-[10px] sm:text-xs font-semibold tracking-[0.4em] uppercase mb-5">{howToEnjoy.eyebrow}</p>
          <h2 id="enjoy-heading" className="font-display text-4xl sm:text-5xl text-[#F5F1E8] leading-[1.1] mb-6">
            {howToEnjoy.headline[0]}<br />{howToEnjoy.headline[1]}
          </h2>
          <p className="text-[#F5F1E8]/60 leading-relaxed max-w-md mb-8">{howToEnjoy.intro}</p>
          <ul className="flex flex-wrap gap-2.5">
            {howToEnjoy.pills.map((pill) => (
              <li key={pill} className="px-4 py-2.5 rounded-full border border-[#D4AF65]/30 text-[#F5F1E8]/80 text-[10px] font-semibold tracking-[0.2em] uppercase">
                {pill}
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="lg:col-span-7 relative">
          {/* Track and fill, running through the centre of the dots */}
          <div className="absolute left-[11px] top-0 w-px bg-[#F5F1E8]/10" style={{ bottom: `${(1 - lineEnd) * 100}%` }} aria-hidden="true" />
          <motion.div
            className="absolute left-[11px] top-0 w-px origin-top bg-gradient-to-b from-[#F1D79A] via-[#D4AF65] to-[#A9822F]"
            style={{ bottom: `${(1 - lineEnd) * 100}%`, scaleY: fill }}
            aria-hidden="true"
          />

          <ol ref={list} className="relative space-y-20 md:space-y-28">
            {howToEnjoy.steps.map((step, i) => {
              const active = i < reached;
              return (
                <li key={step.title} className="relative pl-12 sm:pl-16">
                  <span
                    className={`absolute left-0 top-[14px] w-[23px] h-[23px] rounded-full border-2 transition-all duration-500 ${
                      active
                        ? 'border-[#D4AF65] bg-[#D4AF65] shadow-[0_0_0_6px_rgba(212,175,101,0.15)]'
                        : 'border-[#F5F1E8]/25 bg-[#1A1714]'
                    }`}
                    aria-hidden="true"
                  />
                  <span
                    className={`absolute right-0 -top-4 font-display text-7xl sm:text-8xl leading-none pointer-events-none select-none transition-colors duration-700 ${
                      active ? 'text-[#D4AF65]/15' : 'text-[#F5F1E8]/[0.05]'
                    }`}
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <motion.div
                    className="relative max-w-md"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7, ease }}
                  >
                    <p className="text-[#D4AF65] text-[10px] sm:text-xs font-semibold tracking-[0.3em] uppercase mb-2">{step.time}</p>
                    <h3 className="font-display text-3xl sm:text-4xl text-[#F5F1E8] mb-4">{step.title}</h3>
                    <p className="text-[#F5F1E8] font-semibold mb-2">{step.lead}</p>
                    <p className="text-[#F5F1E8]/60 text-sm sm:text-base leading-relaxed">{step.body}</p>
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
