import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, Map, ShieldCheck, Check } from 'lucide-react';
import { InView } from './motion-primitives/InView';

export const CoreServices: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'detection' | 'airspace' | 'vip'>('detection');

  return (
    <section id="services" className="py-16 sm:py-20 bg-[#F8FAFC] text-[#0B192C] border-t border-slate-200 relative bg-light-grid">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-10 sm:mb-12 space-y-3">
          <InView>
            <div className="text-[11px] font-mono tracking-widest uppercase text-[#00A8E8] font-semibold">
              Core Capabilities
            </div>
          </InView>

          <InView transition={{ delay: 0.1, duration: 0.5 }}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight font-display leading-tight">
              Turnkey Airspace <span className="text-[#00A8E8] font-normal">Solutions</span>.
            </h2>
          </InView>

          <InView transition={{ delay: 0.2, duration: 0.5 }}>
            <p className="text-sm sm:text-base text-[#475569] font-light leading-relaxed">
              Designed specifically for festivals, stadium tours, sporting championships, and high-security public gatherings.
            </p>
          </InView>

          {/* Minimalist Tab Selector */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {[
              { id: 'detection', label: 'Detection & Jamming', icon: Radio },
              { id: 'airspace', label: 'Airspace Management', icon: Map },
              { id: 'vip', label: 'VIP & IP Sanctuary', icon: ShieldCheck },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-[#0B192C] text-white shadow-md'
                      : 'bg-white text-[#475569] hover:text-[#0B192C] border border-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-[#00A8E8]" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Display */}
        <AnimatePresence mode="wait">
          {activeTab === 'detection' && (
            <motion.div
              key="detection"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-7 space-y-5">
                <div className="space-y-3">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0B192C] font-display">
                    Passive Radar & Software-Defined Jamming
                  </h3>
                  <p className="text-sm sm:text-base text-[#475569] font-light leading-relaxed">
                    Continuous spherical perimeter watch that detects hostile or rogue drones in under 10 seconds, severing command and GPS links without interfering with live stage audio.
                  </p>
                </div>

                <div className="space-y-2.5 pt-1">
                  {[
                    '4 km Perimeter Detection: Scans 433 MHz, 840 MHz, 915 MHz, 2.4 GHz, and 5.8 GHz bands silently.',
                    'Simultaneous Tracking: Locks onto up to 40 aerial targets with brand, model, and pilot GPS telemetry.',
                    'Surgical RF Disruption: Neutralizes rogue signals to force an immediate vertical landing or Return-to-Home.',
                    'Zero Stage Audio Disruption: Precision frequencies prevent interference with stage wireless mics and IEMs.',
                  ].map((text, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#475569] font-light">
                      <Check className="w-4 h-4 text-[#00A8E8] shrink-0 mt-0.5" />
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 flex justify-center">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm max-w-sm w-full flex flex-col items-center">
                  <img
                    src="/assets/equipment-stack-blue.png"
                    alt="Vajra Scan-G & Vajra Shot Stack"
                    className="max-h-[320px] sm:max-h-[340px] w-auto object-contain rounded-xl"
                  />
                  <div className="mt-2.5 text-center text-[11px] font-mono text-[#64748B]">
                    Vajra Scan-G Detector & Vajra Shot Tactical Jammer
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'airspace' && (
            <motion.div
              key="airspace"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-7 space-y-5">
                <div className="space-y-3">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0B192C] font-display">
                    Tailored Production Airspace Management
                  </h3>
                  <p className="text-sm sm:text-base text-[#475569] font-light leading-relaxed">
                    Ensuring authorized broadcast octocopters and official camera drones operate with complete safety around stadium trussing, pyrotechnics, and crowds.
                  </p>
                </div>

                <div className="space-y-2.5 pt-1">
                  {[
                    'Custom 3D Flight Corridors: Pre-approved paths preventing drones from straying into restricted zones.',
                    'Hazard & Pyrotechnic Mapping: Locks lighting towers, sound rigs, and fireworks zones out of flight paths.',
                    'Pilot & Equipment Vetting: Pre-flight safety inspections, hardware registration, and DGCA compliance.',
                    'Live Telemetry Coordination: Constant air-traffic coordination between flight operators and stage directors.',
                  ].map((text, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#475569] font-light">
                      <Check className="w-4 h-4 text-[#1D4ED8] shrink-0 mt-0.5" />
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 flex justify-center">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm max-w-sm w-full flex flex-col items-center">
                  <img
                    src="/assets/dashboard-blue-full.png"
                    alt="C2 Flight Operations Console"
                    className="max-h-[280px] sm:max-h-[300px] w-auto object-contain rounded-xl"
                  />
                  <div className="mt-2.5 text-center text-[11px] font-mono text-[#64748B]">
                    Central C2 Console: Telemetry & Airspace Mapping
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'vip' && (
            <motion.div
              key="vip"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-5"
            >
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 hover:border-[#00A8E8]/40 transition-colors">
                <span className="text-xs font-mono text-[#00A8E8] font-semibold">01 • ENCLOSURE</span>
                <h4 className="text-lg font-bold text-[#0B192C] font-display">VIP Guest Security</h4>
                <p className="text-xs sm:text-sm text-[#475569] font-light leading-relaxed">
                  Geofenced airspace around artist green rooms, celebrity lounges, and dignitary suites to shield against unauthorized surveillance and privacy invasion.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 hover:border-[#00A8E8]/40 transition-colors">
                <span className="text-xs font-mono text-[#00A8E8] font-semibold">02 • SANCTUARY</span>
                <h4 className="text-lg font-bold text-[#0B192C] font-display">Performing Artist Protection</h4>
                <p className="text-xs sm:text-sm text-[#475569] font-light leading-relaxed">
                  Prevents hostile or amateur drones from approaching the stage, blinding performers, or risking collision injuries during live performances.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 hover:border-[#00A8E8]/40 transition-colors">
                <span className="text-xs font-mono text-[#00A8E8] font-semibold">03 • RIGHTS</span>
                <h4 className="text-lg font-bold text-[#0B192C] font-display">IP Infringement Protection</h4>
                <p className="text-xs sm:text-sm text-[#475569] font-light leading-relaxed">
                  Eliminating intellectual property theft: stops unauthorized 4K aerial recording, bootleg live-streaming, and leaked audio at major festival shows.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
