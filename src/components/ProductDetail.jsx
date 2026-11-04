import React from 'react';
import { StarRating } from './StarRating';
import { AddToCartButton } from './cart/AddToCartButton';
import { useBarRating } from '../hooks/useBarRating';

/** Everything that used to live on the individual bar pages, as one section. */
export const ProductDetail = ({ bar }) => {
  const { average, count, myRating, submitRating, submitting, ready } = useBarRating(bar.id);
  const title = bar.variant.charAt(0) + bar.variant.slice(1).toLowerCase();

  return (
    <section id={bar.id} className="py-20 md:py-24 border-t border-[#F5F1E8]/5 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

        {/* Label */}
        <div className="lg:col-span-4 relative">
          <div
            className="absolute inset-0 -m-10 pointer-events-none"
            style={{ background: `radial-gradient(circle at 50% 45%, ${bar.hex}55 0%, transparent 65%)` }}
          />
          <img src={bar.label} alt={`Royal T ${title} label`} className="relative w-full max-w-xs mx-auto rounded-lg shadow-[0_30px_60px_rgba(0,0,0,0.7)]" />
        </div>

        <div className="lg:col-span-8">
          <p className="text-[#D4AF65] text-[10px] font-semibold tracking-[0.4em] uppercase mb-3">{bar.status}</p>
          <h2 className="font-display text-4xl md:text-5xl mb-2">
            Royal T {title}
          </h2>
          <p className="text-[#F5F1E8]/50 text-sm tracking-[0.15em] uppercase mb-6">{bar.flavor} · {bar.netWeight}</p>
          <p className="text-[#F5F1E8]/70 leading-relaxed mb-8 max-w-2xl">{bar.description}</p>

          <div className="flex flex-wrap items-center gap-6 mb-10">
            <AddToCartButton barId={bar.id} />
            <div className="flex items-center gap-3">
              <StarRating value={Math.round(average)} readOnly size="w-4 h-4" />
              <span className="text-[#F5F1E8]/50 text-sm">
                {count > 0 ? `${average.toFixed(1)} · ${count} ${count === 1 ? 'rating' : 'ratings'}` : 'No ratings yet'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Ingredients */}
            <div className="bg-[#2A251F] border border-[#F5F1E8]/5 p-6">
              <h3 className="text-[#D4AF65] text-[10px] font-semibold tracking-[0.35em] uppercase mb-5">Ingredients</h3>
              <ol className="space-y-3">
                {bar.ingredients.map((ing, i) => (
                  <li key={ing.key} className="flex items-center gap-3">
                    <img src={ing.image} alt="" className="w-9 h-9 rounded-full object-cover ring-1 ring-[#D4AF65]/25" />
                    <span className="text-[#F5F1E8] text-sm">{ing.name}</span>
                    <span className="ml-auto text-[#F5F1E8]/30 text-xs font-mono">#{i + 1}</span>
                  </li>
                ))}
              </ol>
              <p className="text-[#F5F1E8]/50 text-xs leading-relaxed mt-5 pt-5 border-t border-[#F5F1E8]/5">{bar.allergens}</p>
            </div>

            {/* Key nutrients + label facts */}
            <div className="bg-[#2A251F] border border-[#F5F1E8]/5 p-6">
              <h3 className="text-[#D4AF65] text-[10px] font-semibold tracking-[0.35em] uppercase mb-5">Naturally Contains</h3>
              <ul className="space-y-2.5 mb-6">
                {bar.keyNutrients.map((n) => (
                  <li key={n.name} className="text-sm">
                    <span className="text-[#F5F1E8]">{n.name}</span>
                    <span className="text-[#F5F1E8]/45"> · {n.source}</span>
                  </li>
                ))}
              </ul>
              <dl className="text-sm border-t border-[#F5F1E8]/5 pt-5 space-y-2">
                {[
                  ['Net weight', bar.netWeight],
                  ['Produced in', 'Chicago, IL'],
                  ['Cook County Reg #', bar.registration],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between">
                    <dt className="text-[#F5F1E8]/45">{label}</dt>
                    <dd className="text-[#F5F1E8]">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Rating */}
          <div className="mt-5 bg-[#2A251F] border border-[#F5F1E8]/5 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-[#F5F1E8]/60 text-sm">Tried Royal T {title}?</p>
            {!ready ? (
              <p className="text-[#F5F1E8]/40 text-xs">Ratings are coming soon.</p>
            ) : myRating != null ? (
              <p className="text-[#F5F1E8]/60 text-sm">You rated this {myRating}/5. Thanks!</p>
            ) : (
              <StarRating value={0} onRate={submitRating} readOnly={submitting} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
