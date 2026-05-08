import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/ingredients', label: 'The Bar', badge: 'New' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/80 backdrop-blur-xl border-b border-amber-500/20' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img
              src="/logo.png"
              alt="Project T Logo"
              className="h-12 w-auto object-contain group-hover:scale-110 transition-transform duration-300"
            />
            <span className="text-2xl font-bold text-white tracking-wider">
              PLAN <span className="text-amber-500">T</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative flex items-center gap-2 text-sm font-medium tracking-wide transition-colors duration-300 ${
                  isActive(link.path)
                    ? 'text-amber-500'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.label}
                {link.badge && (
                  <span className="text-amber-400 font-bold text-[9px] tracking-[0.2em] leading-none border border-amber-500/30 px-1.5 py-0.5 uppercase">
                    {link.badge}
                  </span>
                )}
                {isActive(link.path) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-amber-600"></span>
                )}
              </Link>
            ))}
            <button onClick={handleSubscribeClick} className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105">
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
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-2 text-base font-medium transition-colors duration-300 ${
                  isActive(link.path)
                    ? 'text-amber-500'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.label}
                {link.badge && (
                  <span className="text-amber-400 font-bold text-[9px] tracking-[0.2em] border border-amber-500/30 px-1.5 py-0.5 uppercase">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
            <button onClick={handleSubscribeClick} className="w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300">
              Subscribe
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
