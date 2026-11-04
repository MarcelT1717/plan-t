import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';

export const MailchimpSignup = ({ className = "" }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const params = new URLSearchParams(data).toString();

    fetch(
      `https://gmail.us19.list-manage.com/subscribe/post-json?u=28775fabee050c7230db497e6&id=64a17f4ae3&${params}&c=callback`,
      { method: 'GET', mode: 'no-cors' }
    );

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={`${className} flex items-center gap-4 py-2`} role="status">
        <CheckCircle className="w-9 h-9 text-[#D4AF65] flex-shrink-0" />
        <div>
          <p className="font-display text-lg text-[#F5F1E8]">You're in!</p>
          <p className="text-[#F5F1E8]/50 text-sm">Thanks for subscribing. Welcome to the Royal T community.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit}>
        <div className="flex border border-[#D4AF65]/35 focus-within:border-[#D4AF65] transition-colors duration-300">
          <label htmlFor="mce-EMAIL" className="sr-only">Email Address</label>
          <input
            type="email"
            name="EMAIL"
            id="mce-EMAIL"
            required
            placeholder="Enter your email"
            className="flex-1 min-w-0 px-4 py-3.5 bg-[#F5F1E8]/[0.04] text-[#F5F1E8] text-sm placeholder-[#F5F1E8]/35 focus:outline-none"
          />
          <button
            type="submit"
            className="px-5 sm:px-7 bg-gradient-to-r from-[#E4C57E] via-[#D4AF65] to-[#B98F3E] text-[#080808] text-[10px] font-bold tracking-[0.25em] uppercase hover:shadow-[0_0_30px_rgba(212,175,101,0.35)] transition-shadow duration-300 whitespace-nowrap"
          >
            Subscribe
          </button>
        </div>
        {/* Bot prevention field */}
        <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
          <input type="text" name="b_28775fabee050c7230db497e6_64a17f4ae3" tabIndex="-1" defaultValue="" />
        </div>
        <p className="text-xs text-[#F5F1E8]/35 mt-3">
          No spam. Unsubscribe anytime. Your email is safe with us.
        </p>
      </form>
    </div>
  );
};
