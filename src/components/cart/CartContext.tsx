import React, { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { addLines, Cart, createCart, fetchCart, removeLine, shopifyEnabled, updateLine } from '../../lib/shopify';

const CART_KEY = 'royalT_cartId';

interface CartContextValue {
  enabled: boolean;
  cart: Cart | null;
  open: boolean;
  busy: boolean;
  error: string | null;
  setOpen: (open: boolean) => void;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  setQuantity: (lineId: string, quantity: number) => Promise<void>;
}

const CartContext = createContext<CartContextValue | null>(null);

const readCartId = () => {
  try { return localStorage.getItem(CART_KEY); } catch { return null; }
};
const writeCartId = (id: string | null) => {
  try { id ? localStorage.setItem(CART_KEY, id) : localStorage.removeItem(CART_KEY); } catch { /* storage unavailable */ }
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Restore the visitor's existing Shopify cart.
  useEffect(() => {
    const id = readCartId();
    if (!shopifyEnabled || !id) return;
    fetchCart(id)
      .then((restored) => (restored ? setCart(restored) : writeCartId(null)))
      .catch(() => writeCartId(null));
  }, []);

  const run = useCallback(async (action: () => Promise<Cart>) => {
    setBusy(true);
    setError(null);
    try {
      const next = await action();
      setCart(next);
      writeCartId(next.id);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
  }, []);

  const addItem = useCallback(
    async (variantId: string, quantity = 1) => {
      setOpen(true);
      await run(() => (cart ? addLines(cart.id, variantId, quantity) : createCart(variantId, quantity)));
    },
    [cart, run]
  );

  const setQuantity = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cart) return;
      await run(() => (quantity > 0 ? updateLine(cart.id, lineId, quantity) : removeLine(cart.id, lineId)));
    },
    [cart, run]
  );

  const value = useMemo(
    () => ({ enabled: shopifyEnabled, cart, open, busy, error, setOpen, addItem, setQuantity }),
    [cart, open, busy, error, addItem, setQuantity]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
