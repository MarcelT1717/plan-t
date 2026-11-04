import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus, X } from 'lucide-react';
import { useCart } from './CartContext';
import { barsData, flavorIds } from '../../data/barsData';
import { formatMoney } from '../../lib/shopify';

type BarId = keyof typeof barsData;

export function CartDrawer() {
  const { enabled, cart, open, busy, error, setOpen, setQuantity } = useCart();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, setOpen]);

  const notify = () => {
    setOpen(false);
    setTimeout(() => document.getElementById('subscribe')?.scrollIntoView({ behavior: 'smooth' }), 250);
  };

  const lines = cart?.lines ?? [];

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Shopping bag"
            className="fixed top-0 right-0 bottom-0 z-[61] w-full max-w-md bg-[#211D18] border-l border-[#D4AF65]/20 flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between px-6 h-20 border-b border-[#F5F1E8]/10">
              <h2 className="font-display text-xl tracking-[0.2em] text-[#F5F1E8]">YOUR BAG</h2>
              <button onClick={() => setOpen(false)} aria-label="Close bag" className="text-[#F5F1E8]/60 hover:text-[#F5F1E8] p-2">
                <X className="w-5 h-5" />
              </button>
            </div>

            {!enabled ? (
              <div className="flex-1 overflow-y-auto px-6 py-8">
                <p className="text-[#D4AF65] text-[10px] font-semibold tracking-[0.4em] uppercase mb-3">Shop opening soon</p>
                <p className="text-[#F5F1E8]/65 text-sm leading-relaxed mb-8">
                  Royal T isn't on sale yet. Join the waitlist and we'll email you the moment ordering opens.
                  We'll ship within Illinois at launch.
                </p>
                <ul className="space-y-4 mb-8">
                  {flavorIds.map((id) => {
                    const bar = barsData[id as BarId];
                    return (
                      <li key={id} className="flex items-center gap-4">
                        <img src={bar.label} alt="" className="w-12 h-auto rounded" />
                        <div>
                          <p className="font-display text-[#F5F1E8] tracking-[0.15em]">{bar.variant}</p>
                          <p className="text-[#F5F1E8]/45 text-xs">{bar.flavor} · {bar.netWeight}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <button onClick={notify} className="w-full py-4 bg-[#D4AF65] text-[#080808] text-xs font-bold tracking-[0.25em] uppercase hover:bg-[#E4C57E] transition-colors">
                  Join the Waitlist
                </button>
              </div>
            ) : lines.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                <p className="font-display text-2xl text-[#F5F1E8] mb-2">Your bag is empty.</p>
                <p className="text-[#F5F1E8]/50 text-sm">Add a bar from the Learn More page.</p>
              </div>
            ) : (
              <ul className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                {lines.map((line) => (
                  <li key={line.id} className="flex gap-4">
                    {line.image && <img src={line.image} alt="" className="w-16 h-16 object-cover rounded" />}
                    <div className="flex-1 min-w-0">
                      <p className="text-[#F5F1E8] text-sm font-semibold truncate">{line.productTitle}</p>
                      {line.variantTitle !== 'Default Title' && <p className="text-[#F5F1E8]/45 text-xs">{line.variantTitle}</p>}
                      <p className="text-[#F5F1E8]/70 text-sm mt-1">{formatMoney(line.price * line.quantity, line.currency)}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => setQuantity(line.id, line.quantity - 1)}
                          disabled={busy}
                          aria-label={`Remove one ${line.productTitle}`}
                          className="w-7 h-7 flex items-center justify-center border border-[#F5F1E8]/20 text-[#F5F1E8]/70 hover:border-[#D4AF65] disabled:opacity-40"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-[#F5F1E8] text-sm w-4 text-center">{line.quantity}</span>
                        <button
                          onClick={() => setQuantity(line.id, line.quantity + 1)}
                          disabled={busy}
                          aria-label={`Add one ${line.productTitle}`}
                          className="w-7 h-7 flex items-center justify-center border border-[#F5F1E8]/20 text-[#F5F1E8]/70 hover:border-[#D4AF65] disabled:opacity-40"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {enabled && (
              <div className="border-t border-[#F5F1E8]/10 px-6 py-6">
                {error && <p className="text-red-400 text-xs mb-3" role="alert">{error}</p>}
                {cart && lines.length > 0 && (
                  <>
                    <div className="flex justify-between text-[#F5F1E8] mb-1">
                      <span className="text-sm">Subtotal</span>
                      <span className="font-semibold">{formatMoney(cart.subtotal, cart.currency)}</span>
                    </div>
                    <p className="text-[#F5F1E8]/40 text-xs mb-5">Shipping and taxes calculated at checkout. Illinois addresses only.</p>
                    <a
                      href={cart.checkoutUrl}
                      className={`block text-center w-full py-4 bg-[#D4AF65] text-[#080808] text-xs font-bold tracking-[0.25em] uppercase hover:bg-[#E4C57E] transition-colors ${busy ? 'opacity-60 pointer-events-none' : ''}`}
                    >
                      Checkout
                    </a>
                  </>
                )}
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
