import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { FAQS } from '../data/buzzkillData';
import { InView } from './motion-primitives/InView';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 sm:py-20 bg-[#F1F5F9] text-[#0B192C] border-t border-slate-200 relative">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-10 sm:mb-12 space-y-3">
          <InView>
            <div className="text-[11px] font-mono tracking-widest uppercase text-[#00A8E8] font-semibold">
              Common Questions
            </div>
          </InView>

          <InView transition={{ delay: 0.1, duration: 0.5 }}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight font-display leading-tight">
              Frequently Asked <span className="text-[#00A8E8] font-normal">Questions</span>.
            </h2>
          </InView>

          <InView transition={{ delay: 0.2, duration: 0.5 }}>
            <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
              Essential clarifications on regulations, RF interference, and booking lead times.
            </p>
          </InView>
        </div>

        {/* Minimalist Accordion */}
        <div className="border-t border-slate-200 divide-y divide-slate-200">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="py-4 sm:py-5">
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left flex items-start justify-between gap-4 focus:outline-none group"
                >
                  <span className="text-base sm:text-lg font-medium text-[#0B192C] group-hover:text-[#00A8E8] transition-colors duration-200">
                    {faq.question}
                  </span>
                  <div className="mt-1 text-slate-400 group-hover:text-[#00A8E8] transition-colors">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <p className="pt-4 text-sm sm:text-base text-slate-600 font-light leading-relaxed max-w-3xl">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
