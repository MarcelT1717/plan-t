import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqItems } from '../data/faq';

export const Faq = () => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div>
      {faqItems.map((item, idx) => (
        <div
          key={item.q}
          className={idx < faqItems.length - 1 ? 'border-b border-gray-800' : ''}
        >
          <button
            onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
            aria-expanded={openFaq === idx}
            className="w-full flex items-center justify-between py-4 text-left"
          >
            <span className="text-white text-sm font-medium pr-4">{item.q}</span>
            <ChevronDown
              className={`w-4 h-4 text-gray-600 flex-shrink-0 transition-transform duration-200 ${openFaq === idx ? 'rotate-180' : ''}`}
            />
          </button>
          {openFaq === idx && (
            <p className="text-gray-500 text-sm leading-relaxed pb-4">{item.a}</p>
          )}
        </div>
      ))}
    </div>
  );
};
