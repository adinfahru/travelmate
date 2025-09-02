"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export function LandingNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm' 
        : 'bg-white/80 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-indigo-900 font-bold text-2xl">
            TravelMate
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-slate-700 hover:text-indigo-900 transition-colors">
              Fitur
            </a>
            <a href="#how-it-works" className="text-slate-700 hover:text-indigo-900 transition-colors">
              Cara Kerja
            </a>
            <a href="#benefits" className="text-slate-700 hover:text-indigo-900 transition-colors">
              Manfaat
            </a>
            <Link
              href="/api/auth/signin?provider=google&callbackUrl=/dashboard"
              className="bg-indigo-900 text-white px-4 py-2 rounded-md hover:bg-indigo-800 transition-colors"
            >
              Mulai Sekarang
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center px-3 py-2 border border-slate-200 rounded text-slate-700 hover:text-indigo-900 hover:border-indigo-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-slate-200">
            <div className="flex flex-col space-y-4 pt-4">
              <a 
                href="#features" 
                className="text-slate-700 hover:text-indigo-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Fitur
              </a>
              <a 
                href="#how-it-works" 
                className="text-slate-700 hover:text-indigo-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Cara Kerja
              </a>
              <a 
                href="#benefits" 
                className="text-slate-700 hover:text-indigo-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Manfaat
              </a>
              <Link
                href="/api/auth/signin?provider=google&callbackUrl=/dashboard"
                className="bg-indigo-900 text-white px-4 py-2 rounded-md hover:bg-indigo-800 transition-colors text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Mulai Sekarang
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
