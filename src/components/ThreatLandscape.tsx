import React from 'react';
import { Radio } from 'lucide-react';
import { InView } from './motion-primitives/InView';

export const ThreatLandscape: React.FC = () => {
  const threats = [
    {
      title: 'Unregulated & DIY Kits',
      description: 'Consumer drones and kit builds operate without authentic Remote ID, creating dangerous blindspots for ground security.',
    },
    {
      title: 'IP Theft & Piracy',
      description: 'Unauthorized telephoto 4K surveillance and bootleg livestreams violate exclusive broadcast agreements and artist rights.',
    },
    {
      title: 'Crowd & Stage Hazards',
      description: 'High-speed carbon rotor blades, battery thermal runaway, or falling debris pose direct bodily hazards over dense festival crowds.',
    },
  ];

  return (
    <section id="threats" className="py-16 sm:py-20 bg-[#F8FAFC] text-[#0B192C] border-t border-slate-200 relative bg-light-grid">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-10 sm:mb-12 space-y-3">
          <InView>
            <div className="text-[11px] font-mono tracking-widest uppercase text-[#00A8E8] font-semibold">
              Threat Intelligence
            </div>
          </InView>

          <InView transition={{ delay: 0.1, duration: 0.5 }}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight font-display leading-tight">
              The Sky Above Live Crowds Is <span className="text-[#00A8E8] font-normal">Unregulated</span>.
            </h2>
          </InView>

          <InView transition={{ delay: 0.2, duration: 0.5 }}>
            <p className="text-sm sm:text-base text-[#475569] font-light leading-relaxed">
              Cheap, easily accessible consumer drones have created an urgent security blindspot across concerts, festivals, and stadiums.
            </p>
          </InView>
        </div>

        {/* 2 Primary Intel Blocks (Slide 8) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          
          {/* Block 1: 6 LAC+ Rogue Drones */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-[#64748B]">
              <span>SECURITY AGENCY DATA</span>
              <span className="text-red-600 font-semibold">CRITICAL RISK</span>
            </div>

            <div>
              <div className="text-4xl sm:text-5xl font-light font-display text-[#0B192C] tracking-tight">
                6 LAC<span className="text-[#00A8E8] font-bold">+</span>
              </div>
              <div className="text-xs font-mono uppercase tracking-wider text-[#00A8E8] font-semibold mt-1.5">
                Unregulated Drones Present in India
              </div>
            </div>

            <p className="text-sm text-[#475569] font-light leading-relaxed">
              According to data estimation studies cited by security agencies in <em>The Economic Times</em>, over 6 lakh unregistered drones of varied sizes and payload capacities are present across the country.
            </p>

            <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
              <img
                src="/assets/economic-times-news.png"
                alt="The Economic Times Report"
                className="h-8 w-auto rounded border border-slate-200 shadow-xs"
              />
              <span className="text-[11px] font-mono text-[#64748B]">
                The Economic Times National Report
              </span>
            </div>
          </div>

          {/* Block 2: 10-27% Projected Growth */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-[#64748B]">
              <span>MARKET PROJECTION</span>
              <span className="text-[#1D4ED8] font-semibold">2030 – 2034</span>
            </div>

            <div>
              <div className="text-4xl sm:text-5xl font-light font-display text-[#0B192C] tracking-tight">
                10–27<span className="text-[#1D4ED8] font-bold">%</span>
              </div>
              <div className="text-xs font-mono uppercase tracking-wider text-[#1D4ED8] font-semibold mt-1.5">
                Annual Industry Growth (CAGR)
              </div>
            </div>

            <p className="text-sm text-[#475569] font-light leading-relaxed">
              Advancements in AI autonomous swarms, extended battery endurance, and DIY open avionics mean drone saturation at public gatherings will multiply exponentially every season.
            </p>

            <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-mono text-[#475569]">
              <Radio className="w-3.5 h-3.5 text-[#00A8E8]" />
              <span>Traditional physical security cannot detect or counter aerial incursions.</span>
            </div>
          </div>

        </div>

        {/* 3 Minimal Threat Vectors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {threats.map((item, idx) => (
            <InView key={item.title} transition={{ delay: idx * 0.1, duration: 0.5 }}>
              <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2.5 shadow-xs hover:border-[#00A8E8]/40 transition-colors">
                <span className="text-xs font-mono text-[#00A8E8] font-semibold">0{idx + 1}</span>
                <h3 className="text-base font-semibold text-[#0B192C] font-display">{item.title}</h3>
                <p className="text-xs sm:text-sm text-[#475569] font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            </InView>
          ))}
        </div>

      </div>
    </section>
  );
};
