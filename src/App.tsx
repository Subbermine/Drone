import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ThreatLandscape } from './components/ThreatLandscape';
import { AboutUs } from './components/AboutUs';
import { CoreServices } from './components/CoreServices';
import { InteractiveRadarDemo } from './components/InteractiveRadarDemo';
import { HardwareArsenal } from './components/HardwareArsenal';
import { KeyApplications } from './components/KeyApplications';
import { ProcessTimeline } from './components/ProcessTimeline';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#07111E] text-white relative selection:bg-[#00C2FF] selection:text-[#07111E]">
      {/* Top Header */}
      <Navbar />

      {/* Main Sections */}
      <main>
        <Hero />
        <ThreatLandscape />
        <AboutUs />
        <CoreServices />
        <InteractiveRadarDemo />
        <HardwareArsenal />
        <KeyApplications />
        <ProcessTimeline />
        <FAQSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
