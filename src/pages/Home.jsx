import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, TrendingDown, Activity, Flame, Leaf, Sparkles } from 'lucide-react';
import { MailchimpSignup } from '../components/MailchimpSignup';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;


export const Home = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [loadingCampaigns, setLoadingCampaigns] = useState(true);

  useEffect(() => {
    fetchCampaigns();
    if (window.location.hash === '#subscribe') {
      setTimeout(() => {
        document.getElementById('subscribe')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/campaigns?limit=3`);
      if (response.data.success && response.data.campaigns) {
        setCampaigns(response.data.campaigns);
      }
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    } finally {
      setLoadingCampaigns(false);
    }
  };

  const getCategoryIcon = (category) => {
    const lowerCategory = category?.toLowerCase() || '';
    if (lowerCategory.includes('research')) return Activity;
    if (lowerCategory.includes('lifestyle')) return Leaf;
    return Sparkles;
  };

  const defaultCampaigns = [
    {
      title: "Understanding Testosterone: The Basics",
      description: "A comprehensive guide to what testosterone is, why it matters, and how lifestyle factors impact your levels.",
      category: "Newsletter",
      link: "#"
    },
    {
      title: "The Science Behind the Decline",
      description: "Exploring the environmental, dietary, and lifestyle factors contributing to falling testosterone levels.",
      category: "Research",
      link: "#"
    },
    {
      title: "Natural Ways to Support Healthy T Levels",
      description: "Evidence-based strategies for optimizing testosterone through nutrition, exercise, and sleep.",
      category: "Lifestyle",
      link: "#"
    }
  ];

  const displayCampaigns = campaigns.length > 0 ? campaigns : defaultCampaigns;

  return (
    <div className="min-h-screen bg-black">

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1609307446757-488da3c17b40?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODF8MHwxfHNlYXJjaHw0fHxwcm90ZWluJTIwYmFyfGVufDB8fHxibGFja3wxNzczMjcxNDk2fDA&ixlib=rb-4.1.0&q=85"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/75" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black" />
        </div>

        {/* Ambient glows over image */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-0 w-[700px] h-[700px] bg-amber-500/10 rounded-full blur-[160px]" />
          <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[160px]" />
        </div>

        {/* Top strip */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-36 pb-24">

          {/* Label */}
          <div className="inline-flex items-center gap-3 mb-12">
            <div className="h-px w-10 bg-amber-500/40" />
            <span className="text-amber-500/70 text-[10px] font-bold tracking-[0.35em] uppercase">Since 1980 · Men's Health</span>
            <div className="h-px w-10 bg-amber-500/40" />
          </div>

          {/* Headline */}
          <h1 className="font-black leading-none tracking-tight mb-10">
            <span className="block text-white text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] mb-2">Testosterone</span>
            <span className="block text-white text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] mb-2">Is In</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 text-6xl sm:text-7xl md:text-8xl lg:text-[7rem]">
              Decline.
            </span>
          </h1>

          {/* Divider */}
          <div className="flex justify-center mb-10">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />
          </div>

          {/* Subtext */}
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-14 leading-relaxed">
            Men's testosterone has dropped{' '}
            <span className="text-white font-semibold">25% since 1980</span>.
            We're raising awareness and empowering men with the knowledge to understand why.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/about')}
              className="group inline-flex items-center justify-center gap-3 px-10 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold tracking-wide hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-300"
            >
              Join The Plan
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => document.getElementById('subscribe').scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center justify-center px-10 py-4 border border-amber-500/30 text-amber-400 font-bold tracking-wide hover:border-amber-500/60 hover:bg-amber-500/5 transition-all duration-300"
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      </section>

      {/* ── Stats Strip ────────────────────────────────────────────────── */}
      <section className="bg-black py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-0">
            {[
              { value: '25%',  label: 'Decrease Since 1980',  sub: 'vs. 1980 baseline' },
              { value: '420',  label: 'Avg. ng/dL Today',     sub: 'normal range: 300–1000' },
              { value: '1%',   label: 'Annual Decline Rate',  sub: 'per year, ongoing' },
            ].map(({ value, label, sub }, i) => (
              <React.Fragment key={label}>
                {i > 0 && (
                  <div className="hidden md:block w-px h-16 bg-gray-800 mx-10 flex-shrink-0" />
                )}
                {i > 0 && (
                  <div className="md:hidden h-px w-16 bg-gray-800 my-8" />
                )}
                <div className="text-center">
                  <p className="text-gray-700 text-[9px] font-bold tracking-[0.3em] uppercase mb-3">{sub}</p>
                  <p className="text-5xl md:text-6xl font-black text-white tracking-tight mb-2">{value}</p>
                  <p className="text-gray-600 text-[10px] font-bold tracking-[0.2em] uppercase">{label}</p>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Decline ────────────────────────────────────────────────── */}
      <section className="py-32 bg-black border-b border-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-center gap-4 mb-16">
            <div className="h-px w-8 bg-amber-500/40" />
            <span className="text-gray-700 text-[10px] font-bold tracking-[0.3em] uppercase">The Data</span>
            <div className="h-px flex-1 bg-gray-900" />
          </div>

          {/* Intro text */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end mb-14">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight mb-8">
                A Generation of <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Silent Decline</span>
              </h2>
              <p className="text-gray-400 text-base leading-relaxed mb-6">
                Research shows a consistent, year-on-year drop in average testosterone across all age groups.
                Young men today have significantly lower testosterone than men of the same age a generation ago.
              </p>
              <p className="text-gray-500 text-sm leading-relaxed">
                Environmental toxins, sedentary lifestyles, ultra-processed diets, and chronic stress all
                contribute to a trend that cuts across age groups and geographies.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { value: '25%',      label: 'Average decline since 1980',  color: 'text-amber-400' },
                { value: '~1%',      label: 'Drop per year, ongoing',      color: 'text-orange-400' },
                { value: '420 ng/dL', label: 'Average level today',        color: 'text-red-400' },
              ].map(({ value, label, color }) => (
                <div key={label} className="flex items-center justify-between border-b border-gray-900 pb-3 last:border-0 last:pb-0">
                  <span className="text-gray-600 text-xs tracking-wide">{label}</span>
                  <span className={`${color} font-black text-lg tracking-tight`}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Chart card */}
          <div className="bg-zinc-950/70 rounded-2xl overflow-hidden">
            <div className="h-[2px] bg-gradient-to-r from-amber-700 via-amber-400 to-amber-700" />

            <div className="px-6 pt-6 pb-4">
              {/* Chart header */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-700 text-[9px] font-bold tracking-[0.3em] uppercase">
                  Average Testosterone Level (ng/dL) · 1980–Present
                </p>
                <a
                  href="https://academic.oup.com/jcem/article/92/1/196/2598434"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 hover:text-gray-600 text-[9px] font-mono tracking-widest uppercase transition-colors"
                >
                  JCEM Source ↗
                </a>
              </div>

              {/* SVG chart */}
              <svg
                viewBox="0 0 1000 215"
                className="w-full h-auto"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="declineStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%"   stopColor="#F59E0B" />
                    <stop offset="45%"  stopColor="#F97316" />
                    <stop offset="100%" stopColor="#EF4444" />
                  </linearGradient>
                  <linearGradient id="declineFill" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%"   stopColor="#F59E0B" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="#EF4444" stopOpacity="0.01" />
                  </linearGradient>
                </defs>

                {/* Subtle horizontal grid lines */}
                {[88, 115, 143].map(y => (
                  <line key={y} x1="0" y1={y} x2="1000" y2={y}
                    stroke="#1f1f1f" strokeWidth="1" />
                ))}
                {/* Bottom baseline */}
                <line x1="0" y1="175" x2="1000" y2="175"
                  stroke="#2a2a2a" strokeWidth="1" />

                {/* Area fill under curve */}
                <path
                  d="M 50,83 C 110,86 170,90 230,93 S 350,101 410,105 S 530,116 590,122 S 710,138 770,146 S 890,155 950,159 L 950,175 L 50,175 Z"
                  fill="url(#declineFill)"
                />

                {/* Decline line — smooth bezier */}
                <path
                  d="M 50,83 C 110,86 170,90 230,93 S 350,101 410,105 S 530,116 590,122 S 710,138 770,146 S 890,155 950,159"
                  fill="none"
                  stroke="url(#declineStroke)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Data point dots + value labels */}
                {[
                  { x: 50,  y: 83,  val: '605',  fill: '#F59E0B', lblFill: '#F59E0B' },
                  { x: 230, y: 93,  val: '580',  fill: '#F59E0B', lblFill: '#F59E0B' },
                  { x: 410, y: 105, val: '550',  fill: '#F97316', lblFill: '#F97316' },
                  { x: 590, y: 122, val: '510',  fill: '#F97316', lblFill: '#F97316' },
                  { x: 770, y: 146, val: '450',  fill: '#EF4444', lblFill: '#EF4444' },
                  { x: 950, y: 159, val: '~420', fill: '#DC2626', lblFill: '#DC2626' },
                ].map(({ x, y, val, fill, lblFill }) => (
                  <g key={x}>
                    {/* Dot */}
                    <circle cx={x} cy={y} r="3.5" fill={fill} />
                    <circle cx={x} cy={y} r="6" fill={fill} fillOpacity="0.15" />
                    {/* Value label */}
                    <text
                      x={x} y={y - 13}
                      textAnchor="middle"
                      fill={lblFill}
                      fontSize="11"
                      fontFamily="ui-monospace, monospace"
                      fontWeight="700"
                      opacity="0.9"
                    >
                      {val}
                    </text>
                  </g>
                ))}

                {/* Year labels */}
                {[
                  { x: 50,  label: '1980' },
                  { x: 230, label: '1990' },
                  { x: 410, label: '2000' },
                  { x: 590, label: '2010' },
                  { x: 770, label: '2020' },
                  { x: 950, label: 'Today' },
                ].map(({ x, label }) => (
                  <text
                    key={label}
                    x={x} y="202"
                    textAnchor="middle"
                    fill="#4b4b4b"
                    fontSize="11"
                    fontFamily="ui-monospace, monospace"
                    fontWeight="600"
                    letterSpacing="1"
                  >
                    {label}
                  </text>
                ))}

                {/* ng/dL unit label — top left */}
                <text x="0" y="18" fill="#333333" fontSize="9" fontFamily="ui-monospace, monospace" fontWeight="700" letterSpacing="2">
                  ng/dL
                </text>
              </svg>
            </div>
          </div>

        </div>
      </section>

      {/* ── T-Bar Teaser ───────────────────────────────────────────────── */}
      <section className="py-32 bg-black border-b border-amber-500/10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/4 rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-center gap-4 mb-16">
            <div className="h-px w-8 bg-amber-500/40" />
            <span className="text-gray-700 text-[10px] font-bold tracking-[0.3em] uppercase">The Product</span>
            <div className="h-px flex-1 bg-gray-900" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Packaging visual */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/60">
              <img
                src="/IMG_3795.jpeg"
                alt="T-Bar in packaging"
                className="w-full h-96 object-cover object-center brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 flex items-end justify-between">
                <div>
                  <img src="/logo.png" alt="Plan T" className="h-7 w-auto mb-2 opacity-90" />
                  <p className="text-amber-500/60 text-[10px] font-bold tracking-[0.25em] uppercase">Whole Food Nutrition Bar</p>
                </div>
                <span className="text-amber-400 font-black text-2xl tracking-[0.2em] uppercase">T-Bar</span>
              </div>
              {/* Top colour strip as a subtle gradient rather than a box border */}
              <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-amber-700 via-amber-400 to-amber-700" />
            </div>

            {/* Text */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-8 bg-amber-500/40" />
                <span className="text-amber-500/70 text-[10px] font-bold tracking-[0.3em] uppercase">Introducing</span>
              </div>

              <h2 className="text-6xl md:text-7xl font-black text-white mb-4 leading-none tracking-tight">
                T-Bar
              </h2>
              <div className="h-px w-16 bg-gradient-to-r from-amber-500/50 to-transparent mb-8" />

              <p className="text-gray-300 text-base leading-relaxed mb-10">
                Six whole-food ingredients. Zero artificial additives. No fillers, no shortcuts —
                just real food, made with intention and handcrafted in small batches.
              </p>

              <div className="flex items-center gap-10 mb-10">
                {[['100%', 'Natural'], ['6', 'Ingredients'], ['0', 'Fillers']].map(([val, label], i) => (
                  <React.Fragment key={label}>
                    {i > 0 && <div className="w-px h-10 bg-gray-800 flex-shrink-0" />}
                    <div>
                      <p className="text-amber-400 font-black text-3xl leading-none mb-1">{val}</p>
                      <p className="text-gray-600 text-[9px] font-bold tracking-widest uppercase mt-1">{label}</p>
                    </div>
                  </React.Fragment>
                ))}
              </div>

              <button
                onClick={() => navigate('/ingredients')}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold tracking-wide hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300"
              >
                See the Full Bar
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Latest Insights ────────────────────────────────────────────── */}
      <section className="py-32 bg-black border-b border-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-center gap-4 mb-14">
            <div className="h-px w-8 bg-amber-500/40" />
            <span className="text-gray-700 text-[10px] font-bold tracking-[0.3em] uppercase">Latest Insights</span>
            <div className="h-px flex-1 bg-gray-900" />
          </div>

          {loadingCampaigns ? (
            <div className="text-center py-16">
              <div className="inline-block w-5 h-5 border border-amber-500/40 border-t-amber-500 animate-spin" />
              <p className="text-gray-700 text-[10px] font-bold tracking-[0.3em] uppercase mt-4">Loading</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {displayCampaigns.map((campaign, index) => {
                const Icon = getCategoryIcon(campaign.category);
                return (
                  <div
                    key={index}
                    className="bg-zinc-900/50 rounded-2xl overflow-hidden group hover:bg-zinc-900 transition-colors duration-300 flex flex-col"
                  >
                    <div className="h-[2px] bg-gradient-to-r from-amber-700 via-amber-400 to-amber-700" />
                    <div className="p-8 flex flex-col h-full">
                      <Icon className="w-5 h-5 text-amber-500/40 mb-6" />
                      <p className="text-amber-500/50 text-[9px] font-bold tracking-[0.25em] uppercase mb-4">
                        {campaign.category || 'Newsletter'}
                      </p>
                      <h3 className="text-white font-black text-lg leading-snug tracking-tight mb-4">
                        {campaign.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                        {campaign.description}
                      </p>
                      {campaign.published_date && (
                        <p className="text-gray-700 text-[9px] font-mono tracking-widest uppercase mb-4">
                          {campaign.published_date}
                        </p>
                      )}
                      <div className="h-px bg-gray-800/60 mb-4" />
                      <a
                        href={campaign.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-amber-500/50 hover:text-amber-400 text-[10px] font-bold tracking-[0.2em] uppercase transition-colors duration-300"
                      >
                        Read More
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── Newsletter ─────────────────────────────────────────────────── */}
      <section id="subscribe" className="py-32 bg-black">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px w-8 bg-amber-500/40" />
            <span className="text-gray-700 text-[10px] font-bold tracking-[0.3em] uppercase">Stay Informed</span>
            <div className="h-px w-8 bg-amber-500/40" />
          </div>

          <h2 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight leading-none">
            Join The<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              Revolution
            </span>
          </h2>
          <p className="text-gray-500 text-base mb-14 max-w-sm mx-auto leading-relaxed">
            Research-backed insights, early access, and a community of men taking their health seriously.
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
