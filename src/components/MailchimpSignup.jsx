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
      <div className={`${className} flex flex-col items-center justify-center py-6 space-y-3`}>
        <CheckCircle className="w-14 h-14 text-amber-400" />
        <p className="text-xl font-bold text-white">You're in!</p>
        <p className="text-gray-400 text-sm">Thanks for subscribing. Welcome to the Plan T community.</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row gap-4">
          <label htmlFor="mce-EMAIL" className="sr-only">Email Address</label>
          <input
            type="email"
            name="EMAIL"
            id="mce-EMAIL"
            required
            placeholder="Enter your email"
            className="flex-1 px-6 py-4 bg-black/50 border border-amber-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors duration-300"
          />
          <button
            type="submit"
            className="px-10 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold rounded-lg hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105 whitespace-nowrap"
          >
            Subscribe
          </button>
        </div>
        {/* Bot prevention field */}
        <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
          <input type="text" name="b_28775fabee050c7230db497e6_64a17f4ae3" tabIndex="-1" defaultValue="" />
        </div>
        <p className="text-sm text-gray-500 mt-4">
          No spam. Unsubscribe anytime. Your email is safe with us.
        </p>
      </form>
    </div>
  );
};
