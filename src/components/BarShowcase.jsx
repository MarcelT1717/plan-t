import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { pantry } from '../data/pantry';

// Hotspot positions are fractions of the cropped photo (public/plan-t-red-hero.jpg).
const callouts = {
  left: [
    { key: 'beets',        x: 0.12, y: 0.63 },
    { key: 'dates',        x: 0.18, y: 0.81 },
    { key: 'almonds',      x: 0.36, y: 0.87 },
  ],
  right: [
    { key: 'rawHoney',     x: 0.80, y: 0.58 },
    { key: 'royalJelly',   x: 0.92, y: 0.75 },
    { key: 'pumpkinSeeds', x: 0.76, y: 0.80 },
    { key: 'seaSalt',      x: 0.72, y: 0.90, label: 'Salt' },
  ],
};
const allCallouts = [...callouts.left, ...callouts.right];
const order = ['dates', 'beets', 'almonds', 'pumpkinSeeds', 'rawHoney', 'royalJelly', 'seaSalt'];

const GOLD = '#e8c25a';

// One soft oval feather with eased stops, so the photo dissolves into the page
// with no visible edge or corner seams.
const fadeMask =
  'radial-gradient(ellipse 50% 50% at 50% 48%, ' +
  '#000 0%, #000 80%, rgba(0,0,0,0.85) 85%, rgba(0,0,0,0.6) 90%, ' +
  'rgba(0,0,0,0.32) 94%, rgba(0,0,0,0.1) 97.5%, transparent 100%)';
const photoFade = {
  maskImage: fadeMask,
  WebkitMaskImage: fadeMask,
};

// Matches the photo's cream backdrop; bright behind the photo, gone before the callout text.
const lightSpill =
  'radial-gradient(ellipse closest-side at 50% 48%, ' +
  'rgba(232,220,205,0.95) 0%, rgba(232,220,205,0.85) 28%, rgba(232,220,205,0.55) 40%, ' +
  'rgba(232,220,205,0.25) 52%, rgba(232,220,205,0.08) 63%, transparent 75%)';
const CYCLE_MS = 3500;

const showcaseStyles = `
  @keyframes hotspot-ping {
    0%   { transform: scale(1);   opacity: 0.7; }
    100% { transform: scale(2.6); opacity: 0; }
  }
  .hotspot-ping { animation: hotspot-ping 1.8s ease-out infinite; }
  @keyframes photo-fade-in {
    from { opacity: 0; filter: blur(6px); }
    to   { opacity: 1; filter: blur(0); }
  }
  .photo-fade-in { animation: photo-fade-in 1.4s ease-out both; }
  @media (prefers-reduced-motion: reduce) { .hotspot-ping, .photo-fade-in { animation: none; } }
`;

function Callout({ spot, side, active, onSelect, anchorRef }) {
  const item = pantry[spot.key];
  const name = spot.label ?? item.name;
  const alignRight = side === 'left';

  return (
    <button
      onClick={() => onSelect(spot.key)}
      onMouseEnter={() => onSelect(spot.key)}
      className={`group w-full flex items-center gap-4 text-left ${alignRight ? 'lg:flex-row-reverse lg:text-right' : ''}`}
      aria-pressed={active}
    >
      <span
        ref={anchorRef}
        className="relative w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
        style={{
          border: `1px solid ${active ? GOLD : 'rgba(232,194,90,0.35)'}`,
          background: active ? 'rgba(232,194,90,0.12)' : 'rgba(24,24,27,0.6)',
          boxShadow: active ? '0 0 24px rgba(232,194,90,0.25)' : 'none',
        }}
      >
        <span className="w-4 h-4 rounded-full" style={{ background: item.color, boxShadow: `0 0 0 3px rgba(0,0,0,0.6)` }} />
      </span>
      <span className="min-w-0">
        <span
          className="block font-black text-sm tracking-[0.18em] uppercase transition-colors duration-300"
          style={{ color: active ? '#fff' : '#9ca3af' }}
        >
          {name}
        </span>
        <span className={`block text-xs leading-relaxed mt-1 transition-colors duration-300 ${active ? 'text-gray-400' : 'text-gray-600'}`}>
          {item.description}
        </span>
        {active && (
          <span className={`flex flex-wrap gap-1 mt-2 ${alignRight ? 'lg:justify-end' : ''}`}>
            {item.nutrients.slice(0, 3).map((n) => (
              <span key={n} className="px-2 py-0.5 bg-zinc-800/80 rounded-full text-gray-500 text-[9px] font-mono tracking-wider">
                {n}
              </span>
            ))}
          </span>
        )}
      </span>
    </button>
  );
}

export const BarShowcase = () => {
  const [activeKey, setActiveKey] = useState('beets');
  const [autoplay, setAutoplay] = useState(true);
  const [lines, setLines] = useState([]);
  const stageRef = useRef(null);
  const imageRef = useRef(null);
  const anchorRefs = useRef({});

  const select = (key) => {
    setAutoplay(false);
    setActiveKey(key);
  };

  // Cycle through the ingredients until the visitor interacts.
  useEffect(() => {
    if (!autoplay || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setInterval(() => {
      setActiveKey((key) => order[(order.indexOf(key) + 1) % order.length]);
    }, CYCLE_MS);
    return () => clearInterval(timer);
  }, [autoplay]);

  const measure = useCallback(() => {
    const stage = stageRef.current?.getBoundingClientRect();
    const img = imageRef.current?.getBoundingClientRect();
    if (!stage || !img) return;
    setLines(
      allCallouts.map((spot) => {
        const anchor = anchorRefs.current[spot.key]?.getBoundingClientRect();
        if (!anchor) return null;
        const isLeft = callouts.left.includes(spot);
        const ax = (isLeft ? anchor.right : anchor.left) - stage.left;
        const ay = anchor.top + anchor.height / 2 - stage.top;
        const hx = img.left + spot.x * img.width - stage.left;
        const hy = img.top + spot.y * img.height - stage.top;
        const elbow = ax + (isLeft ? 28 : -28);
        return { key: spot.key, d: `M ${ax},${ay} L ${elbow},${ay} L ${hx},${hy}` };
      }).filter(Boolean)
    );
  }, []);

  useLayoutEffect(() => {
    measure();
    const observer = new ResizeObserver(measure);
    if (stageRef.current) observer.observe(stageRef.current);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [measure]);

  // Active callout text expands, which moves the anchors, so re-measure.
  useLayoutEffect(measure, [activeKey, measure]);

  const renderColumn = (side) => (
    <div className="flex flex-col gap-8">
      {callouts[side].map((spot) => (
        <Callout
          key={spot.key}
          spot={spot}
          side={side}
          active={activeKey === spot.key}
          onSelect={select}
          anchorRef={(el) => { anchorRefs.current[spot.key] = el; }}
        />
      ))}
    </div>
  );

  return (
    <section className="relative pt-28 pb-20 overflow-hidden">
      <style>{showcaseStyles}</style>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] bg-amber-500/10 rounded-full blur-[160px]" />
      </div>
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="h-px w-10 bg-amber-500/40" />
            <span className="text-amber-500/70 text-[10px] font-bold tracking-[0.35em] uppercase">
              Handmade in Chicago · Small Batch
            </span>
            <div className="h-px w-10 bg-amber-500/40" />
          </div>
          <h1 className="font-black leading-none tracking-tight">
            <span className="block text-white text-4xl sm:text-5xl md:text-6xl mb-2">Real-Food Bars</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 text-2xl sm:text-3xl md:text-4xl leading-tight">
              for men who take their health seriously.
            </span>
          </h1>
        </div>

        <div ref={stageRef} className="relative grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,520px)_1fr] gap-10 lg:gap-14 items-center">

          {/* Leader lines (desktop only) */}
          <svg className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-10" aria-hidden="true">
            {lines.map(({ key, d }) => {
              const on = key === activeKey;
              return (
                <path
                  key={key}
                  d={d}
                  fill="none"
                  stroke={GOLD}
                  strokeWidth={on ? 1.5 : 1}
                  strokeOpacity={on ? 0.95 : 0.3}
                  strokeDasharray={on ? undefined : '3 5'}
                  style={{ transition: 'stroke-opacity 0.3s' }}
                />
              );
            })}
          </svg>

          <div className="order-2 lg:order-1 relative z-[5]">{renderColumn('left')}</div>

          {/* Photo with hotspots */}
          <div className="order-1 lg:order-2 relative">
            {/* Cream light spill, 2× the photo in each direction, that the photo fades into */}
            <div
              className="photo-fade-in absolute pointer-events-none"
              style={{ left: '-50%', top: '-50%', width: '200%', height: '200%', background: lightSpill }}
            />
            <img
              ref={imageRef}
              src="/plan-t-red-hero.jpg"
              alt="Plan T Red bar surrounded by dates, beets, almonds, pumpkin seeds, honeycomb, royal jelly and sea salt"
              className="photo-fade-in relative w-full h-auto block"
              style={photoFade}
              onLoad={measure}
            />
            {allCallouts.map((spot) => {
              const on = spot.key === activeKey;
              return (
                <button
                  key={spot.key}
                  onClick={() => select(spot.key)}
                  aria-label={spot.label ?? pantry[spot.key].name}
                  className="absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center z-20"
                  style={{ left: `${spot.x * 100}%`, top: `${spot.y * 100}%` }}
                >
                  {on && <span className="hotspot-ping absolute inset-0 rounded-full" style={{ background: GOLD }} />}
                  <span
                    className="relative rounded-full transition-all duration-300"
                    style={{
                      width: on ? 14 : 10,
                      height: on ? 14 : 10,
                      background: on ? GOLD : 'rgba(255,255,255,0.85)',
                      boxShadow: '0 0 0 2px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.4)',
                    }}
                  />
                </button>
              );
            })}
          </div>

          <div className="order-3 relative z-[5]">{renderColumn('right')}</div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-14">
          <Link
            to="/bars/red"
            className="group inline-flex items-center justify-center gap-3 px-10 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold tracking-wide hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-300"
          >
            View Plan T Red
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <button
            onClick={() => document.getElementById('build')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center justify-center px-10 py-4 border border-amber-500/30 text-amber-400 font-bold tracking-wide hover:border-amber-500/60 hover:bg-amber-500/5 transition-all duration-300"
          >
            Explore Every Flavour
          </button>
        </div>
      </div>
    </section>
  );
};
