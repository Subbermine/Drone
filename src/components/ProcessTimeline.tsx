import React from 'react';
import { InView } from './motion-primitives/InView';

export const ProcessTimeline: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Airspace & Hazard Mapping',
      description: 'Pre-event survey of venue geography, pyrotechnic launch zones, sound towers, and background RF frequency floors.',
    },
    {
      step: '02',
      title: 'Vajra Scan-G Calibration',
      description: 'Perimeter deployment of passive 360° sensor mast listening across all standard COTS drone communication bands.',
    },
    {
      step: '03',
      title: 'Production Whitelisting',
      description: 'Pre-flight safety inspection of official media drones, assigning digital 3D corridors with zero stage interference.',
    },
    {
      step: '04',
      title: 'Live 360° Sky Watch',
      description: 'Continuous tactical airspace monitoring tracking up to 40 targets simultaneously within 4 km with rapid 10s threat identification.',
    },
    {
      step: '05',
      title: 'Surgical Jamming & Touchdown',
      description: 'Surgical software-defined RF interference severing pilot control, forcing safe vertical descent away from crowd zones.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#F8FAFC] text-[#0B192C] border-t border-slate-200 relative bg-cyber-grid-light">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-10 sm:mb-12 space-y-3">
          <InView>
            <div className="text-[11px] font-mono tracking-widest uppercase text-[#00A8E8] font-semibold">
              Operational Protocol
            </div>
          </InView>

          <InView transition={{ delay: 0.1, duration: 0.5 }}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight font-display leading-tight">
              The Tactical <span className="text-[#00A8E8] font-normal">Process</span>.
            </h2>
          </InView>

          <InView transition={{ delay: 0.2, duration: 0.5 }}>
            <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
              Standard operating procedures executed by ex-Indian Army officers from venue mapping through live show intercept.
            </p>
          </InView>
        </div>

        {/* Minimal 5-Step Horizontal Flow */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-5">
          {steps.map((s, idx) => (
            <InView key={s.step} transition={{ delay: idx * 0.1, duration: 0.5 }}>
              <div className="space-y-3 pt-3 border-t-2 border-[#00A8E8] bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="text-xl font-light font-mono text-[#00A8E8] font-bold">{s.step}</div>
                <h3 className="text-sm sm:text-base font-bold text-[#0B192C] font-display">{s.title}</h3>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  {s.description}
                </p>
              </div>
            </InView>
          ))}
        </div>

      </div>
    </section>
  );
};
