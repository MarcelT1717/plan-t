import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { barsData, ingredientCatalog } from '../../data/barsData';
import { productMotion as m, prefersReducedMotion } from '../../lib/productMotion';
import type { FlavorId } from './ProductViewer';

gsap.registerPlugin(ScrollTrigger);

type IngredientKey = keyof typeof ingredientCatalog;

// Where each ingredient photo sits around the pack and bar (percent of the viewport),
// kept clear of both and of the caption. Order: dates, featured, nut, raw honey, royal jelly.
const photoSlots = {
  desktop: [
    { left: '13%', top: '30%' },
    { left: '87%', top: '30%' },
    { left: '13%', top: '72%' },
    { left: '87%', top: '72%' },
    { left: '50%', top: '88%' },
  ],
  // Phones: photos above and below the pair, caption at the bottom.
  mobile: [
    { left: '17%', top: '17%' },
    { left: '50%', top: '15%' },
    { left: '83%', top: '17%' },
    { left: '30%', top: '72%' },
    { left: '70%', top: '72%' },
  ],
};

/**
 * Scroll-scrubbed story in three calm steps: the pinned bar glides to centre,
 * unwraps while its ingredients gather round, then wraps back up and steps aside.
 */
export function ScrollExperience({ flavor }: { flavor: FlavorId }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = prefersReducedMotion();
  const bar = barsData[flavor];
  const keys: IngredientKey[] = ['dates', bar.featured as IngredientKey, bar.nut as IngredientKey, 'honey', 'royalJelly'];
  const names = bar.ingredients.map((i: { name: string }) => i.name);
  const slots = window.innerWidth < 768 ? photoSlots.mobile : photoSlots.desktop;

  useLayoutEffect(() => {
    if (reduced || !sectionRef.current) return;
    const stage = document.getElementById('product-stage');

    const ctx = gsap.context(() => {
      gsap.set('.story-caption', { autoAlpha: 0, y: 30 });
      gsap.set('.story-photo', { xPercent: -50, yPercent: -50, autoAlpha: 0, scale: 0.6 });

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
        },
      });

      // Each step finishes before the next begins, so nothing overlaps on screen.
      const ease = 'sine.inOut';
      tl.to(m, { center: 1, duration: 3, ease }, 0)
        .to('.story-caption-1', { autoAlpha: 1, y: 0, duration: 1, ease }, 0.6)
        .to('.story-caption-1', { autoAlpha: 0, y: -20, duration: 0.8, ease }, 2.4)
        // Unwrap: seal tears, bar rises out, then the two settle side by side
        .to(m, { unwrap: 1, zoom: -0.3, duration: 3, ease }, 3.4)
        // Only once the bar is out: caption, then the ingredients
        .to('.story-caption-raw', { autoAlpha: 1, y: 0, duration: 1, ease }, 6.5)
        .to('.story-photo', { autoAlpha: 1, scale: 1, duration: 1, stagger: 0.25, ease: 'sine.out' }, 7)
        // Hold, then clear everything before wrapping back up
        .to(['.story-photo', '.story-caption-raw'], { autoAlpha: 0, duration: 0.8, ease }, 10)
        .to(m, { unwrap: 0, zoom: 0, duration: 2.2, ease }, 11)
        .to(m, { aside: 1, duration: 2.4, ease }, 13.4);

      if (stage) {
        tl.to(stage, { '--glow-x': '50%', '--glow-y': '50%', duration: 3, ease: 'sine.inOut' }, 0)
          .to(stage, { '--glow-x': window.innerWidth < 768 ? '50%' : '20%', duration: 2.4, ease: 'sine.inOut' }, 13.4);
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      Object.assign(m, { center: 0, aside: 0, zoom: 0, unwrap: 0 });
    };
  }, [reduced]);

  if (reduced) {
    return (
      <section className="relative py-24 pointer-events-none" aria-label="Ingredients at a glance">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="font-display text-3xl text-[#F5F1E8] mb-8">Five ingredients. Nothing to hide.</p>
          <div className="flex flex-wrap justify-center gap-6">
            {keys.map((key) => (
              <figure key={key} className="w-28">
                <img src={ingredientCatalog[key].image} alt="" className="w-28 h-28 rounded-full object-cover ring-1 ring-[#D4AF65]/40" />
                <figcaption className="text-[#F5F1E8]/70 text-xs tracking-[0.2em] uppercase mt-3">{ingredientCatalog[key].name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative h-[400vh] pointer-events-none" aria-label="Inside the bar">
      <div className="sticky top-0 h-screen overflow-hidden">

        <div className="absolute left-4 sm:left-[8%] bottom-[14%] md:bottom-auto md:top-1/2 md:-translate-y-1/2 max-w-xs">
          <div className="story-caption story-caption-1">
            <p className="text-[#D4AF65] text-[10px] font-semibold tracking-[0.4em] uppercase mb-3">01 · The Bar</p>
            <p className="font-display text-3xl md:text-4xl text-[#F5F1E8] leading-tight">Five ingredients.<br />Nothing to hide.</p>
          </div>
        </div>

        <div className="absolute inset-x-0 px-6 text-center bottom-[6%] md:bottom-auto md:top-[11%]">
          <div className="story-caption story-caption-raw">
            <p className="text-[#D4AF65] text-[10px] font-semibold tracking-[0.4em] uppercase mb-3">02 · Unwrapped</p>
            <p className="font-display text-3xl md:text-4xl text-[#F5F1E8] leading-tight">The bar itself.</p>
            <p className="text-[#F5F1E8]/55 text-sm mt-3 max-w-md mx-auto">{names.slice(0, -1).join(', ')} and {names[names.length - 1]}. Made by hand in small batches.</p>
          </div>
        </div>

        {slots.map((slot, i) => {
          const item = ingredientCatalog[keys[i]];
          return (
            <figure
              key={i}
              className="story-photo absolute text-center w-max"
              style={{ left: slot.left, top: slot.top }}
            >
              <img
                src={item.image}
                alt=""
                className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full object-cover ring-1 ring-[#D4AF65]/50 shadow-[0_0_40px_rgba(229,166,56,0.18)]"
              />
              <figcaption className="text-[#F5F1E8]/75 text-[9px] sm:text-[10px] font-semibold tracking-[0.3em] uppercase mt-3">
                {item.name}
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
