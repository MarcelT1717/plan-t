import { useEffect } from 'react';

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | Royal T` : "Royal T | Men's Health & Nutrition";
  }, [title]);
}
