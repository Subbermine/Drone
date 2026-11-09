import React from 'react';
import { Mic2, Crown, Copyright, Shield } from 'lucide-react';
import { InView } from './motion-primitives/InView';

export const KeyApplications: React.FC = () => {
  const applications = [
    {
      icon: Mic2,
      title: 'Performing Artist Safety',
      tag: 'Stage Sanctuary',
      description: 'Prevents unauthorized drones from approaching stages, blinding headliners, or risking collision injuries during live sets.',
    },
    {
      icon: Crown,
      title: 'VIP Guest Security',
      tag: 'Backstage & Lounges',
      description: 'Enforces an aerial privacy bubble over artist green rooms, VIP suites, and dignitary compounds against telephoto paparazzi.',
    },
    {
      icon: Copyright,
      title: 'IP Infringement Protection',
      tag: 'Broadcast Integrity',
      description: 'Eliminates aerial intellectual property theft, unauthorized 4K streaming, and leaks of unreleased festival performances.',
    },
    {
      icon: Shield,
      title: 'Stadiums & Mega-Festivals',
      tag: 'Venue-Wide Envelope',
      description: '360° spherical protection across multi-stage festival grounds, coordinating official broadcast drones and eliminating rogues.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#07111E] text-[#F8FAFC] border-t border-[#1E3A5F]/40 relative bg-cyber-grid">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-10 sm:mb-12 space-y-3">
          <InView>
            <div className="text-[11px] font-mono tracking-widest uppercase text-buzzkill-cyan font-semibold">
              Operational Focus
            </div>
          </InView>

          <InView transition={{ delay: 0.1, duration: 0.5 }}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display leading-tight">
              Key <span className="text-buzzkill-cyan font-normal">Applications</span>.
            </h2>
          </InView>

          <InView transition={{ delay: 0.2, duration: 0.5 }}>
            <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed">
              Proven protection architectures deployed across India's largest concert tours and live entertainment productions.
            </p>
          </InView>
        </div>

        {/* 4 Minimalist Application Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {applications.map((app, idx) => {
            const Icon = app.icon;
            return (
              <InView key={app.title} transition={{ delay: idx * 0.1, duration: 0.5 }}>
                <div className="p-5 sm:p-6 rounded-2xl bg-[#0B192C] border border-[#1E3A5F]/60 shadow-xl space-y-3 hover:border-buzzkill-cyan/80 transition-colors duration-300">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-[#07111E] border border-[#1E3A5F]/60 flex items-center justify-center text-buzzkill-cyan">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-mono text-buzzkill-cyan uppercase font-semibold">
                      {app.tag}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white font-display pt-1">
                    {app.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                    {app.description}
                  </p>
                </div>
              </InView>
            );
          })}
        </div>

      </div>
    </section>
  );
};
