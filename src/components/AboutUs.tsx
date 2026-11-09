import React from 'react';
import { Award, Compass, ShieldCheck, HeartHandshake } from 'lucide-react';
import { InView } from './motion-primitives/InView';

export const AboutUs: React.FC = () => {
  const armyPillars = [
    {
      title: 'Expert-Led Operations',
      description: 'Manned exclusively by ex-Indian Army officers with deep backgrounds in tactical security operations.',
      icon: Award
    },
    {
      title: 'Military-Grade Discipline',
      description: 'Battle-tested precision, split-second situational awareness, and strict SOPs applied to every deployment.',
      icon: Compass
    },
    {
      title: 'Defense Credibility',
      description: 'Backed by veteran security professionals, offering reliability that matches national defense benchmarks.',
      icon: ShieldCheck
    },
    {
      title: 'Composure Under Pressure',
      description: 'Trained to perform in high-density environments, guaranteeing coordinated responses without crowd panic.',
      icon: HeartHandshake
    }
  ];

  return (
    <section id="about" className="py-16 sm:py-20 bg-[#07111E] text-white border-t border-[#00C2FF]/20 relative bg-cyan-grid">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Mission Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center mb-14 sm:mb-16">
          
          <div className="lg:col-span-6 space-y-5">
            <InView>
              <div className="text-[11px] font-mono tracking-widest uppercase text-[#00C2FF] font-semibold">
                About BuzzKill
              </div>
            </InView>

            <InView transition={{ delay: 0.1, duration: 0.5 }}>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display leading-tight">
                Defending Airspace for <span className="text-[#00C2FF] font-normal">High-Stakes Live Events</span>.
              </h2>
            </InView>

            <InView transition={{ delay: 0.2, duration: 0.5 }}>
              <div className="space-y-3 text-sm sm:text-base text-[#94A3B8] font-light leading-relaxed">
                <p>
                  BuzzKill addresses the urgent vulnerability of ungoverned skies above mass live entertainment gatherings.
                </p>
                <p>
                  With multi-band RF scanning, passive radar systems, and precision software-defined jamming, we neutralize rogue drones before they reach sensitive perimeters—while our airspace management service ensures safe, approved flight corridors for official broadcast fleets.
                </p>
              </div>
            </InView>

            {/* Clean 2-Stat Row */}
            <InView transition={{ delay: 0.3, duration: 0.5 }}>
              <div className="grid grid-cols-2 gap-6 pt-3 border-t border-white/10">
                <div>
                  <div className="text-3xl sm:text-4xl font-light font-display text-white">360°</div>
                  <div className="text-xs font-mono text-[#00C2FF] uppercase font-semibold mt-1">Venue Dome Protection</div>
                  <div className="text-xs text-[#94A3B8] font-light mt-0.5">4 km spherical perimeter envelope</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-light font-display text-[#38BDF8]">100%</div>
                  <div className="text-xs font-mono text-[#38BDF8] uppercase font-semibold mt-1">Airspace Control</div>
                  <div className="text-xs text-[#94A3B8] font-light mt-0.5">Whitelisted broadcast drones & pilots</div>
                </div>
              </div>
            </InView>
          </div>

          {/* Right Image with Blue Stage Lighting */}
          <div className="lg:col-span-6">
            <InView transition={{ delay: 0.2, duration: 0.5 }}>
              <div className="relative rounded-2xl overflow-hidden border border-[#00C2FF]/30 shadow-2xl max-h-[340px] sm:max-h-[380px]">
                <img
                  src="/assets/concert-blue-protection.png"
                  alt="360 Venue Protection"
                  className="w-full h-full max-h-[340px] sm:max-h-[380px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07111E] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 text-xs font-mono text-white">
                  <span className="text-[#00C2FF]">● LIVE SHIELD</span> • Continuous 4km perimeter watch active
                </div>
              </div>
            </InView>
          </div>

        </div>

        {/* Ex-Armed Forces Leadership */}
        <div id="military-edge" className="pt-12 sm:pt-14 border-t border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden border border-[#00C2FF]/20 shadow-2xl max-h-[320px] sm:max-h-[360px]">
                <img
                  src="/assets/ex-armed-forces-blue.png"
                  alt="Operations Led By Ex-Armed Forces Personnel"
                  className="w-full h-full max-h-[320px] sm:max-h-[360px] object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 p-2.5 rounded-lg bg-[#07111E]/90 backdrop-blur-md border border-[#00C2FF]/30 text-[11px] font-mono text-white">
                  COMMAND: EX-INDIAN ARMY OFFICERS
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <div className="space-y-3">
                <div className="text-[11px] font-mono tracking-widest uppercase text-[#00C2FF] font-semibold">
                  Tactical Leadership
                </div>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
                  Operations Led By <span className="text-[#00C2FF] font-normal">Ex-Armed Forces</span> Personnel.
                </h3>
                <p className="text-sm sm:text-base text-[#94A3B8] font-light leading-relaxed">
                  Technology is only as effective as the discipline operating it. All BuzzKill deployments are directed by veteran Indian Army officers bringing unmatched security poise and tactical coordination.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                {armyPillars.map((p) => {
                  const Icon = p.icon;
                  return (
                    <div key={p.title} className="p-5 rounded-xl bg-[#0B1E34] border border-[#00C2FF]/20 space-y-2 hover:border-[#00C2FF]/50 transition-colors">
                      <div className="flex items-center gap-2.5 text-[#00C2FF]">
                        <Icon className="w-4 h-4" />
                        <h4 className="text-sm font-semibold text-white font-display">{p.title}</h4>
                      </div>
                      <p className="text-xs text-[#94A3B8] font-light leading-relaxed">
                        {p.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
