import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Pencil, Check, RotateCcw, X, Plus } from 'lucide-react';
import { barsData } from '../data/barsData';
import { pantry, pantryKey } from '../data/pantry';

const barList = Object.values(barsData);
const MAX_INGREDIENTS = 8;

const variantHex = {
  red:    '#ef4444',
  green:  '#22c55e',
  orange: '#f97316',
  purple: '#a855f7',
  black:  '#d4d4d8',
  custom: '#f5b83d',
};

const FOIL =
  'linear-gradient(105deg, #6e5010 0%, #e3c062 14%, #a67c1a 28%, #f5dd8a 46%, #9c7416 60%, #e9c96b 78%, #7a5a12 100%)';

const recipeFor = (bar) =>
  bar.ingredients.map((i) => ({ key: pantryKey(i.name), weight: i.percentage }));

// Zig-zag crimp along the top and bottom edges of the wrapper.
const crimpPath = (() => {
  const teeth = 18;
  const depth = 2.2;
  const pts = [];
  for (let i = 0; i <= teeth; i++) pts.push(`${(i / teeth) * 100}% ${i % 2 ? depth : 0}%`);
  for (let i = teeth; i >= 0; i--) pts.push(`${(i / teeth) * 100}% ${100 - (i % 2 ? depth : 0)}%`);
  return `polygon(${pts.join(',')})`;
})();

const crimpBand = {
  background:
    'repeating-linear-gradient(90deg, rgba(0,0,0,0.22) 0 1px, rgba(255,255,255,0.18) 1px 2px, transparent 2px 5px)',
};

const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

const builderStyles = `
  @keyframes bar-pop {
    from { opacity: 0; transform: translateY(14px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  .bar-pop { animation: bar-pop 0.45s ease both; }
`;

export const BarBuilder = () => {
  const [barId, setBarId] = useState('red');
  const [recipe, setRecipe] = useState(() => recipeFor(barsData.red));
  const [editing, setEditing] = useState(false);
  const [activeKey, setActiveKey] = useState('dates');
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, sx: 30, sy: 20 });

  const bar = barsData[barId];
  const isCustom = JSON.stringify(recipe) !== JSON.stringify(recipeFor(bar));
  const hex = variantHex[isCustom ? 'custom' : barId];
  const variant = isCustom ? 'CUSTOM' : bar.variant;

  const total = recipe.reduce((sum, r) => sum + r.weight, 0);
  const items = recipe.map((r) => ({ ...r, ...pantry[r.key], share: (r.weight / total) * 100 }));
  const labelItems = [...items].sort((a, b) => b.weight - a.weight);
  const active = items.find((i) => i.key === activeKey) ?? items[0];

  const facts = {
    allergens: [...new Set(items.map((i) => i.allergen).filter(Boolean))],
    bee: items.some((i) => i.bee),
  };

  const selectBar = (id) => {
    const next = recipeFor(barsData[id]);
    setBarId(id);
    setRecipe(next);
    setActiveKey(next[0].key);
  };

  const setWeight = (key, weight) =>
    setRecipe((r) => r.map((i) => (i.key === key ? { ...i, weight } : i)));

  const removeIngredient = (key) => {
    if (recipe.length <= 1) return;
    const next = recipe.filter((i) => i.key !== key);
    setRecipe(next);
    if (activeKey === key) setActiveKey(next[0].key);
  };

  const addIngredient = (key) => {
    if (recipe.length >= MAX_INGREDIENTS) return;
    setRecipe((r) => [...r, { key, weight: 5 }]);
    setActiveKey(key);
  };

  const handleMove = (e) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ ry: (px - 0.5) * 18, rx: (0.5 - py) * 12, sx: px * 100, sy: py * 100 });
  };

  const available = Object.keys(pantry).filter((key) => !recipe.some((r) => r.key === key));

  return (
    <section id="build" className="relative py-28 overflow-hidden border-b border-gray-900 scroll-mt-16">
      <style>{builderStyles}</style>

      {/* Colour glow that follows the selected flavour */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[900px] h-[900px] rounded-full blur-[120px] transition-colors duration-700"
          style={{ background: `radial-gradient(circle, ${hex}22 0%, transparent 60%)` }}
        />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px w-8 bg-amber-500/40" />
          <span className="text-gray-700 text-[10px] font-bold tracking-[0.3em] uppercase">The Line-Up</span>
          <div className="h-px flex-1 bg-gray-900" />
        </div>
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight mb-4">
            Five Flavours.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Build Your Own.</span>
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto">
            Pick a flavour, tap any ingredient to see what it is, or hit Customize to build your own.
          </p>
        </div>

        {/* Flavour tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12" role="tablist" aria-label="Choose a flavour">
          {barList.map((b) => {
            const selected = b.id === barId;
            return (
              <button
                key={b.id}
                role="tab"
                aria-selected={selected}
                onClick={() => selectBar(b.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-black tracking-[0.2em] border transition-all duration-300 ${
                  selected ? 'bg-zinc-900' : 'border-gray-800 text-gray-500 hover:text-gray-300 hover:border-gray-700'
                }`}
                style={selected ? { color: variantHex[b.id], borderColor: `${variantHex[b.id]}80` } : undefined}
              >
                {b.variant}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-10 lg:gap-14 items-center">

          {/* ── Left: ingredient list / editor ─────────────────────── */}
          <div className="order-2 lg:order-1 bg-zinc-900/60 backdrop-blur rounded-2xl overflow-hidden">
            <div className="h-[2px] transition-colors duration-500" style={{ background: hex }} />
            <div className="p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-gray-500 text-[10px] font-bold tracking-[0.3em] uppercase">
                  {editing ? 'Edit Your Bar' : 'Ingredients · By Weight'}
                </h2>
                <button
                  onClick={() => setEditing(!editing)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-amber-500/30 text-amber-400 text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-amber-500/10 transition-colors"
                >
                  {editing ? <Check className="w-3 h-3" /> : <Pencil className="w-3 h-3" />}
                  {editing ? 'Done' : 'Customize'}
                </button>
              </div>

              <ul className="space-y-1">
                {items.map((item) => {
                  const selected = item.key === active.key;
                  return (
                    <li
                      key={item.key}
                      className={`rounded-xl px-3 py-2.5 transition-colors ${selected ? 'bg-zinc-800/80' : 'hover:bg-zinc-800/40'}`}
                    >
                      <div className="flex items-center gap-3">
                        <button onClick={() => setActiveKey(item.key)} className="flex-1 flex items-center gap-3 text-left min-w-0">
                          <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
                          <span className={`text-sm font-medium truncate ${selected ? 'text-white' : 'text-gray-400'}`}>{item.name}</span>
                          <span className="ml-auto text-gray-500 text-xs font-mono">{item.share.toFixed(0)}%</span>
                        </button>
                        {editing && (
                          <button
                            onClick={() => removeIngredient(item.key)}
                            disabled={recipe.length <= 1}
                            aria-label={`Remove ${item.name}`}
                            className="text-gray-600 hover:text-red-400 disabled:opacity-30 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      {editing ? (
                        <input
                          type="range"
                          min="1"
                          max="60"
                          value={item.weight}
                          onChange={(e) => setWeight(item.key, Number(e.target.value))}
                          aria-label={`${item.name} amount`}
                          className="w-full mt-2 ml-0"
                          style={{ accentColor: item.color }}
                        />
                      ) : (
                        <div className="h-1 bg-zinc-800 rounded-full overflow-hidden mt-2 ml-5">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${item.share}%`, background: item.color, opacity: 0.8 }}
                          />
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>

              {editing && (
                <div className="mt-6 pt-5 border-t border-gray-800">
                  <p className="text-gray-600 text-[10px] font-bold tracking-[0.2em] uppercase mb-3">
                    Add from the pantry {recipe.length >= MAX_INGREDIENTS && `· max ${MAX_INGREDIENTS}`}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {available.map((key) => (
                      <button
                        key={key}
                        onClick={() => addIngredient(key)}
                        disabled={recipe.length >= MAX_INGREDIENTS}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-gray-800 text-gray-400 text-xs hover:border-gray-600 hover:text-white disabled:opacity-30 disabled:hover:border-gray-800 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                        {pantry[key].name}
                      </button>
                    ))}
                  </div>
                  {isCustom && (
                    <button
                      onClick={() => selectBar(barId)}
                      className="mt-5 inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-300 text-xs transition-colors"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Reset to Plan T {bar.variant.charAt(0)}{bar.variant.slice(1).toLowerCase()}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ── Centre: the wrapper ────────────────────────────────── */}
          <div
            className="order-1 lg:order-2 mx-auto"
            style={{ perspective: '1200px', width: 'min(300px, 78vw)' }}
            onMouseMove={handleMove}
            onMouseLeave={() => setTilt({ rx: 0, ry: 0, sx: 30, sy: 20 })}
          >
            <div
              key={barId}
              className="bar-pop"
              style={{
                transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                transition: 'transform 0.2s ease-out',
                filter: 'drop-shadow(0 35px 45px rgba(0,0,0,0.65))',
              }}
            >
              <div className="relative overflow-hidden" style={{ clipPath: crimpPath, aspectRatio: '300 / 540', background: FOIL }}>
                <div className="absolute inset-x-0 top-0 h-[7%]" style={crimpBand} />
                <div className="absolute inset-x-0 bottom-0 h-[7%]" style={crimpBand} />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at ${tilt.sx}% ${tilt.sy}%, rgba(255,255,255,0.45), transparent 45%)`,
                    mixBlendMode: 'overlay',
                  }}
                />

                {/* Black label */}
                <div className="absolute left-[9%] right-[9%] top-[10%] bottom-[10%] bg-black flex flex-col items-center text-center px-4 py-5 shadow-inner">
                  <img src="/logo.png" alt="" className="h-10 w-auto mb-1.5" />
                  <p
                    className="font-black text-xl tracking-[0.2em] leading-none"
                    style={{
                      background: 'linear-gradient(160deg, #E8C96A 0%, #C9A84C 45%, #A07828 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    PLAN T
                  </p>
                  <p className="text-white/80 text-[8px] font-bold tracking-[0.25em] mt-1.5 mb-2">MEN'S NUTRITION BAR</p>
                  <p className="font-black text-4xl leading-none tracking-tight mb-3 transition-colors duration-500" style={{ color: hex }}>
                    {variant}
                  </p>

                  <ul className="flex-1 flex flex-col justify-center gap-0.5">
                    {labelItems.map((item) => (
                      <li key={item.key}>
                        <button
                          onClick={() => setActiveKey(item.key)}
                          className="text-[11px] font-bold tracking-[0.14em] uppercase transition-colors hover:opacity-100"
                          style={{ color: item.key === active.key ? hex : 'rgba(245,245,245,0.85)' }}
                        >
                          {item.name}
                        </button>
                      </li>
                    ))}
                  </ul>

                  <p className="text-amber-300/80 text-[7px] font-bold tracking-[0.2em] mt-2">REAL INGREDIENTS · NOTHING ARTIFICIAL</p>
                  <p className="text-amber-300/80 text-[8px] tracking-[0.12em] mt-1">NET WT. 1.8 oz (50g)</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: ingredient detail + bar facts ───────────────── */}
          <div className="order-3 space-y-4">
            <div key={active.key} className="bar-pop bg-zinc-900/60 backdrop-blur rounded-2xl overflow-hidden">
              <div className="h-[2px]" style={{ background: active.color }} />
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-1">
                  <h3 className="text-white font-black text-2xl tracking-tight">{active.name}</h3>
                  <span className="text-3xl font-black tracking-tight" style={{ color: hex }}>
                    {active.share.toFixed(0)}<span className="text-base text-gray-500">%</span>
                  </span>
                </div>
                <p className="text-gray-500 text-[10px] font-bold tracking-[0.2em] uppercase mb-4">{active.role}</p>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{active.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {active.nutrients.map((n) => (
                    <span key={n} className="px-2.5 py-1 bg-zinc-800/70 rounded-full text-gray-500 text-[10px] font-mono tracking-wider">
                      {n}
                    </span>
                  ))}
                </div>
                {(active.allergen || active.bee) && (
                  <p className="text-amber-400/80 text-xs mt-4">
                    {active.allergen ? `Allergen: ${active.allergen}` : 'Bee product: not suitable for people with bee or pollen allergies.'}
                  </p>
                )}
              </div>
            </div>

            <div className="bg-zinc-900/60 backdrop-blur rounded-2xl p-6">
              {[
                { label: 'Ingredients', value: items.length },
                { label: 'Contains', value: [...facts.allergens, facts.bee && 'Bee Products'].filter(Boolean).join(', ') || 'No major allergens' },
                { label: 'Plant-based', value: facts.bee ? 'No (bee products)' : 'Yes' },
                { label: 'Net weight', value: '1.8 oz (50g)' },
              ].map(({ label, value }, i, arr) => (
                <div key={label} className={`flex items-start justify-between gap-4 py-2.5 ${i < arr.length - 1 ? 'border-b border-gray-800' : ''}`}>
                  <span className="text-gray-500 text-sm">{label}</span>
                  <span className="text-white text-sm font-medium text-right">{value}</span>
                </div>
              ))}

              {isCustom ? (
                <p className="text-gray-500 text-xs leading-relaxed mt-5">
                  This is just for exploring. Custom bars aren't for sale. Join the waitlist below to hear when new flavours launch.
                </p>
              ) : (
                <Link
                  to={`/bars/${barId}`}
                  className="group mt-5 inline-flex items-center gap-2 text-sm font-bold tracking-wide transition-colors"
                  style={{ color: hex }}
                >
                  View Plan T {bar.variant.charAt(0)}{bar.variant.slice(1).toLowerCase()}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
