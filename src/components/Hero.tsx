import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, Radio, Shield, Crosshair, Box } from 'lucide-react';
import { InView } from './motion-primitives/InView';
import { DroneCanvas } from './DroneCanvas';

export const Hero: React.FC = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffectRef = useRef<any>(null);

  useEffect(() => {
    let isCancelled = false;

    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load ${src}`));
        document.head.appendChild(script);
      });
    };

    const startVanta = () => {
      const VANTA = (window as any).VANTA;
      const THREE = (window as any).THREE;
      if (!isCancelled && !vantaEffectRef.current && VANTA && VANTA.NET && vantaRef.current) {
        try {
          vantaEffectRef.current = VANTA.NET({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            // Electric Cyan and Midnight Navy from the Blue PDF
            color: 0x00c2ff,
            backgroundColor: 0x07111e,
            points: 12.0,
            maxDistance: 22.0,
            spacing: 16.0,
            showDots: true,
            THREE: THREE,
          });
        } catch (err) {
          console.warn('Vanta initialization error:', err);
        }
      }
    };

    // Ensure three.js & vanta.net are loaded
    if ((window as any).VANTA && (window as any).VANTA.NET) {
      startVanta();
    } else {
      // First try local scripts, fallback to CDN provided by user
      Promise.resolve()
        .then(() => {
          if (!(window as any).THREE) {
            return loadScript('/libs/three.r134.min.js').catch(() =>
              loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js')
            );
          }
        })
        .then(() => {
          if (!(window as any).VANTA || !(window as any).VANTA.NET) {
            return loadScript('/libs/vanta.net.min.js').catch(() =>
              loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js')
            );
          }
        })
        .then(() => {
          startVanta();
        })
        .catch((e) => console.warn('Could not load Vanta scripts:', e));
    }

    return () => {
      isCancelled = true;
      if (vantaEffectRef.current) {
        try {
          vantaEffectRef.current.destroy();
        } catch (e) {}
        vantaEffectRef.current = null;
      }
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] pt-24 pb-14 lg:pt-28 lg:pb-16 flex flex-col justify-center overflow-hidden bg-[#07111E]"
    >
      {/* Interactive 3D Vanta.NET Airspace Mesh Background */}
      <div
        ref={vantaRef}
        id="vanta-airspace-net"
        className="absolute inset-0 w-full h-full z-0 pointer-events-auto"
      />

      {/* Atmospheric Contrast Overlays - Kept subtle so Cyan Vanta lines are clearly visible */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#07111E]/75 via-[#07111E]/30 to-transparent pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#07111E]/80 via-transparent to-black/20 pointer-events-none z-[1]" />
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-[#00C2FF]/10 rounded-full blur-[140px] pointer-events-none z-[1]" />

      {/* Hero Content Layer */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: BuzzKill Identity, Headlines, & CTAs */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left">
            
            {/* Tagline Pill */}
            <InView>
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0B1E34]/90 border border-[#00C2FF]/40 text-[11px] font-mono text-[#E2E8F0] tracking-wider uppercase backdrop-blur-md shadow-lg shadow-[#00C2FF]/10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C2FF] animate-ping" />
                <span>Military-Grade Airspace Defense</span>
                <span className="text-white/20">•</span>
                <span className="text-[#00C2FF] font-semibold">Ex-Army Commanded</span>
              </div>
            </InView>

            {/* Main Headline */}
            <div className="space-y-3">
              <InView transition={{ delay: 0.1, duration: 0.6 }}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#0B1E34] border border-[#00C2FF]/50 flex items-center justify-center p-1.5 shadow-[0_0_15px_rgba(0,194,255,0.3)]">
                    <img
                      src="/assets/buzzkill-icon-white.png"
                      alt="BuzzKill Emblem"
                      className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(0,194,255,0.7)]"
                    />
                  </div>
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase font-display leading-[0.95]">
                    BUZZ<span className="text-[#00C2FF] drop-shadow-[0_0_25px_rgba(0,194,255,0.5)]">KILL</span>
                  </h1>
                </div>
              </InView>

              <InView transition={{ delay: 0.2, duration: 0.6 }}>
                <p className="text-lg sm:text-xl font-light text-[#E2E8F0] tracking-normal leading-snug">
                  Live Events Airspace Management & Security Solutions
                </p>
              </InView>
            </div>

            {/* Subtext */}
            <InView transition={{ delay: 0.3, duration: 0.6 }}>
              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed font-light max-w-xl">
                Protecting high-profile concerts, festivals, stadiums, and VIP gatherings from rogue drones with 4km multi-frequency RF detection and surgical software-defined jamming.
              </p>
            </InView>

            {/* Action Buttons */}
            <InView transition={{ delay: 0.4, duration: 0.6 }}>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide text-[#07111E] bg-[#00C2FF] hover:bg-[#38BDF8] transition-all duration-200 shadow-lg shadow-[#00C2FF]/30 border border-[#00C2FF]"
                >
                  <span>Deploy Airspace Shield</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <a
                  href="#radar-demo"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium text-white bg-[#0B1E34]/80 hover:bg-[#132C4A] border border-[#00C2FF]/30 backdrop-blur-md transition-all duration-200"
                >
                  <Radio className="w-3.5 h-3.5 text-[#00C2FF]" />
                  <span>Interactive Radar Demo</span>
                </a>
              </div>
            </InView>

          </div>

          {/* Right Column: Live 3D Drone Model Canvas (Compact & Visible) */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              id="drone-3d-container"
              className="relative w-full max-w-[440px] h-[340px] sm:h-[390px] rounded-3xl bg-[#0B1E34]/40 border border-[#00C2FF]/30 backdrop-blur-xl p-4 sm:p-5 flex flex-col justify-between overflow-hidden shadow-[0_0_40px_rgba(0,194,255,0.15)] group hover:border-[#00C2FF]/60 transition-all duration-500"
            >
              {/* Header Readout */}
              <div className="flex items-center justify-between text-xs font-mono relative z-20">
                <div className="flex items-center gap-2 text-[#00C2FF]">
                  <span className="w-2 h-2 rounded-full bg-[#00C2FF] animate-ping" />
                  <span className="font-semibold tracking-wider">3D AIRSPACE ASSET</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#00C2FF]/10 text-[#00C2FF] border border-[#00C2FF]/30 text-[10px] font-semibold">
                  LIVE MODEL
                </span>
              </div>

              {/* 3D Drone Canvas Rendered with Exact Normalization & Cyber Lighting */}
              <div className="relative flex-1 w-full h-full my-1 flex items-center justify-center">
                <DroneCanvas className="w-full h-full" />
              </div>

              {/* Footer Telemetry Coordinates */}
              <div className="flex items-center justify-between text-[11px] font-mono text-[#94A3B8] pt-2 border-t border-white/10 relative z-20">
                <span>FREQ: 2.4 / 5.8 GHz</span>
                <span className="text-[#00C2FF]">360° SENSOR ACTIVE</span>
                <span>IP65 MIL-STD</span>
              </div>
            </div>
          </div>

        </div>

        {/* Minimalist 4-Metric Ribbon Overlaid with Frosted Glass */}
        <div className="mt-8 sm:mt-10 pt-6 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 bg-[#07111E]/70 backdrop-blur-md p-5 rounded-2xl border border-[#00C2FF]/20 shadow-xl">
          <div className="space-y-0.5">
            <div className="text-2xl sm:text-3xl font-light font-display text-white tracking-tight">4,000m</div>
            <div className="text-[10px] font-mono text-[#94A3B8] uppercase tracking-widest">Perimeter Radius</div>
          </div>
          <div className="space-y-0.5">
            <div className="text-2xl sm:text-3xl font-light font-display text-[#00C2FF] tracking-tight">&lt; 10s</div>
            <div className="text-[10px] font-mono text-[#94A3B8] uppercase tracking-widest">Target Acquisition</div>
          </div>
          <div className="space-y-0.5">
            <div className="text-2xl sm:text-3xl font-light font-display text-white tracking-tight">40 Drones</div>
            <div className="text-[10px] font-mono text-[#94A3B8] uppercase tracking-widest">Simultaneous Tracking</div>
          </div>
          <div className="space-y-0.5">
            <div className="text-2xl sm:text-3xl font-light font-display text-[#38BDF8] tracking-tight">100%</div>
            <div className="text-[10px] font-mono text-[#94A3B8] uppercase tracking-widest">Airspace Control</div>
          </div>
        </div>

      </div>
    </section>
  );
};
