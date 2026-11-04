import React from 'react';
import { barsData, ingredientCatalog } from '../data/barsData';
import { ProductCollection } from '../components/home/ProductCollection';
import { ProductDetail } from '../components/ProductDetail';
import { Faq } from '../components/Faq';
import { CottageNotice } from '../components/CottageNotice';
import { usePageTitle } from '../hooks/usePageTitle';

const standards = [
  { title: 'Five ingredients', body: 'Every Royal T bar has exactly five ingredients, all listed on the front of the wrapper.' },
  { title: 'Whole foods only', body: 'Dates, fruit, roots, nuts, raw honey and royal jelly. No isolates, no fillers, no proprietary blends.' },
  { title: 'Nothing artificial', body: 'No artificial colours, flavours, sweeteners or preservatives. The flavour comes from the ingredients.' },
  { title: 'Small batch', body: 'Made by hand in small batches in Chicago so we can check the quality of every batch ourselves.' },
];

const sectionLinks = [
  ['#collection', 'The Bars'],
  ['#ingredients', 'Ingredients'],
  ['#standard', 'Our Standard'],
  ['#faq', 'FAQ'],
];

export const LearnMore = () => {
  usePageTitle('Learn More');

  return (
    <div className="min-h-screen bg-[#1A1714] text-[#F5F1E8]">
      {/* Hero */}
      <section className="relative pt-40 pb-20 md:pt-48 md:pb-24 overflow-hidden text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[#E5A638]/10 blur-[140px] pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4">
          <p className="text-[#D4AF65] text-[10px] sm:text-xs font-semibold tracking-[0.4em] uppercase mb-6">Learn More</p>
          <h1 className="font-display text-5xl md:text-7xl leading-[1.05] mb-6">The Bars,<br />Inside and Out</h1>
          <p className="text-[#F5F1E8]/60 text-lg leading-relaxed mb-10">
            Three flavors, each built from five whole-food ingredients around raw honey and royal jelly.
            Coming soon, shipping within Illinois.
          </p>
          <nav aria-label="On this page" className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {sectionLinks.map(([href, label]) => (
              <a key={href} href={href} className="text-[#F5F1E8]/60 hover:text-[#D4AF65] text-xs font-semibold tracking-[0.25em] uppercase transition-colors">
                {label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <ProductCollection />

      {Object.values(barsData).map((bar) => (
        <ProductDetail key={bar.id} bar={bar} />
      ))}

      {/* Ingredient glossary */}
      <section id="ingredients" className="py-24 md:py-32 border-t border-[#F5F1E8]/5 bg-[#211D18] scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#D4AF65] text-[10px] sm:text-xs font-semibold tracking-[0.4em] uppercase mb-5">Every Ingredient</p>
            <h2 className="font-display text-4xl md:text-5xl">What's Inside</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Object.entries(ingredientCatalog).map(([key, item]) => (
              <article key={key} className="bg-[#2A251F] border border-[#F5F1E8]/5 flex gap-5 p-5 items-start">
                <img src={item.image} alt="" className="w-20 h-20 rounded-full object-cover ring-1 ring-[#D4AF65]/30 flex-shrink-0" />
                <div>
                  <h3 className="font-display text-lg tracking-[0.06em] mb-1">{item.name}</h3>
                  <p className="text-[#F5F1E8]/55 text-sm leading-relaxed">{item.description}</p>
                  {item.note && (
                    <p className="text-[#E5A638]/80 text-[10px] font-semibold tracking-[0.25em] uppercase mt-2">{item.note}</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Our standard */}
      <section id="standard" className="py-24 border-t border-[#F5F1E8]/5 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl md:text-5xl text-center mb-14">The Royal Standard</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {standards.map(({ title, body }, i) => (
              <div key={title} className="border-t border-[#D4AF65]/40 pt-6">
                <p className="text-[#D4AF65]/70 font-display text-sm mb-3">0{i + 1}</p>
                <h3 className="font-display text-xl mb-3">{title}</h3>
                <p className="text-[#F5F1E8]/55 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 border-t border-[#F5F1E8]/5 bg-[#211D18] scroll-mt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl md:text-5xl text-center mb-10">Questions</h2>
          <div className="bg-[#2A251F] border border-[#F5F1E8]/5 px-8 py-4">
            <Faq />
          </div>
        </div>
      </section>

      <div className="border-t border-[#F5F1E8]/5 py-8">
        <CottageNotice />
      </div>
    </div>
  );
};
