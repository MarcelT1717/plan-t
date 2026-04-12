import React, { useEffect, useRef } from 'react';
import { TrendingDown, Activity, BookOpen, Leaf, Heart, Zap, Lightbulb, Shield } from 'lucide-react';
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

        // Rungs + nucleotide dots
        for (let y = -rungStep; y < canvas.height + rungStep; y += rungStep) {
          const s1    = Math.sin(y * freq + phase);
          const s2    = Math.sin(y * freq + phase + Math.PI);
          const x1    = cx + s1 * amplitude;
          const x2    = cx + s2 * amplitude;
          const depth = (Math.abs(s1) + 0.3) / 1.3; // 0.23–1

          ctx.beginPath();
          ctx.moveTo(x1, y);
          ctx.lineTo(x2, y);
          ctx.strokeStyle = `rgba(245,158,11,${baseAlpha * depth * 0.55})`;
          ctx.lineWidth   = 1.2 * depth;
          ctx.stroke();

          // dot strand 1
          ctx.beginPath();
          ctx.arc(x1, y, 2.2 * depth + 0.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(245,158,11,${baseAlpha * depth * 1.1})`;
          ctx.fill();

          // dot strand 2
          ctx.beginPath();
          ctx.arc(x2, y, 2.2 * depth + 0.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(251,191,36,${baseAlpha * depth * 0.85})`;
          ctx.fill();
        }

        // Strand 1
        ctx.beginPath();
        for (let y = 0; y <= canvas.height; y += 3) {
          const x = cx + Math.sin(y * freq + phase) * amplitude;
          y === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(245,158,11,${baseAlpha * 0.65})`;
        ctx.lineWidth   = 1.6;
        ctx.stroke();

        // Strand 2
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

      {/* Hero Section */}
      <section className="relative min-h-[88vh] flex flex-col justify-center overflow-hidden bg-black">

        {/* DNA helix background */}
        <DNACanvas />

        {/* Central amber glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] bg-amber-500/8 rounded-full blur-[130px]" />
        </div>

        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" style={{ zIndex: 10 }} />

        {/* Content */}
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32" style={{ zIndex: 20 }}>

          {/* Badge */}
          <div className="hero-badge inline-flex items-center space-x-3 px-5 py-2.5 bg-amber-500/10 border border-amber-500/30 rounded-full mb-10 backdrop-blur-sm">
            <span className="pulse-dot w-2 h-2 bg-amber-400 rounded-full inline-block" />
            <span className="text-amber-400 text-xs font-bold tracking-[0.2em] uppercase">Our Story</span>
          </div>

          {/* Title */}
          <h1 className="hero-title text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[1.05] tracking-tight">
            About{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600">
              Plan T
            </span>
          </h1>

          {/* Amber divider line */}
          <div className="flex justify-center mb-8">
            <div className="hero-line h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent" style={{ width: 80 }} />
          </div>

          {/* Body */}
          <p className="hero-body text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto mb-14">
            A movement dedicated to raising awareness about the testosterone crisis and empowering men with the knowledge to reclaim their vitality.
          </p>

          {/* Stats strip — only verified research figures */}
          <div className="hero-stats flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12">
            {[
              { value: '25%',    label: 'Avg. T-level decline since 1980' },
              { value: '1%',     label: 'Annual decline rate per year' },
              { value: '100%',   label: 'Natural whole-food ingredients' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-black text-amber-400 tracking-tight">{s.value}</p>
                <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-24 bg-black border-y border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Mission</span>
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed mb-6">
                Plan T exists to shine a light on one of the most significant yet overlooked health trends of our time:
                the dramatic decline in men's testosterone levels.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed mb-6">
                We believe that every man deserves to understand what's happening to his body, why it matters,
                and what evidence-based steps he can take to optimize his health naturally.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
                Through education, community, and advocacy, we're building a movement of informed men who refuse
                to accept hormonal decline as an inevitable part of aging.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-amber-500/20 rounded-2xl p-8 text-center">
                <Leaf className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                <h3 className="text-white font-bold text-2xl mb-2">6</h3>
                <p className="text-gray-400 text-sm">Key Ingredients</p>
              </div>
              <div className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-amber-500/20 rounded-2xl p-8 text-center mt-8">
                <BookOpen className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                <h3 className="text-white font-bold text-2xl mb-2">Peer</h3>
                <p className="text-gray-400 text-sm">Reviewed Research</p>
              </div>
              <div className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-amber-500/20 rounded-2xl p-8 text-center -mt-8">
                <Zap className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                <h3 className="text-white font-bold text-2xl mb-2">100%</h3>
                <p className="text-gray-400 text-sm">Natural Formula</p>
              </div>
              <div className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-amber-500/20 rounded-2xl p-8 text-center">
                <Shield className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                <h3 className="text-white font-bold text-2xl mb-2">Zero</h3>
                <p className="text-gray-400 text-sm">Compromise</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Testosterone Decline Trend */}
      <section className="py-32 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Understanding the <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-400">Decline</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              The data is clear: men's testosterone levels have been falling steadily for decades.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-amber-500/20 rounded-3xl p-8 md:p-12 mb-12">
            <h3 className="text-2xl font-bold text-white mb-6">Key Findings from Research:</h3>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-2 h-2 bg-amber-400 rounded-full mt-2"></div>
                <div>
                  <h4 className="text-white font-semibold mb-2">25% Average Decline Since 1980</h4>
                  <p className="text-gray-400 leading-relaxed">
                    Multiple studies show that average testosterone levels in men have dropped approximately 1% per year
                    over the past four decades, even when controlling for age, BMI, and other health factors.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-2 h-2 bg-amber-400 rounded-full mt-2"></div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Affects All Age Groups</h4>
                  <p className="text-gray-400 leading-relaxed">
                    This isn't just about older men. Young men in their 20s and 30s today have significantly lower
                    testosterone levels than men of the same age just one generation ago.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-2 h-2 bg-amber-400 rounded-full mt-2"></div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Multiple Contributing Factors</h4>
                  <p className="text-gray-400 leading-relaxed">
                    Environmental toxins, sedentary lifestyles, poor sleep habits, stress, ultra-processed foods,
                    and endocrine-disrupting chemicals all play a role in this concerning trend.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-2 h-2 bg-amber-400 rounded-full mt-2"></div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Wide-Ranging Health Impacts</h4>
                  <p className="text-gray-400 leading-relaxed">
                    Low testosterone is linked to decreased energy, reduced muscle mass, increased body fat,
                    mood disturbances, cognitive decline, cardiovascular issues, and diminished quality of life.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-red-500/30 rounded-2xl p-8 text-center">
              <TrendingDown className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-white mb-2">1%</h3>
              <p className="text-gray-400">Annual decline rate</p>
            </div>

            <div className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-amber-500/30 rounded-2xl p-8 text-center">
              <Activity className="w-12 h-12 text-amber-400 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-white mb-2">300-1000</h3>
              <p className="text-gray-400">Normal range (ng/dL)</p>
            </div>

            <div className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-amber-500/30 rounded-2xl p-8 text-center">
              <Leaf className="w-12 h-12 text-amber-400 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-white mb-2">6</h3>
              <p className="text-gray-400">T-supporting key ingredients</p>
            </div>
          </div>
        </div>
      </section>

      {/* Research-Backed Overview */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-black border-y border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
            Science-Backed <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Approach</span>
          </h2>

          <div className="prose prose-invert max-w-none space-y-8">
            <p className="text-xl text-gray-300 leading-relaxed">
              At Plan T, we're committed to providing information grounded in peer-reviewed research and clinical evidence.
              We're not medical professionals, and we don't offer medical advice. Instead, we educate and empower.
            </p>

            <div className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-amber-500/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Our Educational Focus:</h3>

              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center mt-1">
                    <span className="text-amber-400 text-sm">✓</span>
                  </span>
                  <span className="text-gray-300">
                    <strong className="text-white">Lifestyle Optimization:</strong> Evidence-based strategies for sleep,
                    exercise, stress management, and nutrition
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center mt-1">
                    <span className="text-amber-400 text-sm">✓</span>
                  </span>
                  <span className="text-gray-300">
                    <strong className="text-white">Environmental Awareness:</strong> Understanding and minimizing exposure
                    to endocrine disruptors
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center mt-1">
                    <span className="text-amber-400 text-sm">✓</span>
                  </span>
                  <span className="text-gray-300">
                    <strong className="text-white">Nutritional Science:</strong> Foods and nutrients that support healthy
                    hormone production
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center mt-1">
                    <span className="text-amber-400 text-sm">✓</span>
                  </span>
                  <span className="text-gray-300">
                    <strong className="text-white">Testing & Tracking:</strong> When and how to get tested, understanding
                    your results
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center mt-1">
                    <span className="text-amber-400 text-sm">✓</span>
                  </span>
                  <span className="text-gray-300">
                    <strong className="text-white">Community Support:</strong> Connecting with other men on the same journey
                  </span>
                </li>
              </ul>
            </div>

            <p className="text-lg text-gray-400 leading-relaxed italic border-l-4 border-amber-500 pl-6">
              "We believe that knowledge is power. By understanding what's happening and why, men can make informed
              decisions about their health in consultation with qualified healthcare providers."
            </p>
          </div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-32 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why We <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Started</span>
            </h2>
          </div>

          <div className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-amber-500/20 rounded-3xl p-8 md:p-12">
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              <p>
                Plan T was born from a simple realization: something fundamental is changing in men's health,
                yet few people are talking about it.
              </p>

              <p>
                As we researched the data, the picture became clear. Study after study showed the same disturbing trend:
                testosterone levels falling across all age groups, impacting energy, vitality, mental clarity, and overall quality of life.
              </p>

              <p>
                But here's what troubled us most: despite the mountain of evidence, this issue remains largely invisible
                in mainstream health conversations. Men suffer in silence, attributing their symptoms to stress, aging,
                or "just how life is" — never realizing there's a biological explanation.
              </p>

              <p className="text-amber-400 font-semibold text-xl">
                We started Plan T to change that narrative.
              </p>

              <p>
                This isn't about selling quick fixes or miracle cures. It's about education, awareness, and empowerment.
                It's about giving men the information they need to have informed conversations with their doctors,
                make lifestyle changes backed by science, and take control of their health destiny.
              </p>

              <p>
                Every man who joins Plan T becomes part of a growing movement — a community that refuses to accept
                decline as inevitable and chooses to fight back with knowledge, action, and mutual support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Join the Movement
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Be part of a community dedicated to raising awareness and reclaiming male vitality through knowledge and action.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border border-amber-500/30 rounded-3xl p-12">
            <MailchimpSignup className="max-w-xl mx-auto" />
          </div>
        </div>
      </section>
    </div>
  );
};
