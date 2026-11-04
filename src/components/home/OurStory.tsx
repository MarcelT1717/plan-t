import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function OurStory() {
  return (
    <section className="relative py-28 md:py-40 overflow-hidden">
      <img
        src="/royal-t/logo.png"
        alt=""
        aria-hidden="true"
        className="absolute -right-24 top-1/2 -translate-y-1/2 w-[560px] max-w-none opacity-[0.05] pointer-events-none"
      />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <motion.div
          className="lg:col-span-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[#D4AF65] text-[10px] sm:text-xs font-semibold tracking-[0.4em] uppercase mb-6">Our Story</p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#F5F1E8] leading-[1.05]">
            Built on a<br />Higher Standard.
          </h2>
        </motion.div>

        <motion.div
          className="lg:col-span-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="h-px w-16 bg-[#D4AF65]/60 mb-8" />
          <p className="text-[#F5F1E8]/75 text-lg leading-relaxed mb-10">
            Royal T began with a simple idea: nutrition made from ingredients you recognize. Crafted around
            raw honey, royal jelly, and carefully selected whole-food ingredients, our bars bring simplicity
            and purpose together.
          </p>
          <Link
            to="/our-mission"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#E4C57E] via-[#D4AF65] to-[#B98F3E] text-[#080808] text-xs font-bold tracking-[0.25em] uppercase hover:shadow-[0_0_40px_rgba(212,175,101,0.35)] transition-shadow duration-300"
          >
            Read Our Mission
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
