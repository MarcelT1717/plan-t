import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import { barsData } from '../data/barsData';
import { MailchimpSignup } from '../components/MailchimpSignup';

const pageStyles = `
  @keyframes card-appear {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .ingredient-card { animation: card-appear 0.5s ease both; }
  .ingredient-card:nth-child(1) { animation-delay: 0.05s; }
  .ingredient-card:nth-child(2) { animation-delay: 0.12s; }
  .ingredient-card:nth-child(3) { animation-delay: 0.19s; }
  .ingredient-card:nth-child(4) { animation-delay: 0.26s; }
  .ingredient-card:nth-child(5) { animation-delay: 0.33s; }
  .ingredient-card:nth-child(6) { animation-delay: 0.40s; }
`;

export const BarPage = () => {
  const { barId } = useParams();
  const navigate = useNavigate();
  const bar = barsData[barId];

  if (!bar) {
    return (
      <div className="min-h-screen bg-black pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-sm tracking-widest uppercase mb-4">Not Found</p>
          <button onClick={() => navigate('/ingredients')} className="text-amber-400 hover:text-amber-300 transition-colors">
            ← Back to The Bar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      <style>{pageStyles}</style>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] flex flex-col justify-end overflow-hidden bg-black">
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-${bar.color.glow} rounded-full blur-[140px]`} />
        </div>
        <div className={`absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r ${bar.color.strip}`} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-16 w-full">
          <div className="flex items-center justify-between mb-12">
            <button
              onClick={() => navigate('/ingredients')}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-300 transition-colors text-xs font-bold tracking-[0.2em] uppercase"
            >
              <ArrowLeft className="w-3 h-3" />
              The Bar
            </button>
            <div className={`inline-flex items-center gap-2 px-4 py-2 border ${bar.color.badge} text-xs font-bold tracking-[0.2em] uppercase`}>
              <Clock className="w-3 h-3" />
              {bar.status}
            </div>
          </div>

          <div className="mb-4">
            <p className="text-gray-600 text-xs font-bold tracking-[0.3em] uppercase mb-1">{bar.name}</p>
            <p className="text-gray-600 text-[10px] tracking-[0.25em] uppercase mb-3">— {bar.subtitle} —</p>
            <h1 className={`text-7xl md:text-8xl lg:text-9xl font-black leading-none tracking-tight ${bar.color.text}`}>
              {bar.variant}
            </h1>
          </div>

          <div className={`h-px w-24 bg-gradient-to-r ${bar.color.strip} mb-6`} />
          <p className="text-gray-400 text-xs font-bold tracking-[0.25em] uppercase mb-4">{bar.tagline}</p>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-2xl mb-10">{bar.description}</p>

          <div className={`inline-grid grid-cols-2 sm:grid-cols-4 gap-px bg-amber-500/10 border ${bar.color.border} overflow-hidden`}>
            {[
              { label: 'Net Weight', value: bar.netWeight },
              { label: 'Reg #',      value: bar.registration },
              { label: 'Allergens',  value: bar.allergens },
              { label: 'Status',     value: bar.status },
            ].map(({ label, value }) => (
              <div key={label} className="bg-zinc-950 px-5 py-3">
                <p className="text-gray-600 text-[9px] font-bold tracking-[0.2em] uppercase mb-1">{label}</p>
                <p className="text-gray-200 text-xs font-medium">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ingredients ──────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <div className="flex items-center gap-4 mb-10">
            <div className={`h-px w-8 bg-gradient-to-r ${bar.color.strip}`} />
            <p className={`${bar.color.text} text-[10px] font-bold tracking-[0.35em] uppercase`}>What's Inside</p>
            <div className="h-px flex-1 bg-gray-900" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                {bar.ingredients.length} Ingredients.<br />Nothing Else.
              </h2>
            </div>
            <p className="text-gray-500 text-base leading-relaxed">
              Every ingredient chosen for quality, flavour, and nutritional integrity. No fillers, no shortcuts — just real food in its most recognisable form.
            </p>
          </div>

          {/* Ingredient photo */}
          <div className="relative rounded-2xl overflow-hidden mb-14 h-64 md:h-80">
            <img
              src="/IMG_3781.jpeg"
              alt="T-Bar ingredients"
              className="w-full h-full object-cover brightness-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            <div className={`absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r ${bar.color.strip}`} />
            <div className="absolute bottom-0 inset-x-0 p-8 flex items-end justify-between">
              <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
                Whole foods, sourced with intention — what you see is everything that's in the bar.
              </p>
              <span className={`${bar.color.text} font-black text-xs tracking-[0.25em] uppercase opacity-60`}>
                Plan T {bar.variant}
              </span>
            </div>
          </div>

          {/* Ingredient cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bar.ingredients.map((ingredient, idx) => (
              <div
                key={ingredient.name}
                className="ingredient-card bg-zinc-900/50 rounded-2xl overflow-hidden hover:bg-zinc-900 transition-colors duration-300"
              >
                <div className={`h-[2px] bg-gradient-to-r ${bar.color.strip} opacity-50`} />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-700 font-mono text-[10px]">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className={`${bar.color.text} text-[9px] font-bold tracking-[0.2em] uppercase opacity-60`}>
                      {ingredient.role}
                    </span>
                  </div>
                  <h3 className="text-white font-black text-xl tracking-tight mb-1">{ingredient.name}</h3>
                  <div className={`h-px bg-gradient-to-r ${bar.color.strip} opacity-20 mb-4`} />
                  <p className="text-gray-400 text-sm leading-relaxed mb-5">{ingredient.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {ingredient.nutrients.map((n) => (
                      <span
                        key={n}
                        className="text-gray-600 text-[9px] font-mono tracking-widest uppercase bg-zinc-800/60 px-2.5 py-1 rounded-full"
                      >
                        {n}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Allergen + registration footer */}
          <div className="mt-10 pt-8 border-t border-gray-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-gray-600 text-xs leading-relaxed">
              <span className="text-gray-700 font-bold tracking-widest uppercase text-[9px]">Allergens · </span>
              {bar.allergens}
            </p>
            <p className="text-gray-700 text-[10px] tracking-widest uppercase">
              Reg #{bar.registration} · {bar.netWeight} · Handcrafted · Small Batch
            </p>
          </div>

        </div>
      </section>

      {/* ── Full Line-Up ─────────────────────────────────────────────── */}
      <section className="py-16 border-t border-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <div className={`h-[2px] w-8 bg-gradient-to-r ${bar.color.strip}`} />
            <span className="text-gray-600 text-[10px] font-bold tracking-[0.3em] uppercase">The Full Line-Up</span>
            <div className="h-px flex-1 bg-gray-900" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {Object.values(barsData).map((b) => (
              <Link
                key={b.id}
                to={`/bars/${b.id}`}
                className={`group bg-zinc-900 rounded-xl overflow-hidden border ${b.id === bar.id ? b.color.border : 'border-transparent'} hover:border-opacity-60 transition-all duration-300`}
              >
                <div className={`h-[2px] bg-gradient-to-r ${b.color.strip}`} />
                <div className="p-4 text-center">
                  <img src="/logo.png" alt="Plan T" className="h-4 w-auto opacity-40 mx-auto mb-2" />
                  <p className={`${b.color.text} font-black text-sm tracking-[0.15em] ${b.id === bar.id ? 'opacity-100' : 'opacity-40 group-hover:opacity-70'} transition-opacity`}>
                    {b.variant}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Waitlist CTA ─────────────────────────────────────────────── */}
      <section className="py-24 border-t border-gray-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className={`${bar.color.text} text-xs font-bold tracking-[0.3em] uppercase mb-4`}>{bar.status}</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
            Be the First to Know
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            Join the waitlist for Plan T {bar.variant} and get early access when it launches.
          </p>
          <div className={`bg-zinc-950 border ${bar.color.border} overflow-hidden rounded-2xl`}>
            <div className={`h-[2px] bg-gradient-to-r ${bar.color.strip}`} />
            <div className="p-8 md:p-10">
              <MailchimpSignup />
            </div>
            <div className={`h-[2px] bg-gradient-to-r ${bar.color.strip} opacity-30`} />
          </div>
        </div>
      </section>

      {/* ── Disclaimer ───────────────────────────────────────────────── */}
      <div className="bg-black border-t border-gray-900 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3">
            <span className="text-gray-700 text-[10px] font-bold tracking-[0.2em] uppercase flex-shrink-0 mt-0.5">Notice</span>
            <div className="w-px bg-gray-800 self-stretch flex-shrink-0" />
            <p className="text-gray-600 text-xs leading-relaxed">
              This product was produced in a home kitchen not subject to public health inspection that may also process common food allergens. If you have safety concerns, contact your local health department.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
