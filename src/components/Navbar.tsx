import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Overview', href: '#overview' },
    { label: 'Threat Intel', href: '#threats' },
    { label: 'Military Edge', href: '#military-edge' },
    { label: 'Services', href: '#services' },
    { label: 'Radar Demo', href: '#radar-demo' },
    { label: 'Hardware', href: '#hardware' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-[#07111E]/90 backdrop-blur-xl border-b border-[#00C2FF]/20 py-2.5 shadow-xl shadow-black/40'
          : 'bg-transparent py-4'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-[#0B1E34] border border-[#00C2FF]/30 flex items-center justify-center p-1.5 transition-all duration-200 group-hover:border-[#00C2FF] group-hover:shadow-[0_0_12px_rgba(0,194,255,0.4)]">
              <img
                src="/assets/buzzkill-icon-white.png"
                alt="BuzzKill Emblem"
                className="w-full h-full object-contain filter drop-shadow-[0_0_6px_rgba(0,194,255,0.6)]"
              />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display font-bold text-lg tracking-wider text-white">
                BUZZ<span className="text-[#00C2FF]">KILL</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase text-[#94A3B8] hidden sm:inline-block font-mono">
                Airspace Defense
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-medium text-[#94A3B8] hover:text-[#00C2FF] transition-colors duration-200 tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Button */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-[#07111E] bg-[#00C2FF] hover:bg-[#38BDF8] transition-all duration-200 shadow-md shadow-[#00C2FF]/30"
            >
              <span>Book Assessment</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-[#00C2FF] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-[#07111E]/98 backdrop-blur-2xl border-b border-[#00C2FF]/20 px-6 py-6 space-y-4 shadow-2xl"
          >
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-[#94A3B8] hover:text-white py-1 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-full text-xs font-semibold text-[#07111E] bg-[#00C2FF]"
              >
                Book Airspace Assessment
              </a>
              <div className="text-center text-[11px] font-mono text-[#94A3B8]">
                Hotline: +91 9818008953 • +91 9619015750
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
