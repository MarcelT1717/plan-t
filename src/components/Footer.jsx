import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';
import { SiTiktok } from 'react-icons/si';
import { MailchimpSignup } from './MailchimpSignup';
import { Wordmark } from './Navbar';
import { site } from '../data/site';
import { barsData } from '../data/barsData';

const linkClass = 'text-[#F5F1E8]/55 hover:text-[#D4AF65] text-sm transition-colors duration-300';
const headingClass = 'text-[#D4AF65] text-[10px] font-semibold tracking-[0.35em] uppercase mb-5';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1714] border-t border-[#D4AF65]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-14">
        {/* Waitlist / newsletter */}
        <div
          id="subscribe"
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center pb-10 mb-10 border-b border-[#F5F1E8]/10 scroll-mt-24"
        >
          <div>
            <p className="text-[#D4AF65] text-[10px] font-semibold tracking-[0.4em] uppercase mb-2">Join the Waitlist</p>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl text-[#F5F1E8] leading-tight mb-2">Be first to taste Royal T.</h2>
            <p className="text-[#F5F1E8]/45 text-sm leading-relaxed max-w-md">
              Launch news and early access. We ship within Illinois at launch; outside the state, we'll let you know when we can ship to you.
            </p>
          </div>
          <MailchimpSignup className="w-full lg:max-w-lg lg:justify-self-end" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-10">
          {/* Brand and socials */}
          <div className="lg:col-span-5">
            <Link to="/" className="inline-flex items-center gap-3 mb-4" aria-label="Royal T home">
              <img src="/royal-t/logo.png" alt="" className="h-10 w-auto" />
              <Wordmark className="text-2xl" />
            </Link>
            <p className="text-[#F5F1E8]/45 text-sm leading-relaxed max-w-sm mb-5">
              Men's nutrition bars made with raw honey, royal jelly and whole-food ingredients.
              Handmade in small batches in {site.location}.
            </p>
            <div className="flex gap-4">
              <a href={site.social.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer"
                 className="text-[#F5F1E8]/50 hover:text-[#D4AF65] transition-colors duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href={site.social.tiktok} aria-label="TikTok" target="_blank" rel="noopener noreferrer"
                 className="text-[#F5F1E8]/50 hover:text-[#D4AF65] transition-colors duration-300">
                <SiTiktok className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 grid grid-cols-3 gap-6 sm:gap-8 lg:gap-10 lg:pt-2">
            <div>
              <h3 className={headingClass}>Explore</h3>
              <ul className="space-y-3">
                <li><Link to="/" className={linkClass}>Home</Link></li>
                <li><Link to="/our-mission" className={linkClass}>Our Mission</Link></li>
                <li><Link to="/learn-more#ingredients" className={linkClass}>Ingredients</Link></li>
              </ul>
            </div>

            <div>
              <h3 className={headingClass}>The Bars</h3>
              <ul className="space-y-3">
                {Object.values(barsData).map((bar) => (
                  <li key={bar.id}>
                    <Link to={`/learn-more#${bar.id}`} className={`${linkClass} font-display tracking-[0.15em]`}>{bar.variant}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className={headingClass}>Support</h3>
              <ul className="space-y-3">
                <li><Link to="/contact" className={linkClass}>Contact</Link></li>
                <li><Link to="/learn-more#faq" className={linkClass}>FAQ</Link></li>
                <li>
                  <a href="/Privacy Policy for Plan T.pdf" target="_blank" rel="noopener noreferrer" className={linkClass}>Privacy Policy</a>
                </li>
                <li>
                  <a href="/Terms of Service for Plan T.pdf" target="_blank" rel="noopener noreferrer" className={linkClass}>Terms of Service</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[#F5F1E8]/5 flex flex-col md:flex-row justify-between gap-3 text-[#F5F1E8]/35 text-xs">
          <p>© {currentYear} Royal T. All rights reserved.</p>
          <p>Handmade in {site.location} · Cook County Cottage Food Reg. #{site.registration}</p>
        </div>
      </div>
    </footer>
  );
};
