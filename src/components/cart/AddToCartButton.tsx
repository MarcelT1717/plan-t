import React from 'react';
import { useCart } from './CartContext';
import { barsData } from '../../data/barsData';

type BarId = keyof typeof barsData;

/** "Add to Bag" once Shopify is connected and the bar has a variant ID; "Coming Soon" until then. */
export function AddToCartButton({ barId, className = '' }: { barId: BarId; className?: string }) {
  const { enabled, busy, addItem, setOpen } = useCart();
  const variantId = (barsData[barId] as { shopifyVariantId?: string }).shopifyVariantId;
  const live = enabled && Boolean(variantId);

  return (
    <button
      onClick={() => (live ? addItem(variantId as string) : setOpen(true))}
      disabled={live && busy}
      className={`inline-flex items-center justify-center px-6 py-3.5 text-xs font-bold tracking-[0.25em] uppercase transition-colors duration-300 disabled:opacity-60 ${
        live
          ? 'bg-[#D4AF65] text-[#080808] hover:bg-[#E4C57E]'
          : 'border border-[#D4AF65]/40 text-[#D4AF65] hover:bg-[#D4AF65]/10'
      } ${className}`}
    >
      {live ? 'Add to Bag' : 'Coming Soon'}
    </button>
  );
}
