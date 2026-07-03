import React, { useEffect, useRef } from 'react';
import { TrendingDown, Activity, BookOpen, Leaf, Zap, Shield, ArrowRight } from 'lucide-react';
import { MailchimpSignup } from '../components/MailchimpSignup';

const heroStyles = `
  @keyframes pulse-ring {
    0%   { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(245,158,11,0.4); }
    70%  { transform: scale(1);    box-shadow: 0 0 0 18px rgba(245,158,11,0); }
    100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(245,158,11,0); }
  }
  @keyframes fade-up {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes line-grow {
    from { width: 0; }
    to   { width: 80px; }
  }
  .hero-badge  { animation: fade-up 0.7s ease both; animation-delay: 0.1s; }
  .hero-title  { animation: fade-up 0.8s ease both; animation-delay: 0.35s; }
  .hero-line   { animation: line-grow 0.6s ease both; animation-delay: 0.9s; }
  .hero-body   { animation: fade-up 0.8s ease both; animation-delay: 0.65s; }
  .hero-stats  { animation: fade-up 0.8s ease both; animation-delay: 0.85s; }
  .pulse-dot   { animation: pulse-ring 2.4s ease-in-out infinite; }
`;

function DNACanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let phase = 0;
    let raf;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const helixSpacing = 200;
      const helixCount   = Math.ceil(canvas.width / helixSpacing) + 2;

      for (let h = 0; h < helixCount; h++) {
        const cx        = (h - 0.5) * helixSpacing;
        const amplitude = 32;
        const freq      = 0.02;
        const baseAlpha = h % 2 === 0 ? 0.38 : 0.18;
        const rungStep  = 26;

        for (let y = -rungStep; y < canvas.height + rungStep; y += rungStep) {
          const s1    = Math.sin(y * freq + phase);
          const s2    = Math.sin(y * freq + phase + Math.PI);
          const x1    = cx + s1 * amplitude;
          const x2    = cx + s2 * amplitude;
          const depth = (Math.abs(s1) + 0.3) / 1.3;

          ctx.beginPath();
          ctx.moveTo(x1, y);
          ctx.lineTo(x2, y);
          ctx.strokeStyle = `rgba(245,158,11,${baseAlpha * depth * 0.55})`;
          ctx.lineWidth   = 1.2 * depth;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(x1, y, 2.2 * depth + 0.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(245,158,11,${baseAlpha * depth * 1.1})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(x2, y, 2.2 * depth + 0.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(251,191,36,${baseAlpha * depth * 0.85})`;
          ctx.fill();
        }

        ctx.beginPath();
        for (let y = 0; y <= canvas.height; y += 3) {
          const x = cx + Math.sin(y * freq + phase) * amplitude;
          y === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(245,158,11,${baseAlpha * 0.65})`;
        ctx.lineWidth   = 1.6;
        ctx.stroke();

        ctx.beginPath();
        for (let y = 0; y <= canvas.height; y += 3) {
          const x = cx + Math.sin(y * freq + phase + Math.PI) * amplitude;
          y === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(251,191,36,${baseAlpha * 0.5})`;
        ctx.lineWidth   = 1.6;
        ctx.stroke();
      }

      phase += 0.007;
      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}

export const About = () => {
  return (
    <div className="min-h-screen bg-black pt-20">
      <style>{heroStyles}</style>

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden bg-black">
        <DNACanvas />

        {/* Central glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] bg-amber-500/6 rounded-full blur-[140px]" />
        </div>

        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black to-transparent pointer-events-none" style={{ zIndex: 10 }} />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32" style={{ zIndex: 20 }}>

          {/* Badge */}
          <div className="hero-badge inline-flex items-center gap-3 px-5 py-2.5 bg-amber-500/10 border border-amber-500/30 mb-10">
            <span className="pulse-dot w-2 h-2 bg-amber-400 rounded-full" />
            <span className="text-amber-400 text-[10px] font-bold tracking-[0.25em] uppercase">Our Story</span>
          </div>

          {/* Title */}
          <h1 className="hero-title text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[1.05] tracking-tight">
            About{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600">
              Plan T
            </span>
          </h1>

          {/* Divider */}
          <div className="flex justify-center mb-8">
            <div className="hero-line h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent" style={{ width: 80 }} />
          </div>

          {/* Body */}
          <p className="hero-body text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto mb-14">
            A movement dedicated to raising awareness about the testosterone crisis and empowering men with the knowledge to reclaim their vitality.
          </p>

          {/* Stats strip */}
          <div className="hero-stats flex items-center justify-center gap-0">
            {[
              { value: '25%',  label: 'Decline since 1980' },
              { value: '1%',   label: 'Annual rate' },
              { value: '100%', label: 'Natural ingredients' },
            ].map((s, i) => (
              <React.Fragment key={s.label}>
                {i > 0 && <div className="w-px h-10 bg-gray-800 mx-10 flex-shrink-0" />}
                <div className="text-center">
                  <p className="text-2xl font-black text-amber-400 tracking-tight">{s.value}</p>
                  <p className="text-gray-600 text-[9px] font-bold uppercase tracking-widest mt-1">{s.label}</p>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission ───────────────────────────────────────────────────── */}
      <section className="py-24 bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-center gap-4 mb-16">
            <div className="h-px w-8 bg-amber-500/40" />
            <span className="text-gray-700 text-[10px] font-bold tracking-[0.3em] uppercase">Mission</span>
            <div className="h-px flex-1 bg-gray-900" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Text */}
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight tracking-tight">
                Why We<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Exist</span>
              </h2>
              <p className="text-gray-300 text-base leading-relaxed mb-6">
                Plan T exists to shine a light on one of the most significant yet overlooked health trends of our time:
                the dramatic decline in men's testosterone levels.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                We believe that every man deserves to understand what's happening to his body, why it matters,
                and what evidence-based steps he can take to optimize his health naturally.
              </p>
              <p className="text-gray-500 text-sm leading-relaxed">
                Through education, community, and advocacy, we're building a movement of informed men who refuse
                to accept hormonal decline as an inevitable part of aging.
              </p>
            </div>

            {/* Pillars */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Leaf,     value: '6',     label: 'Key Ingredients' },
                { icon: BookOpen, value: 'Peer',  label: 'Reviewed Research' },
                { icon: Zap,      value: '100%',  label: 'Natural Formula' },
                { icon: Shield,   value: 'Zero',  label: 'Compromise' },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="bg-zinc-900/50 rounded-2xl overflow-hidden group hover:bg-zinc-900 transition-colors duration-300">
                  <div className="h-[2px] bg-gradient-to-r from-amber-700 via-amber-400 to-amber-700" />
                  <div className="p-7 text-center">
                    <Icon className="w-6 h-6 text-amber-400/70 mx-auto mb-4" />
                    <div className="h-px bg-amber-500/10 mx-4 mb-4" />
                    <p className="text-white font-black text-xl tracking-tight mb-1">{value}</p>
                    <p className="text-gray-600 text-[9px] font-bold tracking-[0.2em] uppercase">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── The Research ──────────────────────────────────────────────── */}
      <section className="py-24 bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-center gap-4 mb-16">
            <div className="h-px w-8 bg-amber-500/40" />
            <span className="text-gray-700 text-[10px] font-bold tracking-[0.3em] uppercase">The Research</span>
            <div className="h-px flex-1 bg-gray-900" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start mb-14">
            <div className="lg:col-span-3">
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight mb-6">
                Understanding<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-amber-400">The Decline</span>
              </h2>
              <p className="text-gray-400 text-base leading-relaxed">
                The data is clear and consistent across multiple studies spanning four decades.
                Men's testosterone levels have been falling steadily, even when controlling for age,
                BMI, and other health factors.
              </p>
            </div>

            {/* Mini stat items */}
            <div className="lg:col-span-2 flex flex-col gap-6 justify-center">
              {[
                { icon: TrendingDown, value: '1%',       label: 'Annual Decline Rate' },
                { icon: Activity,     value: '300–1000',  label: 'Normal Range (ng/dL)' },
                { icon: Leaf,         value: '6',         label: 'Key Ingredients' },
              ].map(({ icon: Icon, value, label }, i) => (
                <React.Fragment key={label}>
                  {i > 0 && <div className="h-px bg-gray-900" />}
                  <div className="flex items-center gap-5">
                    <Icon className="w-5 h-5 text-amber-400/50 flex-shrink-0" />
                    <div>
                      <p className="text-white font-black text-lg tracking-tight leading-none mb-1">{value}</p>
                      <p className="text-gray-600 text-[9px] font-bold tracking-[0.2em] uppercase">{label}</p>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* 4 finding cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              {
                num: '01',
                title: '25% Average Decline Since 1980',
                body: 'Multiple studies show average testosterone levels have dropped approximately 1% per year over four decades, even when controlling for age, BMI, and other health factors.'
              },
              {
                num: '02',
                title: 'Affects All Age Groups',
                body: 'This isn\'t just about older men. Young men in their 20s and 30s today have significantly lower testosterone than men of the same age one generation ago.'
              },
              {
                num: '03',
                title: 'Multiple Contributing Factors',
                body: 'Environmental toxins, sedentary lifestyles, poor sleep, chronic stress, ultra-processed foods, and endocrine-disrupting chemicals all play a documented role.'
              },
              {
                num: '04',
                title: 'Wide-Ranging Health Impacts',
                body: 'Low testosterone is associated with decreased energy, reduced muscle mass, increased body fat, mood disturbances, cognitive changes, and diminished quality of life.'
              },
            ].map(({ num, title, body }) => (
              <div key={num} className="bg-zinc-900/50 rounded-2xl overflow-hidden group hover:bg-zinc-900 transition-colors duration-300">
                <div className="h-[2px] bg-gradient-to-r from-amber-700 via-amber-400 to-amber-700" />
                <div className="p-8">
                  <div className="flex items-start gap-5">
                    <span className="text-gray-800 font-mono text-xs flex-shrink-0 mt-0.5">{num}</span>
                    <div>
                      <h3 className="text-white font-black text-sm mb-3 tracking-tight leading-snug">{title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{body}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Approach ──────────────────────────────────────────────── */}
      <section className="py-24 bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-center gap-4 mb-16">
            <div className="h-px w-8 bg-amber-500/40" />
            <span className="text-gray-700 text-[10px] font-bold tracking-[0.3em] uppercase">Our Approach</span>
            <div className="h-px flex-1 bg-gray-900" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight mb-8">
                Science-Backed<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Education</span>
              </h2>
              <p className="text-gray-300 text-base leading-relaxed mb-8">
                At Plan T, we're committed to providing information grounded in peer-reviewed research and
                clinical evidence. We're not medical professionals, and we don't offer medical advice —
                we educate and empower.
              </p>
              <div className="border-l-2 border-amber-500/40 pl-6">
                <p className="text-gray-400 text-sm italic leading-relaxed">
                  "We believe that knowledge is power. By understanding what's happening and why, men can make
                  informed decisions about their health in consultation with qualified healthcare providers."
                </p>
              </div>
            </div>

            <div>
              {[
                { label: 'Lifestyle Optimization',   body: 'Evidence-based strategies for sleep, exercise, stress management, and nutrition.' },
                { label: 'Environmental Awareness',  body: 'Understanding and minimizing exposure to endocrine-disrupting chemicals.' },
                { label: 'Nutritional Science',      body: 'Foods and nutrients that support healthy hormone health and overall vitality.' },
                { label: 'Testing & Tracking',       body: 'When and how to get tested, and how to understand your results.' },
                { label: 'Community Support',        body: 'Connecting with other men on the same journey toward better health.' },
              ].map(({ label, body }, i) => (
                <div key={label} className="flex items-start gap-5 py-5 border-b border-gray-900 last:border-0">
                  <span className="text-gray-800 font-mono text-[10px] flex-shrink-0 mt-0.5 w-5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="text-white font-bold text-sm mb-1 tracking-tight">{label}</p>
                    <p className="text-gray-500 text-sm leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Why We Started ────────────────────────────────────────────── */}
      <section className="py-32 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-center gap-4 mb-16">
            <div className="h-px w-8 bg-amber-500/40" />
            <span className="text-gray-700 text-[10px] font-bold tracking-[0.3em] uppercase">Why We Started</span>
            <div className="h-px flex-1 bg-gray-900" />
          </div>

          {/* Pull quote card */}
          <div className="bg-zinc-900/50 rounded-2xl overflow-hidden mb-14">
            <div className="h-[2px] bg-gradient-to-r from-amber-700 via-amber-400 to-amber-700" />
            <div className="p-10 md:p-14">
              <p className="text-amber-400/20 font-black text-8xl leading-none select-none mb-2">"</p>
              <p className="text-white font-black text-2xl md:text-3xl leading-snug tracking-tight mb-6">
                We started Plan T to change the narrative around men's health.
              </p>
              <div className="h-px bg-amber-500/15 mb-5" />
              <p className="text-gray-600 text-xs font-bold tracking-[0.2em] uppercase">Plan T</p>
            </div>
          </div>

          {/* Body text */}
          <div className="space-y-6">
            {[
              'Plan T was born from a simple realization: something fundamental is changing in men\'s health, yet few people are talking about it.',
              'As we researched the data, the picture became clear. Study after study showed the same disturbing trend: testosterone levels falling across all age groups, impacting energy, vitality, mental clarity, and overall quality of life.',
              'But here\'s what troubled us most: despite the mountain of evidence, this issue remains largely invisible in mainstream health conversations. Men suffer in silence, attributing their symptoms to stress, aging, or "just how life is" — never realizing there\'s a biological explanation.',
              'This isn\'t about selling quick fixes or miracle cures. It\'s about education, awareness, and empowerment. It\'s about giving men the information they need to have informed conversations with their doctors, make lifestyle changes backed by science, and take control of their health destiny.',
            ].map((para, i) => (
              <p key={i} className="text-gray-400 text-base leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── Join the Movement ─────────────────────────────────────────── */}
      <section className="py-32 bg-black">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px w-8 bg-amber-500/40" />
            <span className="text-gray-700 text-[10px] font-bold tracking-[0.3em] uppercase">Join Us</span>
            <div className="h-px w-8 bg-amber-500/40" />
          </div>

          <h2 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight leading-none">
            Join the<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Movement</span>
          </h2>
          <p className="text-gray-500 text-base mb-14 max-w-sm mx-auto leading-relaxed">
            Be part of a community dedicated to raising awareness and reclaiming male vitality through knowledge and action.
          </p>

          <div className="bg-zinc-900/50 rounded-2xl overflow-hidden">
            <div className="h-[2px] bg-gradient-to-r from-amber-700 via-amber-400 to-amber-700" />
            <div className="p-8 md:p-12">
              <MailchimpSignup />
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
