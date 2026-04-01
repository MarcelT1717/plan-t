import React from 'react';
import { TrendingDown, Activity, BookOpen, Target, Heart, Users, Lightbulb, Shield } from 'lucide-react';
import { MailchimpSignup } from '../components/MailchimpSignup';

export const About = () => {
  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-b from-gray-900 to-black">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1562700391-f1c9b87a4c31?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzl8MHwxfHNlYXJjaHwxfHxwb3dlciUyMGVuZXJneXxlbnwwfHx8YmxhY2t8MTc3MzI3MTUwOXww&ixlib=rb-4.1.0&q=85"
            alt="Background"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black"></div>
        </div>

        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-amber-500/10 border border-amber-500/30 rounded-full mb-8 backdrop-blur-md">
            <Heart className="w-5 h-5 text-amber-400" />
            <span className="text-amber-400 text-sm font-semibold tracking-wide">OUR STORY</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Plan T</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 leading-relaxed backdrop-blur-sm bg-black/20 px-6 py-4 rounded-2xl">
            A movement dedicated to raising awareness about the testosterone crisis and empowering men with the knowledge to reclaim their vitality.
          </p>
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
                <Users className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                <h3 className="text-white font-bold text-2xl mb-2">10,000+</h3>
                <p className="text-gray-400 text-sm">Community Members</p>
              </div>
              <div className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-amber-500/20 rounded-2xl p-8 text-center mt-8">
                <BookOpen className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                <h3 className="text-white font-bold text-2xl mb-2">50+</h3>
                <p className="text-gray-400 text-sm">Research Articles</p>
              </div>
              <div className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-amber-500/20 rounded-2xl p-8 text-center -mt-8">
                <Lightbulb className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                <h3 className="text-white font-bold text-2xl mb-2">100+</h3>
                <p className="text-gray-400 text-sm">Educational Resources</p>
              </div>
              <div className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-amber-500/20 rounded-2xl p-8 text-center">
                <Shield className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                <h3 className="text-white font-bold text-2xl mb-2">Science</h3>
                <p className="text-gray-400 text-sm">Evidence-Based</p>
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
              The data is clear: men's testosterone levels have been falling steadily for over 40 years.
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
              <BookOpen className="w-12 h-12 text-amber-400 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-white mb-2">40+</h3>
              <p className="text-gray-400">Years of research data</p>
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
