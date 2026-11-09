import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, RefreshCw, Plus, CheckCircle, Activity } from 'lucide-react';
import { InView } from './motion-primitives/InView';
import { playRadarPing, playJammerActivation, playNeutralizeChime } from '../utils/soundEffects';

interface DroneTarget {
  id: string;
  name: string;
  type: 'rogue' | 'critical' | 'authorized';
  distanceKm: number;
  azimuthDeg: number;
  altitudeM: number;
  frequency: string;
  model: string;
  serial: string;
  pilotLoc: string;
  status: 'active' | 'jamming' | 'neutralized';
}

const INITIAL_DRONES: DroneTarget[] = [
  {
    id: 'TRG-01',
    name: 'DJI Mavic 3 Pro',
    type: 'critical',
    distanceKm: 1.4,
    azimuthDeg: 55,
    altitudeM: 110,
    frequency: '2.4 GHz & 5.8 GHz',
    model: 'COTS Quadcopter',
    serial: '1581F4C6K21A',
    pilotLoc: 'North Perimeter (1.5 km)',
    status: 'active',
  },
  {
    id: 'TRG-02',
    name: 'Custom DIY FPV Quad',
    type: 'rogue',
    distanceKm: 2.7,
    azimuthDeg: 220,
    altitudeM: 85,
    frequency: '5.8 GHz Analog',
    model: 'Unregistered Frame',
    serial: 'UNKNOWN / NO REMOTE ID',
    pilotLoc: 'West Flyover',
    status: 'active',
  },
  {
    id: 'AUTH-01',
    name: 'Cinema Octocopter',
    type: 'authorized',
    distanceKm: 0.5,
    azimuthDeg: 135,
    altitudeM: 40,
    frequency: '2.4 GHz Approved',
    model: 'Alta X (Authorized)',
    serial: 'AUTH-BK-092-LIC',
    pilotLoc: 'Main Stage FOH Desk',
    status: 'active',
  },
];

export const InteractiveRadarDemo: React.FC = () => {
  const [drones, setDrones] = useState<DroneTarget[]>(INITIAL_DRONES);
  const [selectedDroneId, setSelectedDroneId] = useState<string>('TRG-01');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isJammingActive, setIsJammingActive] = useState<boolean>(false);
  const [sweepAngle, setSweepAngle] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSweepAngle((prev) => (prev + 3) % 360);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const selectedDrone = drones.find((d) => d.id === selectedDroneId) || drones[0];

  const handleJamTrigger = () => {
    if (!selectedDrone || selectedDrone.type === 'authorized' || selectedDrone.status === 'neutralized') return;

    setIsJammingActive(true);
    if (soundEnabled) playJammerActivation();

    setDrones((prev) =>
      prev.map((d) => (d.id === selectedDrone.id ? { ...d, status: 'jamming' } : d))
    );

    setTimeout(() => {
      setIsJammingActive(false);
      if (soundEnabled) playNeutralizeChime();
      setDrones((prev) =>
        prev.map((d) =>
          d.id === selectedDrone.id ? { ...d, status: 'neutralized', altitudeM: 0 } : d
        )
      );
    }, 2200);
  };

  const handleReset = () => {
    setDrones(INITIAL_DRONES);
    setSelectedDroneId('TRG-01');
    setIsJammingActive(false);
  };

  const handleSpawn = () => {
    const newId = `TRG-0${drones.length + 1}`;
    const newDrone: DroneTarget = {
      id: newId,
      name: 'Hostile Inbound Quad',
      type: 'critical',
      distanceKm: Number((1.2 + Math.random() * 2).toFixed(1)),
      azimuthDeg: Math.floor(Math.random() * 360),
      altitudeM: 95,
      frequency: '2.4 GHz & 5.8 GHz',
      model: 'Commercial Drone',
      serial: `UKN-${Math.floor(10000 + Math.random() * 90000)}`,
      pilotLoc: 'Unsecured Perimeter Area',
      status: 'active',
    };
    setDrones((prev) => [newDrone, ...prev]);
    setSelectedDroneId(newId);
    if (soundEnabled) playRadarPing();
  };

  return (
    <section id="radar-demo" className="py-16 sm:py-20 bg-[#07111E] text-[#F8FAFC] border-t border-[#1E3A5F]/40 relative bg-cyber-grid">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div className="space-y-2.5">
            <InView>
              <div className="text-[11px] font-mono tracking-widest uppercase text-buzzkill-cyan font-semibold">
                Interactive Command Simulator
              </div>
            </InView>
            <InView transition={{ delay: 0.1, duration: 0.5 }}>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display leading-tight">
                Airspace Radar & <span className="text-buzzkill-cyan font-normal">Jamming Demo</span>.
              </h2>
            </InView>
            <p className="text-sm sm:text-base text-slate-400 font-light max-w-xl">
              Simulate real-time RF detection with the Vajra Scan-G and execute software-defined jamming with the Vajra Shot.
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2.5 rounded-full bg-[#0B192C] hover:bg-[#132A4A] border border-[#1E3A5F]/60 text-slate-400 hover:text-white transition-colors"
              title={soundEnabled ? 'Mute sound' : 'Enable sound'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-[#00C2FF]" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={handleReset}
              className="p-2.5 rounded-full bg-[#0B192C] hover:bg-[#132A4A] border border-[#1E3A5F]/60 text-slate-400 hover:text-white transition-colors"
              title="Reset simulation"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={handleSpawn}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#0B192C] hover:bg-[#132A4A] border border-[#1E3A5F]/60 text-xs font-mono text-slate-300 hover:text-white transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-buzzkill-cyan" />
              <span>Spawn Target</span>
            </button>
          </div>
        </div>

        {/* Command Console Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Left: 360° Circular Radar Display */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="relative w-full max-w-[440px] aspect-square rounded-full bg-[#040912] border-2 border-[#1E3A5F]/80 shadow-[0_0_50px_rgba(0,194,255,0.15)] p-5 flex items-center justify-center overflow-hidden">

              {/* Concentric distance rings */}
              <div className="absolute inset-8 rounded-full border border-cyan-500/25" />
              <div className="absolute inset-24 rounded-full border border-cyan-500/20" />
              <div className="absolute inset-40 rounded-full border border-cyan-500/15" />

              {/* Crosshair Axes */}
              <div className="absolute inset-y-6 w-px bg-cyan-500/20 left-1/2 -translate-x-1/2" />
              <div className="absolute inset-x-6 h-px bg-cyan-500/20 top-1/2 -translate-y-1/2" />

              {/* Center Venue Node */}
              <div className="w-2.5 h-2.5 rounded-full bg-buzzkill-cyan shadow-[0_0_12px_#00C2FF]" />

              {/* Rotating Sweep Beam */}
              <div
                className="absolute inset-6 rounded-full pointer-events-none"
                style={{
                  transform: `rotate(${sweepAngle}deg)`,
                  transformOrigin: 'center center',
                  background: 'conic-gradient(from 0deg, rgba(0, 194, 255, 0.35) 0deg, transparent 40deg, transparent 360deg)',
                }}
              />

              {/* Plotted Drone Blips */}
              {drones.map((drone) => {
                const maxRadius = 170;
                const r = Math.min((drone.distanceKm / 4) * maxRadius, maxRadius);
                const rad = ((drone.azimuthDeg - 90) * Math.PI) / 180;
                const x = r * Math.cos(rad);
                const y = r * Math.sin(rad);

                const isSelected = selectedDroneId === drone.id;
                const isAuth = drone.type === 'authorized';
                const isNeut = drone.status === 'neutralized';

                return (
                  <div
                    key={drone.id}
                    onClick={() => setSelectedDroneId(drone.id)}
                    style={{ transform: `translate(${x}px, ${y}px)` }}
                    className="absolute z-20 cursor-pointer"
                  >
                    <div className="relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                      {!isNeut && (
                        <span
                          className={`animate-ping absolute inline-flex h-5 w-5 rounded-full opacity-60 ${isAuth ? 'bg-emerald-400' : 'bg-red-500'
                            }`}
                        />
                      )}
                      <div
                        className={`w-3.5 h-3.5 rounded-full border-2 transition-all ${isNeut
                            ? 'bg-slate-700 border-slate-600 opacity-50'
                            : isAuth
                              ? 'bg-emerald-400 border-white'
                              : isSelected
                                ? 'bg-red-500 border-white ring-4 ring-red-500/40 scale-125'
                                : 'bg-cyan-400 border-white'
                          }`}
                      />
                    </div>
                  </div>
                );
              })}

              {/* Markers */}
              <span className="absolute top-3 left-1/2 -translate-x-1/2 text-[9px] font-mono text-buzzkill-cyan/80 font-semibold">N 0°</span>
              <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[9px] font-mono text-buzzkill-cyan/80 font-semibold">S 180°</span>
            </div>

            {/* Target Selectors */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              {drones.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDroneId(d.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${selectedDroneId === d.id
                      ? 'bg-buzzkill-cyan text-[#07111E] font-bold shadow-md shadow-cyan-500/20'
                      : 'bg-[#0B192C] text-slate-300 border border-[#1E3A5F]/60 hover:text-white'
                    }`}
                >
                  {d.id} {d.status === 'neutralized' && '(OFF)'}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Telemetry Readout & Jammer Trigger */}
          <div className="lg:col-span-5 space-y-6">

            <div className="p-8 rounded-2xl bg-[#0B192C] border border-[#1E3A5F]/60 shadow-xl space-y-6">

              <div className="flex items-center justify-between border-b border-[#1E3A5F]/40 pb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400">Lock Target</span>
                  <div className="text-lg font-bold text-white font-display mt-0.5">{selectedDrone.name}</div>
                </div>
                <span
                  className={`text-[10px] font-mono uppercase px-2.5 py-1 rounded-full font-semibold ${selectedDrone.status === 'neutralized'
                      ? 'bg-slate-800 text-slate-400'
                      : selectedDrone.type === 'authorized'
                        ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-500/30'
                        : 'bg-red-950/50 text-red-300 border border-red-500/30'
                    }`}
                >
                  {selectedDrone.status === 'neutralized' ? 'NEUTRALIZED' : selectedDrone.type === 'authorized' ? 'AUTHORIZED' : 'HOSTILE'}
                </span>
              </div>

              {/* Specs */}
              <div className="space-y-3 text-xs font-mono">
                <div className="flex justify-between py-1 border-b border-[#1E3A5F]/30">
                  <span className="text-slate-400">Distance to Stage:</span>
                  <span className="text-white font-semibold">{selectedDrone.distanceKm} km</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1E3A5F]/30">
                  <span className="text-slate-400">Azimuth Bearing:</span>
                  <span className="text-white font-semibold">{selectedDrone.azimuthDeg}°</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1E3A5F]/30">
                  <span className="text-slate-400">Altitude:</span>
                  <span className="text-white font-semibold">{selectedDrone.altitudeM} meters</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1E3A5F]/30">
                  <span className="text-slate-400">RF Frequency:</span>
                  <span className="text-buzzkill-cyan font-semibold">{selectedDrone.frequency}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Pilot Location:</span>
                  <span className="text-sky-300 font-semibold">{selectedDrone.pilotLoc}</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                {selectedDrone.type === 'authorized' ? (
                  <div className="p-3 rounded-xl bg-[#07111E] border border-[#1E3A5F]/40 text-xs text-slate-400 font-light">
                    Whitelisted production octocopter operating inside approved 3D corridor.
                  </div>
                ) : selectedDrone.status === 'neutralized' ? (
                  <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-600/30 text-xs text-emerald-300 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>Drone neutralized. Forced vertical landing completed safely.</span>
                  </div>
                ) : (
                  <button
                    onClick={handleJamTrigger}
                    disabled={isJammingActive}
                    className={`w-full py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md ${isJammingActive
                        ? 'bg-red-600 animate-pulse text-white'
                        : 'bg-buzzkill-cyan hover:bg-[#00A8E8] text-[#07111E] shadow-cyan-500/20 border border-cyan-400/40'
                      }`}
                  >
                    {isJammingActive ? 'Emitting Jamming Signal...' : 'Engage Vajra Shot Jammer'}
                  </button>
                )}
              </div>

            </div>

            {/* Spectrum Bar */}
            <div className="p-4 rounded-xl bg-[#0B192C] border border-[#1E3A5F]/60 flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-buzzkill-cyan font-semibold">
                <Activity className="w-3.5 h-3.5" /> Spectrum Watch
              </span>
              <span>433 MHz – 5.8 GHz Active</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
