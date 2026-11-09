import React from 'react';
import { ArrowUp } from 'lucide-react';
import { CONTACT_PERSONNEL } from '../data/buzzkillData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#040912] text-slate-400 py-12 sm:py-14 border-t border-[#1E3A5F]/40 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#1E3A5F]/40">
          
          {/* Brand */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-[#0B192C] border border-buzzkill-cyan/40 flex items-center justify-center p-1">
                <img
                  src="/assets/buzzkill-icon-cyan.png"
                  alt="BuzzKill Emblem"
                  className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(0,194,255,0.6)]"
                />
              </div>
              <span className="font-display font-bold text-lg tracking-wider text-white">
                BUZZ<span className="text-buzzkill-cyan">KILL</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 font-light max-w-sm leading-relaxed">
              Live events airspace management and counter-drone security solutions. Commanded exclusively by ex-Indian Army officers for stadium concerts and major festivals.
            </p>

            <div className="text-[11px] font-mono text-buzzkill-cyan font-semibold">
              DGCA & WPC Compliant Protocols
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono text-white uppercase tracking-wider font-semibold">Navigation</div>
            <ul className="space-y-2 text-xs font-light">
              <li><a href="#about" className="hover:text-buzzkill-cyan transition-colors">About Us</a></li>
              <li><a href="#threats" className="hover:text-buzzkill-cyan transition-colors">Threat Intel</a></li>
              <li><a href="#services" className="hover:text-buzzkill-cyan transition-colors">Airspace Services</a></li>
              <li><a href="#radar-demo" className="hover:text-buzzkill-cyan transition-colors">Radar Simulator</a></li>
              <li><a href="#hardware" className="hover:text-buzzkill-cyan transition-colors">Vajra Systems Specs</a></li>
              <li><a href="#military-edge" className="hover:text-buzzkill-cyan transition-colors">Ex-Army Leadership</a></li>
            </ul>
          </div>

          {/* Hotline */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-mono text-white uppercase tracking-wider font-semibold">Direct Tactical Dispatch</div>
            <div className="space-y-2 text-xs font-mono">
              {CONTACT_PERSONNEL.map((p) => (
                <div key={p.name} className="flex items-center justify-between py-1 border-b border-[#1E3A5F]/30">
                  <span className="text-white font-semibold">{p.name} ({p.role.split(' ')[0]}):</span>
                  <a href={`tel:${p.cleanPhone}`} className="text-buzzkill-cyan hover:text-white font-semibold">
                    {p.phone}
                  </a>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 pt-1 font-light">
              24/7 emergency stadium consultation across India.
            </p>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © {new Date().getFullYear()} BUZZKILL. All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
