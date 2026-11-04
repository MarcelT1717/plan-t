// Mutable values the scroll timeline writes and the 3D scene reads every frame.
// Kept outside React state so scrubbing never triggers re-renders.
export const productMotion = {
  /** 0 = hero pose (centre-right), 1 = centred */
  center: 0,
  /** 0 = in place, 1 = moved aside for the next section */
  aside: 0,
  /** Camera push (negative pulls back) */
  zoom: 0,
  /** 0 = wrapped, 1 = raw bar out of the wrapper */
  unwrap: 0,
  /** Flavour-change transition */
  switchRot: 0,
  switchScale: 1,
};

export type ProductMotion = typeof productMotion;

export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
