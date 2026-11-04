import React from 'react';
import { cottageNotice } from '../data/site';

export const CottageNotice = () => (
  <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-start gap-3">
      <span className="text-gray-700 text-[10px] font-bold tracking-[0.2em] uppercase flex-shrink-0 mt-0.5">
        Notice
      </span>
      <div className="w-px bg-gray-800 self-stretch flex-shrink-0" />
      <p className="text-gray-600 text-xs leading-relaxed">{cottageNotice}</p>
    </div>
  </div>
);
