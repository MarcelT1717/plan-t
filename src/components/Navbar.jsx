import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useCart } from './cart/CartContext';

const links = [
  { to: '/', label: 'Home' },
  { to: '/our-mission', label: 'Our Mission' },
  { to: '/contact', label: 'Contact Us' },
];

export const Wordmark = ({ className = '' }) => (
  <span className={`font-display font-bold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-b from-[#F1D79A] via-[#D4AF65] to-[#A9822F] ${className}`}>
    ROYAL T
  </span>
);

function BagButton() {
  const { cart, setOpen } = useCart();
  const count = cart?.totalQuantity ?? 0;
  return (
    <button
      onClick={() => setOpen(true)}
      aria-label={count ? `Shopping bag, ${count} items` : 'Shopping bag'}
      className="relative p-2 text-[#F5F1E8] hover:text-[#D4AF65] transition-colors duration-300"
    >
      <ShoppingBag className="w-6 h-6" strokeWidth={2} />
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#D4AF65] text-[#080808] text-[10px] font-bold flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  );
}

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setIsMobileMenuOpen(false), [location.pathname, location.hash]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-[background,border-color] duration-500 border-b ${
        isScrolled
          ? 'bg-gradient-to-r from-[#211D18]/95 via-[#2A251F]/95 to-[#211D18]/95 backdrop-blur-xl border-[#D4AF65]/15'
          : 'bg-gradient-to-b from-[#1A1714]/80 to-transparent border-transparent'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center h-[72px]">

          {/* Left: links (desktop) / menu button (mobile) */}
          <div className="flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden -ml-2 p-2 text-[#F5F1E8] hover:text-[#D4AF65] transition-colors"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <ul className="hidden md:flex items-center gap-8 lg:gap-10">
              {links.map(({ to, label }) => {
                const active = location.pathname === to;
                return (
                  <li key={to}>
                    <Link
                      to={to}
                      aria-current={active ? 'page' : undefined}
                      className={`relative text-[15px] font-semibold uppercase tracking-[0.03em] transition-colors duration-300 ${
                        active ? 'text-[#D4AF65]' : 'text-[#F5F1E8] hover:text-[#D4AF65]'
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Centre: wordmark */}
          <Link to="/" aria-label="Royal T home" className="justify-self-center">
            <Wordmark className="text-2xl sm:text-[2rem] leading-none" />
          </Link>

          {/* Right: Shopify bag */}
          <div className="justify-self-end">
            <BagButton />
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#1A1714]/95 backdrop-blur-xl border-t border-[#D4AF65]/15">
          <ul className="px-4 py-6 space-y-1">
            {links.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={`block px-2 py-3 text-base font-semibold uppercase ${location.pathname === to ? 'text-[#D4AF65]' : 'text-[#F5F1E8]'}`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};
