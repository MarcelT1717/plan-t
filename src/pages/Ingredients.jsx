import React from 'react';
import { Clock, Leaf, Award, Heart, Sparkles } from 'lucide-react';
import { ingredientsData } from '../mock';

export const Ingredients = () => {
  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Coming Soon Hero */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-b from-gray-900 to-black">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-amber-500/10 border border-amber-500/30 rounded-full mb-8">
            <Clock className="w-5 h-5 text-amber-400" />
            <span className="text-amber-400 text-sm font-semibold tracking-wide">COMING SOON</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">T-Bar</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-6 leading-relaxed">
            A revolutionary testosterone-support nutrition bar crafted with nature's most powerful ingredients.
          </p>
          
          <p className="text-lg text-gray-400 mb-10">
            We're currently in development, perfecting our formula to bring you the highest quality product. 
            Join our waitlist to be the first to know when T-Bar launches.
          </p>

        </div>
      </section>

      {/* What Makes T-Bar Special */}
      <section className="py-24 bg-black border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              What Makes <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">T-Bar</span> Different
            </h2>
            <p className="text-xl text-gray-400">
              More than just a protein bar — a science-backed formula for male vitality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-amber-500/20 rounded-2xl p-8 text-center hover:border-amber-500/50 transition-all duration-300">
              <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="w-8 h-8 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">100% Natural</h3>
              <p className="text-gray-400">
                No artificial ingredients, preservatives, or synthetic compounds. Just pure, whole-food nutrition.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-amber-500/20 rounded-2xl p-8 text-center hover:border-amber-500/50 transition-all duration-300">
              <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Science-Backed</h3>
              <p className="text-gray-400">
                Every ingredient is chosen based on peer-reviewed research for its testosterone-supporting properties.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-amber-500/20 rounded-2xl p-8 text-center hover:border-amber-500/50 transition-all duration-300">
              <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Handcrafted</h3>
              <p className="text-gray-400">
                Made in small batches with care, ensuring the highest quality in every bar.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-amber-500/20 rounded-2xl p-8 text-center hover:border-amber-500/50 transition-all duration-300">
              <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Delicious</h3>
              <p className="text-gray-400">
                Nutrition shouldn't be a compromise. Our formula is as tasty as it is effective.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Planned Ingredients */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Key <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Ingredients</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Each ingredient is carefully selected for its proven ability to support natural testosterone production and male health.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ingredientsData.map((ingredient) => (
              <div
                key={ingredient.id}
                className="group relative bg-black border border-gray-800 hover:border-amber-500/50 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute top-4 left-4 z-20 text-gray-600 font-mono text-sm">
                  {ingredient.number}
                </div>

                <div className="relative h-80 overflow-hidden bg-black">
                  <img
                    src={ingredient.image}
                    alt={ingredient.name}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                </div>

                <div className="p-8 space-y-4">
                  <p className="text-amber-500 text-xs font-bold tracking-[0.2em] uppercase">
                    KEY COMPOUND
                  </p>

                  <h3 className="text-3xl font-bold text-white tracking-tight">
                    {ingredient.name}
                  </h3>

                  <p className="text-amber-500 text-sm font-semibold tracking-wide">
                    {ingredient.compound}
                  </p>

                  <p className="text-gray-400 text-sm leading-relaxed">
                    {ingredient.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-4">
                    {ingredient.nutrients.map((nutrient, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-gray-900 border border-gray-800 text-gray-500 text-xs font-mono uppercase tracking-wider"
                      >
                        {nutrient}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="absolute inset-0 border-2 border-transparent group-hover:border-amber-500/20 transition-all duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How These Ingredients Support Testosterone */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-black border-y border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Science</span>
            </h2>
            <p className="text-xl text-gray-400">
              Understanding how natural compounds support healthy testosterone levels
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-amber-500/20 rounded-3xl p-8 md:p-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-4"></span>
                  Nitric Oxide Production
                </h3>
                <p className="text-gray-300 leading-relaxed ml-6">
                  Ingredients like beetroot contain nitrates that convert to nitric oxide, improving blood flow and nutrient delivery 
                  to Leydig cells (the cells responsible for testosterone production). Better circulation means better hormone synthesis.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-4"></span>
                  Mineral Support
                </h3>
                <p className="text-gray-300 leading-relaxed ml-6">
                  Zinc and magnesium from spinach and seeds are essential cofactors for testosterone synthesis. Studies show that 
                  deficiencies in these minerals directly correlate with lower T levels, while supplementation can restore healthy levels.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-4"></span>
                  Antioxidant Protection
                </h3>
                <p className="text-gray-300 leading-relaxed ml-6">
                  Pomegranate and cacao are rich in antioxidants that protect testosterone-producing cells from oxidative stress. 
                  Research shows pomegranate can increase salivary testosterone by up to 24%.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-4"></span>
                  Anti-Inflammatory Effects
                </h3>
                <p className="text-gray-300 leading-relaxed ml-6">
                  Ginger root contains compounds that reduce inflammation throughout the body, including in testicular tissue. 
                  Lower inflammation creates an optimal environment for hormone production.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-4"></span>
                  Hormonal Balance
                </h3>
                <p className="text-gray-300 leading-relaxed ml-6">
                  Healthy fats from pumpkin seeds support the production of steroid hormones (including testosterone) while 
                  phytosterols help maintain optimal hormone ratios.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Be the First to Know
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            T-Bar is currently in development. Join our waitlist to get exclusive early access, 
            special launch pricing, and updates on our progress.
          </p>
          <p className="text-gray-500 text-sm">
            In the meantime, subscribe to our newsletter for testosterone optimization tips and insights.
          </p>
        </div>
      </section>
    </div>
  );
};
