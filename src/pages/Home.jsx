import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, TrendingDown, Activity, Flame, Leaf, Award, Heart, Sparkles } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '../components/ui/carousel';
import { MailchimpSignup } from '../components/MailchimpSignup';
import { ingredientsData } from '../mock';
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
      // Keep placeholder data if fetch fails
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
      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1609307446757-488da3c17b40?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODF8MHwxfHNlYXJjaHw0fHxwcm90ZWluJTIwYmFyfGVufDB8fHxibGFja3wxNzczMjcxNDk2fDA&ixlib=rb-4.1.0&q=85"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-red-500/10 border border-red-500/30 rounded-full backdrop-blur-sm">
              <TrendingDown className="w-5 h-5 text-red-400" />
              <span className="text-red-400 text-sm font-semibold tracking-wide">CRISIS ALERT</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
              <span className="text-white block mb-4">Testosterone Levels Are</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-500 to-amber-400 block">
                Plummeting
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Men's testosterone has dropped <span className="text-red-400 font-bold">25% since 1980</span>. 
              We're on a mission to spread awareness and empower men with knowledge.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
              <button 
                onClick={() => navigate('/about')}
                className="group px-10 py-5 bg-gradient-to-r from-amber-500 to-amber-600 text-black text-lg font-bold rounded-lg hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>Join The Plan</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button
                onClick={() => document.getElementById('subscribe').scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-5 bg-white/10 backdrop-blur-md border-2 border-amber-400/50 text-white text-lg font-bold rounded-lg hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

      </section>

      {/* Stats Section */}
      <section className="relative -mt-5 z-20 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group relative p-10 bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl border border-red-500/30 rounded-2xl hover:border-red-500/60 transition-all duration-300 hover:scale-105 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-amber-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 text-center">
                <TrendingDown className="w-14 h-14 text-red-400 mx-auto mb-4" />
                <div className="text-5xl md:text-6xl font-bold text-white mb-3">25%</div>
                <div className="text-gray-300 text-lg">Decrease Since 1980</div>
              </div>
            </div>

            <div className="group relative p-10 bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl border border-amber-500/30 rounded-2xl hover:border-amber-500/60 transition-all duration-300 hover:scale-105 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-amber-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 text-center">
                <Activity className="w-14 h-14 text-amber-400 mx-auto mb-4" />
                <div className="text-5xl md:text-6xl font-bold text-white mb-3">420</div>
                <div className="text-gray-300 text-lg">Average ng/dL Today</div>
              </div>
            </div>

            <div className="group relative p-10 bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl border border-amber-500/30 rounded-2xl hover:border-amber-500/60 transition-all duration-300 hover:scale-105 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-red-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 text-center">
                <Flame className="w-14 h-14 text-amber-400 mx-auto mb-4" />
                <div className="text-5xl md:text-6xl font-bold text-white mb-3">605</div>
                <div className="text-gray-300 text-lg">1980 Average ng/dL</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testosterone Decline Chart Section */}
      <section className="py-32 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              The Declining <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-400">Trend</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Research shows a consistent decline in average testosterone levels across all age groups over the past four decades.
            </p>
          </div>

          {/* Enhanced Chart */}
          <div className="bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-sm border-2 border-red-500/30 rounded-3xl p-8 md:p-12 mb-8 shadow-2xl">
            <div className="relative h-[500px]">
              {/* Y-axis */}
              <div className="absolute left-0 top-0 bottom-12 flex flex-col justify-between text-gray-400 text-sm font-semibold pr-6 w-20">
                <span className="text-amber-400">700</span>
                <span>600</span>
                <span>500</span>
                <span>400</span>
                <span className="text-red-400">300</span>
              </div>

              {/* Chart area */}
              <div className="ml-20 mr-4 h-full relative pb-12">
                {/* Grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between pb-12">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="border-t border-gray-800"></div>
                  ))}
                </div>

                {/* Enhanced SVG Chart */}
                <svg className="absolute inset-0 w-full h-full pb-12" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <defs>
                    <linearGradient id="strokeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#F59E0B" />
                      <stop offset="50%" stopColor="#F97316" />
                      <stop offset="100%" stopColor="#EF4444" />
                    </linearGradient>
                    <linearGradient id="fillGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#EF4444" stopOpacity="0.05" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  {/* Area fill */}
                  <path
                    d="M 0,15 L 20,20 L 40,30 L 60,45 L 80,65 L 100,80 L 100,100 L 0,100 Z"
                    fill="url(#fillGradient)"
                  />
                  
                  {/* Main decline line */}
                  <path
                    d="M 0,15 L 20,20 L 40,30 L 60,45 L 80,65 L 100,80"
                    fill="none"
                    stroke="url(#strokeGradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#glow)"
                  />
                  
                  {/* Data point circles with different colors */}
                  <circle cx="0" cy="15" r="6" fill="#F59E0B" className="drop-shadow-lg" />
                  <circle cx="20" cy="20" r="6" fill="#F59E0B" className="drop-shadow-lg" />
                  <circle cx="40" cy="30" r="6" fill="#F97316" className="drop-shadow-lg" />
                  <circle cx="60" cy="45" r="6" fill="#F97316" className="drop-shadow-lg" />
                  <circle cx="80" cy="65" r="6" fill="#EF4444" className="drop-shadow-lg" />
                  <circle cx="100" cy="80" r="6" fill="#DC2626" className="drop-shadow-lg" />
                </svg>

                {/* X-axis labels */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-between text-gray-400 text-sm font-semibold">
                  <span>1980</span>
                  <span>1990</span>
                  <span>2000</span>
                  <span>2010</span>
                  <span>2020</span>
                  <span>2024</span>
                </div>

                {/* Value labels above points */}
                <div className="absolute inset-0">
                  {[
                    { x: 0, y: 15, label: "605", color: "text-amber-400" },
                    { x: 20, y: 20, label: "580", color: "text-amber-400" },
                    { x: 40, y: 30, label: "550", color: "text-amber-400" },
                    { x: 60, y: 45, label: "510", color: "text-amber-400" },
                    { x: 80, y: 65, label: "450", color: "text-red-400" },
                    { x: 100, y: 80, label: "420", color: "text-red-500" }
                  ].map((data, index) => (
                    <div
                      key={index}
                      className="absolute transform -translate-x-1/2 -translate-y-full"
                      style={{ left: `${data.x}%`, top: `${data.y}%` }}
                    >
                      <div className="mb-2 text-center">
                        <span className={`${data.color} font-bold text-lg bg-black/80 px-3 py-1.5 rounded-lg border border-current/30 backdrop-blur-sm shadow-lg`}>
                          {data.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Y-axis label */}
                <div className="absolute -left-16 top-1/2 -translate-y-1/2 -rotate-90 text-gray-500 text-xs font-semibold tracking-wider whitespace-nowrap">
                  TESTOSTERONE (ng/dL)
                </div>
              </div>
            </div>

            {/* Chart caption and source */}
            <div className="mt-8 pt-6 border-t border-gray-800">
              <p className="text-center text-gray-400 mb-4 leading-relaxed">
                This dramatic decline affects energy levels, muscle mass, mood, libido, and overall quality of life. 
                Understanding this trend is the first step toward reclaiming male vitality.
              </p>
              <div className="text-center">
                <a 
                  href="https://academic.oup.com/jcem/article/92/1/196/2598434" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-amber-400 hover:text-amber-300 transition-colors duration-300"
                >
                  <span className="mr-2">📊</span>
                  <span>Source: Journal of Clinical Endocrinology & Metabolism</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section - Lighter Background Transition */}
      <section className="py-32 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-amber-500/20 border border-amber-400/40 rounded-full mb-8 backdrop-blur-sm">
            <Heart className="w-5 h-5 text-amber-400" />
            <span className="text-amber-400 text-sm font-semibold tracking-wide">OUR MISSION</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">Plan T</span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
            We're on a mission to raise awareness about the testosterone crisis affecting men worldwide and provide 
            science-backed information to help you take control of your health.
          </p>

          <p className="text-lg text-gray-300 leading-relaxed mb-10">
            Plan T isn't just about numbers — it's about reclaiming vitality, confidence, and quality of life. 
            Through education, community, and actionable insights, we're building a movement of informed men 
            who refuse to accept decline as inevitable.
          </p>

          <button 
            onClick={() => navigate('/about')}
            className="inline-flex items-center space-x-2 px-10 py-5 bg-gradient-to-r from-amber-500 to-amber-600 text-black text-lg font-bold rounded-lg hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105"
          >
            <span>Learn More About Our Mission</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Featured Blog Posts / Newsletter Section */}
      <section className="py-24 bg-gradient-to-b from-gray-700 to-gray-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Insights</span>
            </h2>
            <p className="text-xl text-gray-300">
              Research-backed articles and updates from the Plan T community
            </p>
          </div>

          {loadingCampaigns ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
              <p className="text-gray-400 mt-4">Loading latest articles...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {displayCampaigns.map((campaign, index) => {
                const Icon = getCategoryIcon(campaign.category);
                return (
                  <div 
                    key={index}
                    className="group bg-gradient-to-br from-gray-800/90 to-black/90 backdrop-blur-sm border border-amber-500/20 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 hover:scale-105"
                  >
                    <div className="h-48 bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center">
                      <Icon className="w-16 h-16 text-amber-400" />
                    </div>
                    <div className="p-6">
                      <span className="text-amber-400 text-xs font-semibold uppercase tracking-wider">
                        {campaign.category || 'Newsletter'}
                      </span>
                      <h3 className="text-xl font-bold text-white mt-3 mb-3">
                        {campaign.title}
                      </h3>
                      <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                        {campaign.description}
                      </p>
                      {campaign.published_date && (
                        <p className="text-gray-500 text-xs mb-4">{campaign.published_date}</p>
                      )}
                      <a 
                        href={campaign.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-400 hover:text-amber-300 font-semibold text-sm flex items-center space-x-2 transition-colors duration-300"
                      >
                        <span>Read More</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="subscribe" className="py-24 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border border-amber-500/30 rounded-3xl p-12 md:p-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Join The <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Revolution</span>
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Get exclusive tips on boosting testosterone naturally, early access to new products, and join a community of men reclaiming their vitality.
            </p>

            <MailchimpSignup className="max-w-xl mx-auto" />
          </div>
        </div>
      </section>
    </div>
  );
};
