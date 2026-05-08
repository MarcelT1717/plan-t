import React from 'react';
import { Clock, Leaf, Award, Heart, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { ingredientsData } from '../mock';
import { MailchimpSignup } from '../components/MailchimpSignup';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '../components/ui/carousel';

/* Replicates the T-Bar wrapper aesthetic */
function BarMenuCard() {
  return (
    <div className="relative bg-zinc-950 border border-amber-500/40 overflow-hidden shadow-2xl shadow-black">
      {/* Top amber strip */}
      <div className="h-[3px] bg-gradient-to-r from-amber-700 via-amber-400 to-amber-700" />

      <div className="flex flex-col md:flex-row items-stretch">
        {/* Bar photo panel */}
        <div className="relative md:w-1/2 min-h-[320px] overflow-hidden">
          <img
            src="/IMG_3795.jpeg"
            alt="T-Bar RED packaging"
            className="w-full h-full object-cover brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-zinc-950/80" />
        </div>

        {/* Info panel */}
        <div className="md:w-1/2 px-8 py-8 flex flex-col justify-between">
          {/* Header row */}
          <div>
            <div className="flex items-start justify-between mb-6">
              <div>
                <img src="/logo.png" alt="Plan T" className="h-8 w-auto mb-2 opacity-90" />
                <p className="text-amber-500/70 text-[10px] font-bold tracking-[0.3em] uppercase">
                  Whole Food Nutrition Bar
                </p>
              </div>
              <div className="text-right">
                <span className="text-amber-400 font-black text-2xl tracking-[0.2em] leading-none block uppercase">T-Bar</span>
                <span className="text-amber-500/50 text-[10px] tracking-[0.2em] uppercase">Bar No. 01</span>
              </div>
            </div>

            <div className="h-px bg-gradient-to-r from-amber-500/30 via-amber-500/10 to-transparent mb-6" />

            {/* Ingredients list */}
            <p className="text-gray-500 text-[10px] font-bold tracking-[0.25em] uppercase mb-3">Key Ingredients</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mb-6">
              {['Beetroot', 'Almonds', 'Dates', 'Pumpkin Seeds', 'Ginger Root', 'Dark Cacao'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-amber-500 flex-shrink-0" />
                  <span className="text-gray-300 text-xs tracking-wide">{item}</span>
                </div>
              ))}
            </div>

            {/* Claims */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[['100%', 'Natural'], ['0', 'Artificial\nAdditives'], ['6', 'Key\nCompounds']].map(([val, label]) => (
                <div key={val + label} className="border border-amber-500/20 p-2.5 text-center">
                  <p className="text-amber-400 font-black text-lg leading-none">{val}</p>
                  <p className="text-gray-500 text-[9px] tracking-widest uppercase mt-1 whitespace-pre-line leading-tight">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer row */}
          <div>
            <div className="h-px bg-gradient-to-r from-amber-500/30 via-amber-500/10 to-transparent mb-4" />
            <p className="text-gray-600 text-[10px] tracking-widest uppercase">
              Handcrafted · Small Batch · Coming Soon
            </p>
          </div>
        </div>
      </div>

      {/* Bottom amber strip */}
      <div className="h-[3px] bg-gradient-to-r from-amber-700 via-amber-400 to-amber-700" />
    </div>
  );
}

const barVariants = [
  {
    name: 'Plan T',
    variant: 'RED',
    tagline: 'Beetroot · Dark Cacao · Ginger',
    description: 'Rich and earthy with a deep chocolate finish. Built around whole beetroot, dark cacao, and warming ginger root.',
    key: ['Beetroot', 'Dark Cacao', 'Ginger Root', 'Almonds'],
    strip: 'from-amber-800 via-amber-400 to-amber-800',
    border: 'border-amber-500/40',
    accentText: 'text-amber-400',
    status: 'Coming Soon',
  },
  {
    name: 'Plan T',
    variant: 'GREEN',
    tagline: 'Matcha · Pumpkin Seeds · Dates',
    description: 'Clean and grassy with a naturally sweet finish. Anchored by ceremonial matcha, whole pumpkin seeds, and Medjool dates.',
    key: ['Matcha', 'Pumpkin Seeds', 'Dates', 'Cashews'],
    strip: 'from-emerald-900 via-emerald-500 to-emerald-900',
    border: 'border-emerald-500/40',
    accentText: 'text-emerald-400',
    status: 'In Development',
  },
  {
    name: 'Plan T',
    variant: 'DARK',
    tagline: 'Espresso · Dark Cacao · Almonds',
    description: 'Intense and bold. Double-dark with espresso and 85% cacao, softened by whole almonds and a touch of sea salt.',
    key: ['Dark Cacao', 'Espresso', 'Almonds', 'Sea Salt'],
    strip: 'from-stone-700 via-stone-300 to-stone-700',
    border: 'border-stone-500/40',
    accentText: 'text-stone-300',
    status: 'In Development',
  },
  {
    name: 'Plan T',
    variant: 'GOLD',
    tagline: 'Dates · Honey · Walnuts',
    description: 'Warm and lightly sweet. Medjool dates and raw honey give it a caramel depth, balanced by whole walnuts and vanilla.',
    key: ['Medjool Dates', 'Raw Honey', 'Walnuts', 'Vanilla'],
    strip: 'from-yellow-700 via-yellow-300 to-yellow-700',
    border: 'border-yellow-500/40',
    accentText: 'text-yellow-400',
    status: 'In Development',
  },
  {
    name: 'Plan T',
    variant: 'ORIGINAL',
    tagline: 'Oats · Almonds · Dark Honey',
    description: 'The everyday bar. Whole oats, blanched almonds, and dark honey — straightforward, satisfying, and made to last.',
    key: ['Whole Oats', 'Almonds', 'Dark Honey', 'Coconut'],
    strip: 'from-orange-800 via-orange-400 to-orange-800',
    border: 'border-orange-500/40',
    accentText: 'text-orange-400',
    status: 'In Development',
  },
];

function VariantCard({ bar }) {
  return (
    <div className={`group relative bg-zinc-950 border ${bar.border} hover:brightness-110 transition-all duration-500 overflow-hidden h-full`}>
      <div className={`h-[3px] bg-gradient-to-r ${bar.strip}`} />
      <div className="p-6 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <img src="/logo.png" alt="Plan T" className="h-6 w-auto opacity-80 mb-1" />
            <p className="text-gray-600 text-[9px] font-bold tracking-[0.25em] uppercase">{bar.name}</p>
          </div>
          <span className={`${bar.accentText} font-black text-xl tracking-[0.15em] leading-none`}>{bar.variant}</span>
        </div>

        <div className={`h-px bg-gradient-to-r ${bar.strip} opacity-30 mb-4`} />

        {/* Tagline */}
        <p className="text-gray-500 text-[10px] font-bold tracking-[0.2em] uppercase mb-3">{bar.tagline}</p>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed mb-5 flex-1">{bar.description}</p>

        {/* Key ingredients */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {bar.key.map((k) => (
            <span key={k} className="text-gray-600 text-[9px] font-mono tracking-widest uppercase border border-gray-800 px-2 py-1">
              {k}
            </span>
          ))}
        </div>

        {/* Status */}
        <div className={`h-px bg-gradient-to-r ${bar.strip} opacity-20 mb-3`} />
        <p className={`${bar.accentText} text-[9px] font-bold tracking-[0.25em] uppercase opacity-70`}>{bar.status}</p>
      </div>
      <div className={`h-[3px] bg-gradient-to-r ${bar.strip} opacity-40`} />
    </div>
  );
}

export const Ingredients = () => {
  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Coming Soon Hero */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-b from-gray-900 to-black">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-amber-500/10 border border-amber-500/30 rounded-full mb-8">
            <Clock className="w-5 h-5 text-amber-400" />
            <span className="text-amber-400 text-sm font-semibold tracking-wide">COMING SOON</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">T-Bar</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-6 leading-relaxed">
            A whole-food nutrition bar crafted from nature's finest ingredients. No fillers. No shortcuts.
          </p>
          
          <p className="text-lg text-gray-400 mb-10">
            We're currently in development, perfecting our formula to bring you the highest quality product. 
            Join our waitlist to be the first to know when T-Bar launches.
          </p>

        </div>
      </section>

      {/* T-Bar RED — Product Showcase */}
      <section className="py-20 bg-black border-t border-amber-500/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section label */}
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-500/30" />
            <span className="text-amber-500 text-xs font-bold tracking-[0.3em] uppercase">The Product</span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-500/30" />
          </div>

          {/* Main menu card */}
          <BarMenuCard />

          {/* Bar variant carousel */}
          <div className="mt-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-500/20" />
              <p className="text-gray-600 text-[10px] font-bold tracking-[0.3em] uppercase">The Line-Up</p>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-500/20" />
            </div>
            <Carousel opts={{ align: 'start', loop: true }} className="w-full">
              <CarouselContent className="-ml-4">
                {barVariants.map((bar) => (
                  <CarouselItem key={bar.variant} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <VariantCard bar={bar} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex items-center justify-end gap-2 mt-6">
                <CarouselPrevious className="relative inset-0 translate-y-0 bg-zinc-950 border-amber-500/30 text-amber-400 hover:bg-amber-500/10 hover:border-amber-500/60" />
                <CarouselNext className="relative inset-0 translate-y-0 bg-zinc-950 border-amber-500/30 text-amber-400 hover:bg-amber-500/10 hover:border-amber-500/60" />
              </div>
            </Carousel>
          </div>
        </div>
      </section>

      {/* Transition */}
      <div className="relative h-24 bg-black overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black to-transparent" />
      </div>

      {/* Photo Gallery — Ingredients & Product */}
      <section className="relative py-0 bg-black">
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[60vh]">
          {/* Raw Ingredients */}
          <div className="relative overflow-hidden group">
            <img
              src="/IMG_3781.jpeg"
              alt="Raw T-Bar ingredients laid out — beets, almonds, dates, pumpkin seeds, and beetroot powder"
              className="w-full h-full object-cover object-center brightness-75 group-hover:brightness-90 group-hover:scale-105 transition-all duration-700"
              style={{ minHeight: '480px' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 md:p-10">
              <p className="text-amber-400 text-xs font-bold tracking-[0.25em] uppercase mb-2">The Formula</p>
              <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-2">
                Pure. Natural.<br />Purposeful.
              </h3>
              <p className="text-gray-300 text-sm max-w-xs leading-relaxed">
                Every ingredient sourced for a reason — from whole beets to raw almonds, dates, pumpkin seeds, and concentrated beetroot powder.
              </p>
            </div>
            <div className="absolute top-6 right-6 px-3 py-1.5 bg-black/60 border border-amber-500/30 backdrop-blur-sm">
              <span className="text-amber-400 text-xs font-mono tracking-widest uppercase">Ingredients</span>
            </div>
          </div>

          {/* Finished Bars */}
          <div className="relative overflow-hidden group">
            <img
              src="/IMG_3795.jpeg"
              alt="Plan T Red bars in packaging, ready to ship"
              className="w-full h-full object-cover object-center brightness-75 group-hover:brightness-90 group-hover:scale-105 transition-all duration-700"
              style={{ minHeight: '480px' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 md:p-10">
              <p className="text-amber-400 text-xs font-bold tracking-[0.25em] uppercase mb-2">The Product</p>
              <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-2">
                Handcrafted.<br />Small Batch.
              </h3>
              <p className="text-gray-300 text-sm max-w-xs leading-relaxed">
                Made with care in small batches. Every T-Bar delivers the same uncompromising quality — no shortcuts, no fillers.
              </p>
            </div>
            <div className="absolute top-6 right-6 px-3 py-1.5 bg-black/60 border border-amber-500/30 backdrop-blur-sm">
              <span className="text-amber-400 text-xs font-mono tracking-widest uppercase">T-Bar Red</span>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes T-Bar Special */}
      <section className="py-24 bg-black border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              What Makes <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">T-Bar</span> Different
            </h2>
            <p className="text-xl text-gray-400">
              Simple ingredients. Uncompromising quality. Nothing hidden.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-amber-500/20 rounded-2xl p-8 text-center hover:border-amber-500/50 transition-all duration-300">
              <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="w-8 h-8 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">100% Natural</h3>
              <p className="text-gray-400">
                No artificial ingredients, preservatives, or synthetic compounds. Just pure, whole-food nutrition.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-amber-500/20 rounded-2xl p-8 text-center hover:border-amber-500/50 transition-all duration-300">
              <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Purposefully Sourced</h3>
              <p className="text-gray-400">
                Every ingredient is chosen with intention — whole food, minimal processing, nothing artificial.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-amber-500/20 rounded-2xl p-8 text-center hover:border-amber-500/50 transition-all duration-300">
              <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Handcrafted</h3>
              <p className="text-gray-400">
                Made in small batches with care, ensuring the highest quality in every bar.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-amber-500/20 rounded-2xl p-8 text-center hover:border-amber-500/50 transition-all duration-300">
              <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Delicious</h3>
              <p className="text-gray-400">
                A bar you actually want to eat. Real ingredients that taste like what they are.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Planned Ingredients */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Key <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Ingredients</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Six whole-food ingredients. Each one chosen for its quality, flavour, and nutritional integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ingredientsData.map((ingredient) => (
              <div
                key={ingredient.id}
                className="group relative bg-black border border-gray-800 hover:border-amber-500/50 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute top-4 left-4 z-20 text-gray-600 font-mono text-sm">
                  {ingredient.number}
                </div>

                <div className="relative h-80 overflow-hidden bg-black">
                  <img
                    src={ingredient.image}
                    alt={ingredient.name}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                </div>

                <div className="p-8 space-y-4">
                  <p className="text-amber-500 text-xs font-bold tracking-[0.2em] uppercase">
                    KEY COMPOUND
                  </p>

                  <h3 className="text-3xl font-bold text-white tracking-tight">
                    {ingredient.name}
                  </h3>

                  <p className="text-amber-500 text-sm font-semibold tracking-wide">
                    {ingredient.compound}
                  </p>

                  <p className="text-gray-400 text-sm leading-relaxed">
                    {ingredient.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-4">
                    {ingredient.nutrients.map((nutrient, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-gray-900 border border-gray-800 text-gray-500 text-xs font-mono uppercase tracking-wider"
                      >
                        {nutrient}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="absolute inset-0 border-2 border-transparent group-hover:border-amber-500/20 transition-all duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Standard */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-black border-y border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Standard</span>
            </h2>
            <p className="text-xl text-gray-400">
              What we put in the bar — and what we refuse to
            </p>
          </div>

          <div className="bg-zinc-950 border border-amber-500/20 overflow-hidden">
            <div className="h-[2px] bg-gradient-to-r from-amber-700 via-amber-400 to-amber-700" />
            <div className="p-8 md:p-12 space-y-8">
              {[
                { title: 'Whole Food Only', body: 'Every ingredient in the T-Bar is a recognisable whole food. If you couldn\'t find it at a market, it\'s not in the bar.' },
                { title: 'Minimal Processing', body: 'We handle each ingredient as little as possible. No isolates, no extracts, no concentrates — just the ingredient itself.' },
                { title: 'No Artificial Additives', body: 'No artificial colours, flavours, preservatives, or sweeteners. The T-Bar\'s flavour comes entirely from its ingredients.' },
                { title: 'Small Batch', body: 'Made in small batches so we can maintain full quality control over every bar that leaves our hands.' },
                { title: 'Transparent Label', body: 'What you see on the label is everything that\'s in the bar. No proprietary blends, no hidden ingredients.' },
              ].map(({ title, body }) => (
                <div key={title}>
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                    <span className="w-2 h-2 bg-amber-400 rounded-full mr-4 flex-shrink-0"></span>
                    {title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed ml-6">{body}</p>
                </div>
              ))}
            </div>
            <div className="h-[2px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-black">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Be the First to Know
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-xl mx-auto">
            T-Bar is currently in development. Join our waitlist to get exclusive early access,
            special launch pricing, and updates on our progress.
          </p>
          <div className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-amber-500/20 rounded-3xl p-8 md:p-10">
            <MailchimpSignup />
          </div>
        </div>
      </section>
      {/* Disclaimer */}
      <div className="bg-black border-t border-gray-900 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3">
            <span className="text-gray-700 text-[10px] font-bold tracking-[0.2em] uppercase flex-shrink-0 mt-0.5">Notice</span>
            <div className="h-full w-px bg-gray-800 flex-shrink-0" />
            <p className="text-gray-600 text-xs leading-relaxed">
              This product was produced in a home kitchen not subject to public health inspection that may also process common food allergens. If you have safety concerns, contact your local health department.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
