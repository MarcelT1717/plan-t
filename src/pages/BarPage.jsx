import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronDown, Star } from 'lucide-react';
import { barsData } from '../data/barsData';
import { MailchimpSignup } from '../components/MailchimpSignup';

const colorHex = {
  red:    '#ef4444',
  green:  '#22c55e',
  orange: '#f97316',
  purple: '#a855f7',
  black:  '#71717a',
};

const faqItems = [
  {
    q: 'How long do the bars stay fresh?',
    a: 'Best within 2 weeks at room temperature. Refrigerated, they keep for up to 2 months. No preservatives means freshness depends on storage conditions.',
  },
  {
    q: 'Are the bars gluten free?',
    a: 'Yes. All ingredients are naturally gluten free. We do not use any gluten-containing ingredients in any variant.',
  },
  {
    q: 'Are these bars vegan?',
    a: 'Most variants are plant-based. Plan T Orange and Plan T Purple contain raw honey. All other variants are vegan.',
  },
  {
    q: 'Where are the bars made?',
    a: 'Handcrafted in a home kitchen in Chicago, IL, under the Illinois Cottage Food Law.',
  },
  {
    q: 'What does the registration number mean?',
    a: 'Under Illinois Cottage Food Law, all home-produced food products require a county registration number. Ours is issued by Cook County.',
  },
];

function Stars({ count }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i <= count ? 'fill-amber-400 text-amber-400' : 'fill-gray-700 text-gray-700'}`}
        />
      ))}
    </span>
  );
}

export const BarPage = () => {
  const { barId } = useParams();
  const navigate = useNavigate();
  const bar = barsData[barId];
  const [openFaq, setOpenFaq] = useState(null);

  if (!bar) {
    return (
      <div className="min-h-screen bg-zinc-950 pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-sm tracking-widest uppercase mb-4">Not Found</p>
          <button onClick={() => navigate('/ingredients')} className="text-amber-400 hover:text-amber-300 transition-colors">
            ← Back to The Bar
          </button>
        </div>
      </div>
    );
  }

  const hex = colorHex[bar.id];
  const otherBars = Object.values(barsData).filter((b) => b.id !== bar.id);

  return (
    <div className="min-h-screen bg-zinc-950 pt-20">

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="py-14 border-b border-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-10 text-xs text-gray-600 font-medium">
            <button onClick={() => navigate('/ingredients')} className="hover:text-gray-400 transition-colors">
              The Bar
            </button>
            <span>/</span>
            <span className={bar.color.text}>Plan T {bar.variant}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

            {/* Left: product info */}
            <div>
              <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-6 border ${bar.color.badge}`}>
                {bar.status}
              </span>

              <h1 className={`text-7xl md:text-8xl font-black tracking-tight leading-none mb-4 ${bar.color.text}`}>
                {bar.variant}
              </h1>

              <p className="text-gray-500 text-sm mb-2 tracking-wide">{bar.name} · {bar.subtitle}</p>
              <p className="text-gray-400 text-sm mb-6 tracking-wide">{bar.tagline}</p>

              <p className="text-gray-300 text-base leading-relaxed mb-8 max-w-lg">{bar.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {bar.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1.5 bg-zinc-900 rounded-full text-gray-400 text-xs font-medium">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Reviews summary */}
              {bar.reviews?.length > 0 && (
                <div className="flex items-center gap-3">
                  <Stars count={5} />
                  <span className="text-white font-bold text-sm">4.8</span>
                  <span className="text-gray-600 text-sm">({bar.reviews.length} reviews)</span>
                </div>
              )}
            </div>

            {/* Right: product label image */}
            <div className="relative rounded-2xl overflow-hidden bg-zinc-900 shadow-2xl shadow-black/60">
              <img
                src={bar.productImage}
                alt={`Plan T ${bar.variant} label`}
                className="w-full h-auto block"
              />
              <div className={`absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r ${bar.color.strip}`} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────────────────────── */}
      <section className="py-10 border-b border-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            {[
              { label: 'Net weight',   value: bar.netWeight },
              { label: 'Ingredients',  value: `${bar.ingredients.length} total` },
              { label: 'Key mineral',  value: bar.keyMineral },
              { label: 'Reg #',        value: bar.registration },
            ].map(({ label, value }, i) => (
              <React.Fragment key={label}>
                {i > 0 && <div className="hidden sm:block w-px h-10 bg-gray-800 flex-shrink-0" />}
                <div>
                  <p className="text-gray-600 text-xs mb-1">{label}</p>
                  <p className="text-white font-black text-2xl tracking-tight">{value}</p>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ingredients + Key Nutrients ──────────────────────────────── */}
      <section className="py-14 border-b border-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Ingredients by weight */}
            <div className="bg-zinc-900/50 rounded-2xl overflow-hidden">
              <div className={`h-[2px] bg-gradient-to-r ${bar.color.strip}`} />
              <div className="p-8">
                <h3 className="text-gray-500 text-[10px] font-bold tracking-[0.3em] uppercase mb-8">
                  Ingredients — Listed by Weight
                </h3>
                <div className="space-y-5">
                  {bar.ingredients.map((ingredient) => (
                    <div key={ingredient.name}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: hex }}
                          />
                          <span className="text-white text-sm font-medium">{ingredient.name}</span>
                        </div>
                        <span className="text-gray-500 text-sm font-mono">{ingredient.percentage}%</span>
                      </div>
                      <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden ml-5">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${ingredient.percentage}%`, backgroundColor: hex, opacity: 0.65 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-gray-800">
                  <p className="text-gray-600 text-[10px] font-bold tracking-[0.2em] uppercase mb-2">Allergens</p>
                  <p className="text-gray-400 text-sm">{bar.allergens}</p>
                </div>
              </div>
            </div>

            {/* Key Nutrients */}
            <div className="bg-zinc-900/50 rounded-2xl overflow-hidden">
              <div className={`h-[2px] bg-gradient-to-r ${bar.color.strip}`} />
              <div className="p-8">
                <h3 className="text-gray-500 text-[10px] font-bold tracking-[0.3em] uppercase mb-8">
                  Key Nutrients
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {bar.keyNutrients.map((nutrient) => (
                    <div key={nutrient.name} className="bg-zinc-800/60 rounded-xl p-4">
                      <p className="text-white font-bold text-sm mb-1">{nutrient.name}</p>
                      <p className="text-gray-500 text-xs leading-relaxed">
                        {nutrient.source} — {nutrient.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Label Info + Order ───────────────────────────────────────── */}
      <section className="py-14 border-b border-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Label information */}
            <div className="bg-zinc-900/50 rounded-2xl overflow-hidden">
              <div className={`h-[2px] bg-gradient-to-r ${bar.color.strip}`} />
              <div className="p-8">
                <h3 className="text-gray-500 text-[10px] font-bold tracking-[0.3em] uppercase mb-8">
                  Label Information
                </h3>
                <div>
                  {[
                    { label: 'Product name',      value: `Plan T ${bar.variant} Bar` },
                    { label: 'Net weight',         value: bar.netWeight },
                    { label: 'Cook County Reg #',  value: bar.registration },
                    { label: 'Produced in',        value: 'Chicago, IL' },
                    { label: 'Status',             value: bar.status },
                  ].map(({ label, value }, i, arr) => (
                    <div
                      key={label}
                      className={`flex items-center justify-between py-3.5 ${i < arr.length - 1 ? 'border-b border-gray-800' : ''}`}
                    >
                      <span className="text-gray-500 text-sm">{label}</span>
                      <span className="text-white text-sm font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order / Coming Soon */}
            <div className="bg-zinc-900/50 rounded-2xl overflow-hidden">
              <div className={`h-[2px] bg-gradient-to-r ${bar.color.strip}`} />
              <div className="p-8">
                <h3 className="text-gray-500 text-[10px] font-bold tracking-[0.3em] uppercase mb-6">
                  Order
                </h3>
                <p className="text-white font-black text-5xl tracking-tight mb-1">
                  $0.99
                  <span className="text-gray-500 font-normal text-lg ml-2">per bar</span>
                </p>
                <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase border my-5 ${bar.color.badge}`}>
                  {bar.status}
                </span>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                  Join the waitlist to be notified when Plan T {bar.variant} launches. Early subscribers get priority access.
                </p>
                <MailchimpSignup />
                <div className="mt-6 space-y-2">
                  {[
                    'Ships within Illinois only (cottage food)',
                    'Handmade in small batches in Chicago',
                    'Fresh within 2 weeks of production date',
                  ].map((note) => (
                    <p key={note} className="text-gray-600 text-xs flex items-start gap-2">
                      <span className="text-amber-500/50 flex-shrink-0 mt-0.5">·</span>
                      {note}
                    </p>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Why Each Ingredient + FAQ ────────────────────────────────── */}
      <section className="py-14 border-b border-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Why each ingredient */}
            <div className="bg-zinc-900/50 rounded-2xl overflow-hidden">
              <div className={`h-[2px] bg-gradient-to-r ${bar.color.strip}`} />
              <div className="p-8">
                <h3 className="text-gray-500 text-[10px] font-bold tracking-[0.3em] uppercase mb-8">
                  Why Each Ingredient
                </h3>
                <div>
                  {bar.ingredients.map((ingredient, idx) => (
                    <div
                      key={ingredient.name}
                      className={`flex gap-4 py-5 ${idx < bar.ingredients.length - 1 ? 'border-b border-gray-800' : ''}`}
                    >
                      <span
                        className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: `${hex}25`, color: hex }}
                      >
                        {idx + 1}
                      </span>
                      <div>
                        <p className="text-white font-bold text-sm mb-1.5">{ingredient.name}</p>
                        <p className="text-gray-500 text-sm leading-relaxed">{ingredient.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-zinc-900/50 rounded-2xl overflow-hidden">
              <div className={`h-[2px] bg-gradient-to-r ${bar.color.strip}`} />
              <div className="p-8">
                <h3 className="text-gray-500 text-[10px] font-bold tracking-[0.3em] uppercase mb-8">
                  Frequently Asked Questions
                </h3>
                <div>
                  {faqItems.map((item, idx) => (
                    <div
                      key={idx}
                      className={idx < faqItems.length - 1 ? 'border-b border-gray-800' : ''}
                    >
                      <button
                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                        className="w-full flex items-center justify-between py-4 text-left"
                      >
                        <span className="text-white text-sm font-medium pr-4">{item.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-gray-600 flex-shrink-0 transition-transform duration-200 ${openFaq === idx ? 'rotate-180' : ''}`}
                        />
                      </button>
                      {openFaq === idx && (
                        <p className="text-gray-500 text-sm leading-relaxed pb-4">{item.a}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Customer Reviews ─────────────────────────────────────────── */}
      {bar.reviews?.length > 0 && (
        <section className="py-14 border-b border-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-gray-500 text-[10px] font-bold tracking-[0.3em] uppercase mb-8">
              Customer Reviews
            </h3>
            <div className="space-y-4">
              {bar.reviews.map((review, idx) => (
                <div key={idx} className="bg-zinc-900/50 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-white font-bold text-sm">{review.name}</span>
                      <span className="text-gray-600 text-sm"> — {review.location}</span>
                    </div>
                    <Stars count={review.stars} />
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{review.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── You Might Also Like ──────────────────────────────────────── */}
      <section className="py-14 border-b border-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-gray-500 text-[10px] font-bold tracking-[0.3em] uppercase mb-8">
            You Might Also Like
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {otherBars.map((b) => (
              <Link
                key={b.id}
                to={`/bars/${b.id}`}
                className="group bg-zinc-900/50 rounded-2xl overflow-hidden hover:bg-zinc-900 transition-colors duration-300"
              >
                <div className={`h-[2px] bg-gradient-to-r ${b.color.strip}`} />
                <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                  <img
                    src={b.productImage}
                    alt={`Plan T ${b.variant}`}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-300"
                  />
                </div>
                <div className="p-4">
                  <p className="text-gray-600 text-[9px] font-bold tracking-widest uppercase mb-1">Plan T</p>
                  <p className={`${b.color.text} font-black text-lg tracking-[0.1em]`}>{b.variant}</p>
                  <p className="text-gray-600 text-xs mt-1 truncate">{b.tagline.split('·')[0].trim()}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Disclaimer ───────────────────────────────────────────────── */}
      <div className="py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3">
            <span className="text-gray-700 text-[10px] font-bold tracking-[0.2em] uppercase flex-shrink-0 mt-0.5">
              Notice
            </span>
            <div className="w-px bg-gray-800 self-stretch flex-shrink-0" />
            <p className="text-gray-600 text-xs leading-relaxed">
              This product was produced in a home kitchen not subject to public health inspection that may also
              process common food allergens. If you have safety concerns, contact your local health department.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
