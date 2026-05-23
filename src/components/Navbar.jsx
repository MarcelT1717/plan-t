import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { barsData } from '../data/barsData';

const barList = Object.values(barsData);

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBarsOpen, setIsBarsOpen] = useState(false);
  const [isMobileBarsOpen, setIsMobileBarsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubscribeClick = () => {
    setIsMobileMenuOpen(false);
    if (location.pathname === '/') {
      document.getElementById('subscribe')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#subscribe');
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsBarsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setIsBarsOpen(false);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/90 backdrop-blur-xl border-b border-amber-500/20' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img
              src="/logo.png"
              alt="Plan T Logo"
              className="h-12 w-auto object-contain group-hover:scale-110 transition-transform duration-300"
            />
            <span className="text-2xl font-bold text-white tracking-wider">
              PLAN{' '}
              <span
                className="text-3xl font-black"
                style={{
                  fontFamily: "'Georgia', 'Times New Roman', serif",
                  letterSpacing: '0.05em',
                  background: 'linear-gradient(160deg, #E8C96A 0%, #C9A84C 45%, #A07828 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 8px rgba(201,168,76,0.5)) drop-shadow(0 1px 2px rgba(0,0,0,0.8))',
                }}
              >T</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`relative text-sm font-medium tracking-wide transition-colors duration-300 ${
                location.pathname === '/' ? 'text-amber-500' : 'text-gray-300 hover:text-white'
              }`}
            >
              Home
              {location.pathname === '/' && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-amber-600" />
              )}
            </Link>

            <Link
              to="/about"
              className={`relative text-sm font-medium tracking-wide transition-colors duration-300 ${
                location.pathname === '/about' ? 'text-amber-500' : 'text-gray-300 hover:text-white'
              }`}
            >
              About
              {location.pathname === '/about' && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-amber-600" />
              )}
            </Link>

            {/* The Bar dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setIsBarsOpen(!isBarsOpen)}
                className={`relative flex items-center gap-1.5 text-sm font-medium tracking-wide transition-colors duration-300 ${
                  isActive('/ingredients') || isActive('/bars')
                    ? 'text-amber-500'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                The Bar
                <span className="text-amber-400 font-bold text-[9px] tracking-[0.2em] border border-amber-500/30 px-1.5 py-0.5 uppercase">
                  New
                </span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isBarsOpen ? 'rotate-180' : ''}`} />
                {(isActive('/ingredients') || isActive('/bars')) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-amber-600" />
                )}
              </button>

              {/* Dropdown panel */}
              {isBarsOpen && (
                <div className="absolute top-full right-0 mt-3 w-64 bg-zinc-950 border border-amber-500/20 overflow-hidden shadow-2xl shadow-black/80 z-50">
                  <div className="h-[2px] bg-gradient-to-r from-amber-700 via-amber-400 to-amber-700" />

                  {/* Overview link */}
                  <Link
                    to="/ingredients"
                    className="flex items-center justify-between px-5 py-3 border-b border-gray-900 hover:bg-zinc-900 transition-colors group"
                  >
                    <span className="text-gray-400 group-hover:text-white text-xs font-bold tracking-[0.15em] uppercase transition-colors">
                      Overview
                    </span>
                    <span className="text-gray-700 text-[9px] tracking-widest uppercase">All Bars</span>
                  </Link>

                  {/* Individual bars */}
                  {barList.map((bar) => (
                    <Link
                      key={bar.id}
                      to={`/bars/${bar.id}`}
                      className="flex items-center justify-between px-5 py-3.5 hover:bg-zinc-900 transition-colors group border-b border-gray-900/50 last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${bar.color.strip} flex-shrink-0`} />
                        <div>
                          <p className={`${bar.color.text} font-black text-sm tracking-[0.12em]`}>{bar.variant}</p>
                        </div>
                      </div>
                      <span className={`text-[8px] font-bold tracking-widest uppercase ${
                        bar.status === 'Coming Soon' ? 'text-amber-400' : 'text-gray-700'
                      }`}>
                        {bar.status === 'Coming Soon' ? 'Soon' : 'Dev'}
                      </span>
                    </Link>
                  ))}

                  <div className="h-[2px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
                </div>
              )}
            </div>

            <button
              onClick={handleSubscribeClick}
              className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105"
            >
              Subscribe
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2 hover:text-amber-500 transition-colors duration-300"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-amber-500/20">
          <div className="px-4 py-6 space-y-1">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-2 py-3 text-base font-medium transition-colors duration-300 ${
                location.pathname === '/' ? 'text-amber-500' : 'text-gray-300'
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-2 py-3 text-base font-medium transition-colors duration-300 ${
                location.pathname === '/about' ? 'text-amber-500' : 'text-gray-300'
              }`}
            >
              About
            </Link>

            {/* Mobile The Bar accordion */}
            <div>
              <button
                onClick={() => setIsMobileBarsOpen(!isMobileBarsOpen)}
                className="flex items-center justify-between w-full px-2 py-3 text-base font-medium text-gray-300"
              >
                <span className="flex items-center gap-2">
                  The Bar
                  <span className="text-amber-400 font-bold text-[9px] tracking-[0.2em] border border-amber-500/30 px-1.5 py-0.5 uppercase">New</span>
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isMobileBarsOpen ? 'rotate-180' : ''}`} />
              </button>

              {isMobileBarsOpen && (
                <div className="ml-4 border-l border-gray-800 pl-4 space-y-1 pb-2">
                  <Link
                    to="/ingredients"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 text-sm text-gray-500 hover:text-gray-300 transition-colors font-bold tracking-[0.1em] uppercase"
                  >
                    Overview
                  </Link>
                  {barList.map((bar) => (
                    <Link
                      key={bar.id}
                      to={`/bars/${bar.id}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-2 py-2 text-sm font-bold tracking-[0.1em] ${bar.color.text} transition-colors`}
                    >
                      <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${bar.color.strip} flex-shrink-0`} />
                      {bar.variant}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-3">
              <button
                onClick={handleSubscribeClick}
                className="w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-lg"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
