import React, { useState } from 'react';
import { Star } from 'lucide-react';

export function StarRating({ value = 0, onRate, size = 'w-6 h-6', readOnly = false }) {
  const [hover, setHover] = useState(0);
  const display = hover || value;

  return (
    <span className="inline-flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          disabled={readOnly}
          onClick={() => onRate?.(i)}
          onMouseEnter={() => !readOnly && setHover(i)}
          onMouseLeave={() => !readOnly && setHover(0)}
          className={readOnly ? 'cursor-default' : 'cursor-pointer transition-transform hover:scale-110'}
          aria-label={`Rate ${i} star${i > 1 ? 's' : ''}`}
        >
          <Star
            className={`${size} ${i <= display ? 'fill-amber-400 text-amber-400' : 'fill-gray-700 text-gray-700'}`}
          />
        </button>
      ))}
    </span>
  );
}
