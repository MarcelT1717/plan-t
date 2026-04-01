import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook } from 'lucide-react';
import { SiTiktok } from 'react-icons/si';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img src="/logo.png" alt="Plan T Logo" className="h-10 w-auto object-contain" />
              <span className="text-2xl font-bold text-white">
                PLAN <span className="text-amber-500">T</span>
              </span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Raising awareness about the testosterone crisis and empowering men with 
              science-backed knowledge to reclaim their vitality.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/plan_testosterone?igsh=MTk2eHg4dncwaGN3ag%3D%3D&utm_source=qr" 
                 target="_blank" rel="noopener noreferrer" 
                 className="text-gray-400 hover:text-amber-400 transition-colors duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/share/1JBJ8HHSb4/?mibextid=wwXIfr" 
                 target="_blank" rel="noopener noreferrer" 
                 className="text-gray-400 hover:text-amber-400 transition-colors duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.tiktok.com/@plan.testosterone?_r=1&_t=ZT-956q032WsIQ" 
                 target="_blank" rel="noopener noreferrer" 
                 className="text-gray-400 hover:text-amber-400 transition-colors duration-300">
                <SiTiktok className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">
                  About
                </Link>
              </li>
              <li>
                <Link to="/ingredients" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">
                  The Bar (Coming Soon)
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/Privacy Policy for Plan T.pdf" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/Terms of Service for Plan T.pdf" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              © {currentYear} Plan T. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm">
              Empowering men through knowledge and awareness.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};