import React, { useState } from 'react';
import { Phone, MessageSquare, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { InView } from './motion-primitives/InView';
import { CONTACT_PERSONNEL } from '../data/buzzkillData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    phone: '',
    email: '',
    eventType: 'Concert / Music Festival',
    venueCity: '',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [refId, setRefId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedRef = `BK-${Math.floor(10000 + Math.random() * 90000)}`;
    setRefId(generatedRef);
    setSubmitted(true);

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#00C2FF', '#1D4ED8', '#FFFFFF', '#38BDF8'],
    });
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-[#07111E] text-[#F8FAFC] border-t border-[#1E3A5F]/40 relative bg-cyber-grid">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-10 sm:mb-12 space-y-3">
          <InView>
            <div className="text-[11px] font-mono tracking-widest uppercase text-buzzkill-cyan font-semibold">
              Operational Dispatch
            </div>
          </InView>

          <InView transition={{ delay: 0.1, duration: 0.5 }}>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display leading-[0.98]">
              Take Control Of <br />
              <span className="text-buzzkill-cyan font-normal">Your Airspace</span>.
            </h2>
          </InView>

          <InView transition={{ delay: 0.2, duration: 0.5 }}>
            <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed">
              Connect directly with our flight directors or submit event details for a customized airspace risk evaluation.
            </p>
          </InView>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Direct Contacts from PDF Slide 15 */}
          <div className="lg:col-span-5 space-y-5">
            <div className="space-y-1.5">
              <h3 className="text-base sm:text-lg font-semibold text-white font-display">Direct Command Personnel</h3>
              <p className="text-xs text-slate-400 font-light">
                Available for urgent stadium consultations, venue RF profiling, and active deployment dispatch.
              </p>
            </div>

            <div className="space-y-3.5">
              {CONTACT_PERSONNEL.map((person) => (
                <div
                  key={person.name}
                  className="p-5 sm:p-6 rounded-2xl bg-[#0B192C] border border-[#1E3A5F]/60 shadow-xl space-y-3 hover:border-buzzkill-cyan/80 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-bold text-white font-display">{person.name}</h4>
                      <p className="text-xs text-buzzkill-cyan font-mono mt-0.5 font-semibold">{person.role}</p>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 font-semibold bg-emerald-950/40 border border-emerald-600/30 px-2 py-0.5 rounded-full">
                      ACTIVE LINE
                    </span>
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <a
                      href={`tel:${person.cleanPhone}`}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-[#07111E] bg-buzzkill-cyan hover:bg-[#00A8E8] transition-colors shadow-md shadow-cyan-500/20"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{person.phone}</span>
                    </a>

                    <a
                      href={`https://wa.me/${person.cleanPhone.replace('+', '')}?text=Hello%20${person.name},%20I%20would%20like%20to%20inquire%20about%20BuzzKill%20drone%20security%20deployment.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-slate-300 hover:text-white bg-[#07111E] border border-[#1E3A5F]/60 transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#0B192C] border border-[#1E3A5F]/60 text-xs text-slate-400 space-y-1 font-light">
              <span className="text-white font-medium block">Deployment Assurance</span>
              <p>Certified zero-audio frequency interference for concert wireless systems and non-disclosure privacy for all productions.</p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0B192C] border border-[#1E3A5F]/60 shadow-2xl">
              
              {submitted ? (
                <div className="py-12 text-center space-y-6">
                  <div className="w-12 h-12 rounded-full bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white font-display">Inquiry Received</h3>
                    <p className="text-sm text-slate-400 font-light mt-2 max-w-sm mx-auto">
                      Thank you, <strong className="text-white">{formData.name}</strong>. Our flight operations team has logged your assessment request under dispatch ref <span className="font-mono text-buzzkill-cyan font-bold">{refId}</span>.
                    </p>
                  </div>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-full text-xs font-medium text-slate-300 hover:text-white border border-[#1E3A5F]/60"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white font-display">
                      Request Airspace Assessment
                    </h3>
                    <p className="text-xs text-slate-400 font-light mt-1">
                      Provide event specifics to receive a tailored defense plan and technical quotation.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-400">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Vikram Malhotra"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#07111E] border border-[#1E3A5F]/60 text-white text-sm focus:outline-none focus:border-buzzkill-cyan transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-400">Organization / Festival *</label>
                      <input
                        type="text"
                        required
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        placeholder="Production House"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#07111E] border border-[#1E3A5F]/60 text-white text-sm focus:outline-none focus:border-buzzkill-cyan transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-400">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#07111E] border border-[#1E3A5F]/60 text-white text-sm focus:outline-none focus:border-buzzkill-cyan transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-400">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="vikram@production.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#07111E] border border-[#1E3A5F]/60 text-white text-sm focus:outline-none focus:border-buzzkill-cyan transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-400">Event Category</label>
                      <select
                        value={formData.eventType}
                        onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#07111E] border border-[#1E3A5F]/60 text-white text-sm focus:outline-none focus:border-buzzkill-cyan transition-colors"
                      >
                        <option value="Concert / Music Festival">Concert / Festival</option>
                        <option value="Sports Arena / Championship">Sports Arena</option>
                        <option value="VIP / Diplomatic Summit">VIP / Diplomatic Summit</option>
                        <option value="Private Celebrity Event">Celebrity Private Event</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-400">Venue City</label>
                      <input
                        type="text"
                        value={formData.venueCity}
                        onChange={(e) => setFormData({ ...formData, venueCity: e.target.value })}
                        placeholder="Mumbai / Delhi / Bengaluru"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#07111E] border border-[#1E3A5F]/60 text-white text-sm focus:outline-none focus:border-buzzkill-cyan transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-400">Specific Threat Requirements</label>
                    <textarea
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="e.g. VIP artist protection, illegal drone live stream prevention, broadcast octocopter coordination..."
                      className="w-full px-4 py-2.5 rounded-xl bg-[#07111E] border border-[#1E3A5F]/60 text-white text-sm focus:outline-none focus:border-buzzkill-cyan transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-full text-xs font-bold uppercase tracking-wider text-[#07111E] bg-buzzkill-cyan hover:bg-[#00A8E8] transition-all duration-200 shadow-lg shadow-cyan-500/20 border border-cyan-400/40"
                  >
                    Submit Deployment Request
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
