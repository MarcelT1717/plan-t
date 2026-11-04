import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { Stethoscope, ArrowRight } from 'lucide-react';
import { site } from '../data/site';
import { barsData, flavorIds } from '../data/barsData';
import { usePageTitle } from '../hooks/usePageTitle';

const ease = [0.22, 1, 0.36, 1];
// Content pops up out of a soft blur as it scrolls into view.
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 60, scale: 0.97, filter: 'blur(8px)' },
  whileInView: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.9, delay, ease },
});
// Images and cards pop in with a little scale and tilt.
const pop = (delay = 0, tilt = 0) => ({
  initial: { opacity: 0, y: 80, scale: 0.86, rotate: tilt },
  whileInView: { opacity: 1, y: 0, scale: 1, rotate: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { type: 'spring', stiffness: 70, damping: 16, mass: 0.9, delay },
});

// Every figure here must stay tied to its published source. Describe what the
// studies found; never say Royal T raises testosterone.
const stats = [
  { value: '~1%', label: 'Yearly decline', source: 'Travison et al., J Clin Endocrinol Metab, 2007' },
  { value: '10–15%', label: 'Lower after a week of short sleep', source: 'Leproult & Van Cauter, JAMA, 2011' },
  { value: '5', label: 'Ingredients in every bar', source: 'Nothing else' },
];

const research = [
  {
    stat: '~1%',
    unit: 'a year',
    body: 'Average testosterone in American men fell by roughly one percent a year between 1987 and 2004, a drop not explained by ageing.',
    source: 'Travison et al., Journal of Clinical Endocrinology & Metabolism, 2007',
  },
  {
    stat: '15–39',
    unit: 'years old',
    body: 'The decline shows up in young men too. National US data from 1999 to 2016 found falling levels among adolescents and young adults.',
    source: 'Lokeshwar et al., European Urology Focus, 2021',
  },
  {
    stat: '10–15%',
    unit: 'lower',
    body: 'One week of sleeping five hours a night lowered daytime testosterone by 10 to 15 percent in young, healthy men.',
    source: 'Leproult & Van Cauter, JAMA, 2011',
  },
];

const foundations = [
  { title: 'Sleep', body: "Much of a man's daily testosterone is released during sleep. Short nights show up in hormone levels within a week." },
  { title: 'Strength', body: 'Regular resistance training is linked with healthier hormone levels, as well as more muscle and stronger bones.' },
  { title: 'Body composition', body: 'Excess body fat is strongly associated with lower testosterone in men of every age.' },
  { title: 'Real food', body: 'A diet built on whole foods rather than ultra-processed snacks supports every other foundation. This is the one we make easier.', ours: true },
];

const signatures = [
  {
    kicker: 'The Hive',
    title: ['Royal jelly,', 'straight from the hive.'],
    body: 'The rare, creamy food worker bees make for their queen. It carries protein, B-vitamins and 10-HDA, a fatty acid found almost nowhere else in nature, and it is folded into every Royal T bar.',
    tags: ['Protein', 'B-vitamins', '10-HDA'],
    image: '/royal-t/ingredients/royalJelly.webp',
  },
  {
    kicker: 'The Sweetness',
    title: ['Sweetened by nature,', 'not a lab.'],
    body: 'Whole dates and raw, unpasteurised honey do all the sweetening and binding. No sugar alcohols, no sucralose, no syrups and nothing you need to look up.',
    tags: ['Dates', 'Raw honey', 'No sweeteners'],
    image: '/royal-t/ingredients/honey.webp',
  },
  {
    kicker: 'The Bar',
    title: ['Small batches,', 'made by hand.'],
    body: `Three flavors, each pressed, cut and wrapped by hand in small batches in ${site.location}. Every ingredient is printed on the front of the wrapper.`,
    tags: ['Red', 'Purple', 'Orange'],
    image: '/royal-t/og.jpg',
    contain: true,
  },
];

// [word, accent]
const statement = [
  ['Sleep.'], ['Strength.'], ['Real'], ['food.'],
  ['The'], ['basics'], ["haven't"], ['changed.'],
  ['We', true], ['just', true], ['made', true], ['one', true], ['of', true], ['them', true], ['easier.', true],
];

const goldGradient = 'text-transparent bg-clip-text bg-gradient-to-r from-[#F1D79A] via-[#D4AF65] to-[#B98F3E]';

function Eyebrow({ children, center }) {
  return (
    <p className={`flex items-center gap-3 text-[#D4AF65] text-[10px] sm:text-xs font-semibold tracking-[0.35em] uppercase mb-5 ${center ? 'justify-center' : ''}`}>
      <span className="w-8 h-px bg-[#D4AF65]/60" />
      {children}
    </p>
  );
}

/**
 * Headline in Cinzel with the second part in gold, matching the home page. Each word rises
 * out of a mask as the headline scrolls into view (or on load, with `immediate`).
 */
function Headline({ as: Tag = 'h2', lead, accent, className = '', immediate }) {
  const words = [...lead.split(' ').map((w) => [w, false]), ...accent.split(' ').map((w) => [w, true])];
  const trigger = immediate ? { animate: 'show' } : { whileInView: 'show', viewport: { once: true, margin: '-60px' } };
  return (
    <Tag className={`font-display leading-[1.1] ${className}`} aria-label={`${lead} ${accent}`}>
      <motion.span initial="hidden" {...trigger} transition={{ staggerChildren: 0.07, delayChildren: immediate ? 0.3 : 0 }} aria-hidden="true">
        {words.map(([word, isAccent], i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em] mr-[0.22em]">
            <motion.span
              className={`inline-block ${isAccent ? `${goldGradient} pr-1` : ''}`}
              variants={{ hidden: { y: '110%', rotate: 4 }, show: { y: '0%', rotate: 0, transition: { duration: 0.8, ease } } }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

/** Image card that pops in, then drifts slightly against the scroll. */
function ParallaxImage({ children, className = '', tilt = 0 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  return (
    <motion.div ref={ref} className={`relative overflow-hidden ${className}`} {...pop(0, tilt)}>
      <motion.div className="absolute -inset-[8%]" style={{ y }}>
        {children}
      </motion.div>
    </motion.div>
  );
}

function Word({ children, accent, range, progress }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <motion.span style={{ opacity }} className={`inline-block mr-[0.25em] ${accent ? `${goldGradient}` : ''}`}>
      {children}
    </motion.span>
  );
}

/** Big statement that lights up word by word as it scrolls through the screen. */
function Statement() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] });
  return (
    <section className="py-28 md:py-40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Eyebrow>The Mission</Eyebrow>
        <p ref={ref} className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.12]">
          {statement.map(([word, accent], i) => (
            <Word key={i} accent={accent} range={[i / statement.length, (i + 1) / statement.length]} progress={scrollYProgress}>
              {word}
            </Word>
          ))}
        </p>
      </div>
    </section>
  );
}

const titleCase = (s) => s.toLowerCase().replace(/(^|[\s-])\w/g, (c) => c.toUpperCase());

/** Flavor tabs and menu-style ingredient cards. */
function Ingredients() {
  const [flavor, setFlavor] = useState(flavorIds[0]);
  const bar = barsData[flavor];
  const odd = bar.ingredients.length % 2 === 1;

  return (
    <section className="py-24 md:py-32 bg-[#211D18] border-t border-[#F5F1E8]/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-12">
          <motion.div className="lg:col-span-7" {...reveal()}>
            <Eyebrow>Inside the Bar</Eyebrow>
            <Headline lead="Five ingredients," accent="nothing extra." className="text-4xl sm:text-5xl lg:text-6xl" />
          </motion.div>
          <motion.p className="lg:col-span-5 text-[#F5F1E8]/55 text-sm leading-relaxed lg:text-right" {...reveal(0.1)}>
            Every flavor shares the same base of dates, raw honey and royal jelly. Pick a flavor to see what makes it different.
          </motion.p>
        </div>

        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-full bg-[#1A1714] border border-[#F5F1E8]/10" role="tablist" aria-label="Flavor">
            {flavorIds.map((id) => (
              <button
                key={id}
                role="tab"
                aria-selected={flavor === id}
                onClick={() => setFlavor(id)}
                className={`relative px-5 sm:px-7 py-2.5 rounded-full text-[11px] font-semibold tracking-[0.25em] uppercase transition-colors duration-300 ${
                  flavor === id ? 'text-[#080808]' : 'text-[#F5F1E8]/60 hover:text-[#F5F1E8]'
                }`}
              >
                {flavor === id && (
                  <motion.span layoutId="flavor-pill" className="absolute inset-0 rounded-full bg-gradient-to-r from-[#E4C57E] via-[#D4AF65] to-[#B98F3E]" transition={{ duration: 0.4, ease }} />
                )}
                <span className="relative">{barsData[id].variant}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.ul
            key={flavor}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease }}
          >
            {bar.ingredients.map((item, i) => (
              <motion.li
                key={item.key}
                {...pop(i * 0.08)}
                className={`flex gap-5 p-5 sm:p-6 rounded-3xl bg-[#2A251F] border border-[#F5F1E8]/5 hover:border-[#D4AF65]/30 transition-colors duration-300 ${
                  odd && i === bar.ingredients.length - 1 ? 'md:col-span-2 md:w-[calc(50%-0.5rem)] md:mx-auto' : ''
                }`}
              >
                <img src={item.image} alt="" className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover ring-1 ring-[#D4AF65]/30 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="flex items-baseline justify-between gap-3 mb-1.5">
                    <h3 className="font-display text-xl sm:text-2xl">{item.name}</h3>
                    <span className="font-display text-[#D4AF65]/70 text-sm">0{i + 1}</span>
                  </div>
                  <p className="text-[#F5F1E8]/55 text-sm leading-relaxed mb-3">{item.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.nutrients.map((n) => (
                      <span key={n} className="px-2.5 py-1 rounded-full border border-[#D4AF65]/25 text-[#F5F1E8]/70 text-[9px] font-semibold tracking-[0.18em] uppercase">
                        {titleCase(n)}
                      </span>
                    ))}
                    {item.note && (
                      <span className="px-2.5 py-1 rounded-full bg-[#E5A638]/10 text-[#E5A638] text-[9px] font-semibold tracking-[0.18em] uppercase">{item.note}</span>
                    )}
                  </div>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </section>
  );
}

export const WhoWeAre = () => {
  usePageTitle('Our Mission');

  return (
    <div className="min-h-screen bg-[#1A1714] text-[#F5F1E8] overflow-x-hidden">

      {/* Hero: image card left, story right */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-28">
        <div className="absolute -top-20 right-0 w-[800px] h-[600px] rounded-full bg-[#E5A638]/10 blur-[160px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease }}
          >
            <div className="relative lg:aspect-[4/5] rounded-[28px] overflow-hidden border border-[#F5F1E8]/10">
              <img src="/royal-t/ingredients/honey.webp" alt="" className="absolute inset-0 w-full h-full object-cover scale-110 blur-[6px] opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#1A1714]/70 via-[#1A1714]/80 to-[#1A1714]" />

              {/* The decline, drawn: illustrative trend, not plotted data */}
              <div className="relative lg:absolute lg:inset-0 flex flex-col p-7 sm:p-9">
                <p className="text-[#F5F1E8]/55 text-[10px] font-semibold tracking-[0.3em] uppercase mb-3">Average testosterone, US men</p>
                <motion.p
                  className={`font-display lining-nums text-7xl sm:text-8xl leading-none ${goldGradient}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.3, ease }}
                >
                  −1%
                </motion.p>
                <p className="font-display text-2xl text-[#F5F1E8]/80 mt-1">a year, every year.</p>

                <div className="flex-1 min-h-0 flex items-end mt-6">
                <svg viewBox="0 0 400 220" className="w-full h-auto max-h-full overflow-visible" aria-hidden="true">
                  <defs>
                    <linearGradient id="hero-trend-fill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#D4AF65" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#D4AF65" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {[55, 110, 165].map((y) => <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="#F5F1E8" strokeOpacity="0.08" strokeDasharray="4 6" />)}
                  <motion.path
                    d="M0 30 C 80 40, 120 62, 200 92 S 320 150, 400 190 L 400 220 L 0 220 Z"
                    fill="url(#hero-trend-fill)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2, delay: 1.4 }}
                  />
                  <motion.path
                    d="M0 30 C 80 40, 120 62, 200 92 S 320 150, 400 190"
                    fill="none"
                    stroke="#E4C57E"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 0.5, ease }}
                  />
                </svg>
                </div>
                <div className="flex justify-between text-[#F5F1E8]/45 text-[10px] font-semibold tracking-[0.25em] mt-3">
                  <span>1987</span>
                  <span>2004</span>
                </div>

                <div className="mt-6 pt-5 border-t border-[#F5F1E8]/10 flex items-end justify-between gap-4">
                  <p className="font-display text-lg sm:text-xl text-[#F5F1E8]/90">“Real food is where it starts.”</p>
                  <p className="text-[#F5F1E8]/30 text-[9px] text-right leading-relaxed flex-shrink-0">Illustrative trend<br />Travison et al., 2007</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease }}
          >
            <Eyebrow>Our Mission · Men's Health</Eyebrow>
            <Headline as="h1" immediate lead="Testosterone is" accent="declining." className="text-[2.6rem] sm:text-6xl mb-8" />
            <p className="text-[#F5F1E8]/70 text-base sm:text-lg leading-relaxed max-w-xl mb-6 first-letter:float-left first-letter:font-display first-letter:text-[4.2rem] first-letter:leading-[0.85] first-letter:mr-3 first-letter:mt-1 first-letter:text-[#D4AF65]">
              Average testosterone in American men has been falling for decades, and not only because men are getting older.
              Sleep, training and body weight all play a part. So does what we eat, and too much of it comes in a wrapper with
              thirty ingredients.
            </p>
            <p className="text-[#F5F1E8]/55 leading-relaxed max-w-xl mb-10">
              Royal T exists to make the food part simple: a bar built on raw honey, royal jelly and whole ingredients, made by hand in {site.location}.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href="#research"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-[#E4C57E] via-[#D4AF65] to-[#B98F3E] text-[#080808] text-xs font-bold tracking-[0.25em] uppercase hover:shadow-[0_0_40px_rgba(212,175,101,0.35)] transition-shadow duration-300"
              >
                See the Research
              </a>
              <Link
                to="/#ingredients"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-[#D4AF65]/40 text-[#D4AF65] text-xs font-bold tracking-[0.25em] uppercase hover:border-[#D4AF65] hover:bg-[#D4AF65]/5 transition-colors duration-300"
              >
                Meet the Bars
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-[#F5F1E8]/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#F5F1E8]/10">
          {stats.map((s, i) => (
            <motion.div key={s.label} className="py-10 sm:py-14 text-center px-4" {...pop(i * 0.12)}>
              <p className={`font-display lining-nums text-5xl lg:text-6xl mb-3 ${goldGradient}`}>{s.value}</p>
              <p className="text-[#F5F1E8]/75 text-[10px] sm:text-[11px] font-semibold tracking-[0.3em] uppercase mb-2">{s.label}</p>
              <p className="text-[#F5F1E8]/30 text-[10px]">{s.source}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Statement />

      {/* Signatures: alternating image and story */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 md:space-y-32">
          {signatures.map((s, i) => {
            const flip = i % 2 === 1;
            return (
              <div key={s.kicker} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                <div className={`lg:col-span-6 relative ${flip ? 'lg:order-2' : ''}`}>
                  <ParallaxImage tilt={flip ? 3 : -3} className="aspect-[5/4] rounded-[28px] border border-[#F5F1E8]/10 bg-[#2A251F] group">
                    {s.contain ? (
                      <>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(229,166,56,0.18),transparent_70%)]" />
                        <img src={s.image} alt="Royal T Red, Purple and Orange labels" className="absolute inset-0 m-auto w-[80%] h-auto rounded-lg transition-transform duration-700 group-hover:scale-[1.03]" />
                      </>
                    ) : (
                      <img src={s.image} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    )}
                  </ParallaxImage>
                  <span className="absolute top-5 left-5 px-4 py-2 rounded-full bg-[#1A1714]/75 backdrop-blur border border-[#F5F1E8]/15 font-display text-sm text-[#F5F1E8] pointer-events-none">
                    0{i + 1} / {s.kicker}
                  </span>
                </div>
                <motion.div className={`lg:col-span-6 ${flip ? 'lg:order-1' : ''}`} {...reveal(0.1)}>
                  <Eyebrow>{s.kicker}</Eyebrow>
                  <Headline lead={s.title[0]} accent={s.title[1]} className="text-4xl sm:text-5xl mb-6" />
                  <p className="text-[#F5F1E8]/60 leading-relaxed max-w-lg mb-7">{s.body}</p>
                  <div className="flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <span key={t} className="px-3.5 py-1.5 rounded-full border border-[#D4AF65]/30 text-[#F5F1E8]/75 text-[10px] font-semibold tracking-[0.2em] uppercase">{t}</span>
                    ))}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </section>

      <Ingredients />

      {/* Research */}
      <section id="research" className="py-24 md:py-32 border-t border-[#F5F1E8]/5 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="max-w-2xl mb-14" {...reveal()}>
            <Eyebrow>The Research</Eyebrow>
            <Headline lead="What the" accent="studies found." className="text-4xl sm:text-5xl lg:text-6xl" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {research.map((r, i) => (
              <motion.article key={r.source} className="flex flex-col rounded-3xl bg-[#2A251F] border border-[#F5F1E8]/5 p-8" {...pop(i * 0.12)}>
                <p className={`font-display lining-nums text-5xl leading-none mb-2 ${goldGradient}`}>{r.stat}</p>
                <p className="text-[#F5F1E8]/45 text-[10px] font-semibold tracking-[0.3em] uppercase mb-6">{r.unit}</p>
                <p className="text-[#F5F1E8]/75 text-sm leading-relaxed mb-8">{r.body}</p>
                <p className="mt-auto pt-5 border-t border-[#F5F1E8]/10 text-[#F5F1E8]/35 text-[11px] leading-relaxed">{r.source}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Foundations */}
      <section className="py-24 md:py-32 bg-[#211D18] border-t border-[#F5F1E8]/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <motion.div className="lg:col-span-5 lg:sticky lg:top-32 self-start" {...reveal()}>
            <Eyebrow>The Foundations</Eyebrow>
            <Headline lead="Four habits" accent="that matter most." className="text-4xl sm:text-5xl mb-6" />
            <p className="text-[#F5F1E8]/55 leading-relaxed max-w-sm">
              There is no shortcut. Research on men's hormone health keeps pointing back to the same basics.
            </p>
          </motion.div>
          <ol className="lg:col-span-7 border-t border-[#F5F1E8]/10">
            {foundations.map((f, i) => (
              <motion.li key={f.title} className="grid grid-cols-[auto_1fr] gap-6 sm:gap-8 py-8 border-b border-[#F5F1E8]/10" {...reveal(i * 0.06)}>
                <span className={`font-display text-4xl sm:text-5xl leading-none ${f.ours ? goldGradient : 'text-[#F5F1E8]/20'}`}>0{i + 1}</span>
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl mb-2 flex flex-wrap items-center gap-3">
                    {f.title}
                    {f.ours && (
                      <span className="font-sans px-2.5 py-1 rounded-full bg-[#D4AF65] text-[#080808] text-[9px] font-bold tracking-[0.2em] uppercase">Where we come in</span>
                    )}
                  </h3>
                  <p className="text-[#F5F1E8]/55 text-sm sm:text-base leading-relaxed max-w-lg">{f.body}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA + doctor note */}
      <section className="py-24 md:py-32 border-t border-[#F5F1E8]/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-20" {...reveal()}>
            <Eyebrow center>Start Today</Eyebrow>
            <Headline lead="Start with" accent="what you eat." className="text-5xl sm:text-6xl mb-6" />
            <p className="text-[#F5F1E8]/60 mb-10">Three flavors, five ingredients each. See exactly what's inside.</p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                to="/#ingredients"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#E4C57E] via-[#D4AF65] to-[#B98F3E] text-[#080808] text-xs font-bold tracking-[0.25em] uppercase hover:shadow-[0_0_40px_rgba(212,175,101,0.35)] transition-shadow duration-300 group"
              >
                Meet the Bars <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-[#D4AF65]/40 text-[#D4AF65] text-xs font-bold tracking-[0.25em] uppercase hover:border-[#D4AF65] hover:bg-[#D4AF65]/5 transition-colors duration-300"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>

          <motion.div className="flex flex-col sm:flex-row gap-5 p-7 sm:p-8 rounded-3xl border border-[#F5F1E8]/10" {...reveal()}>
            <Stethoscope className="w-7 h-7 text-[#D4AF65] flex-shrink-0" strokeWidth={1.25} />
            <p className="text-[#F5F1E8]/60 text-sm leading-relaxed">
              <span className="text-[#F5F1E8] font-semibold">Food, not medicine.</span> Royal T bars are not intended to diagnose,
              treat, cure or prevent any disease, and they are not a treatment for low testosterone. If you're concerned about your
              levels, talk to your doctor. A simple blood test can tell you where you stand.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
