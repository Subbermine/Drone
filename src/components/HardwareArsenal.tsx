import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HARDWARE_DATA } from '../data/buzzkillData';
import { InView } from './motion-primitives/InView';

export const HardwareArsenal: React.FC = () => {
  const [selectedDevice, setSelectedDevice] = useState<string>('vajra-scan-g');

  const currentItem = HARDWARE_DATA.find((h) => h.id === selectedDevice) || HARDWARE_DATA[0];

  return (
    <section id="hardware" className="py-16 sm:py-20 bg-[#F8FAFC] text-[#0B192C] border-t border-slate-200 relative bg-cyber-grid-light">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Section Header */}
        <div className="max-w-2xl mb-10 sm:mb-12 space-y-3">
          <InView>
            <div className="text-[11px] font-mono tracking-widest uppercase text-[#00A8E8] font-semibold">
              Defense Hardware
            </div>
          </InView>

          <InView transition={{ delay: 0.1, duration: 0.5 }}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight font-display leading-tight">
              Tactical Hardware & <span className="text-[#00A8E8] font-normal">Specifications</span>.
            </h2>
          </InView>

          <InView transition={{ delay: 0.2, duration: 0.5 }}>
            <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
              Certified for field resilience, zero RF audio interference, and rapid deployment at stadium venues.
            </p>
          </InView>

          {/* Minimal Tab Switcher */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {[
              { id: 'vajra-scan-g', label: 'Vajra Scan-G Detector' },
              { id: 'vajra-shot', label: 'Vajra Shot Jammer Gun' },
              { id: 'stack-c2', label: 'Integrated C2 Command Suite' },
            ].map((tab) => {
              const isActive = selectedDevice === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedDevice(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${isActive
                    ? 'bg-[#0B192C] text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:text-[#0B192C] border border-slate-200'
                    }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Spec Layout */}
        <AnimatePresence mode="wait">
          {selectedDevice !== 'stack-c2' ? (
            <motion.div
              key={currentItem.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >

              {/* Product Visual & Narrative */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center">
                  <img
                    src={currentItem.image}
                    alt={currentItem.name}
                    className="max-h-60 sm:max-h-72 w-auto object-contain filter drop-shadow-[0_15px_30px_rgba(0,194,255,0.12)]"
                  />
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-mono uppercase text-[#00A8E8] font-semibold">{currentItem.badge}</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0B192C] font-display">{currentItem.name}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                    {currentItem.description}
                  </p>
                </div>
              </div>

              {/* Minimalist Spec Table */}
              <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="divide-y divide-slate-100">
                  {currentItem.specs.map((spec, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-1 sm:grid-cols-12 py-3 text-xs font-mono"
                    >
                      <div className="sm:col-span-5 text-slate-500 font-medium">
                        {spec.label}
                      </div>
                      <div className="sm:col-span-7 text-[#0B192C] font-semibold mt-0.5 sm:mt-0">
                        {spec.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          ) : (
            <motion.div
              key="stack-c2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-6 space-y-5">
                <div className="space-y-2.5">
                  <div className="text-xs font-mono uppercase text-[#00A8E8] font-semibold">Command & Control</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0B192C] font-display">
                    Integrated C2 Command Suite
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                    Complete turnkey mobile deployment infrastructure: ruggedized Windows OS tablets (MIL-STD-810G), carbon-fiber tripod mast sensors, and automated event intrusion logging software.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-1">
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                    <div className="text-xs sm:text-sm font-semibold text-[#0B192C] font-display">Deployment Time</div>
                    <div className="text-[11px] text-slate-500 font-light mt-0.5">Under 30 minutes from arrival</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                    <div className="text-xs sm:text-sm font-semibold text-[#0B192C] font-display">Shock & Weather</div>
                    <div className="text-[11px] text-slate-500 font-light mt-0.5">IP65 rain & dust protection</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                    <div className="text-xs sm:text-sm font-semibold text-[#0B192C] font-display">Display</div>
                    <div className="text-[11px] text-slate-500 font-light mt-0.5">10-inch sunlight-readable tablet</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                    <div className="text-xs sm:text-sm font-semibold text-[#0B192C] font-display">Battery Life</div>
                    <div className="text-[11px] text-slate-500 font-light mt-0.5">Hot-swappable lithium power</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 flex justify-center">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm max-w-md w-full flex justify-center">
                  <img
                    src="/assets/dashboard-blue-full.png"
                    alt="C2 Command Suite"
                    className="max-h-60 sm:max-h-72 w-auto object-contain rounded-xl"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
