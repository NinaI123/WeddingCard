import React, { useState, useEffect } from 'react';
import LanguageSwitcher from './components/LanguageSwitcher';
import HeroSection from './components/HeroSection';
import DateReveal from './components/DateReveal';
import CountdownTimer from './components/CountdownTimer';
import VenueSection from './components/VenueSection';
import DressCodeSection from './components/DressCodeSection';
import SongRequest from './components/SongRequest';
import BlessingsWall from './components/BlessingsWall';
import RSVPForm from './components/RSVPForm';
import { translations } from './utils/translations';

function App() {
  const [language, setLanguage] = useState('en');
  const [entered, setEntered] = useState(false);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    // Auto-enter after a short delay to allow initial render
    const timer = setTimeout(() => {
      setEntered(true);
      // Remove the overlay from DOM after animation
      setTimeout(() => {
        setOpacity(0);
      }, 2500);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-teatro-dark text-teatro-warm font-sans selection:bg-teatro-gold selection:text-teatro-dark">
      <LanguageSwitcher language={language} setLanguage={setLanguage} />

      {/* Curtain Overlay */}
      {opacity > 0 && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-1000 ${opacity === 0 ? 'pointer-events-none' : ''}`}
          style={{ opacity: opacity === 0 ? 0 : 1 }}
        >
          {/* Left Curtain */}
          <div className={`absolute left-0 top-0 bottom-0 w-1/2 bg-teatro-primary border-r border-teatro-gold/20 transform transition-transform duration-[2.5s] ease-[cubic-bezier(0.4,0,0.2,1)] ${entered ? '-translate-x-full' : 'translate-x-0'}`} />

          {/* Right Curtain */}
          <div className={`absolute right-0 top-0 bottom-0 w-1/2 bg-teatro-primary border-l border-teatro-gold/20 transform transition-transform duration-[2.5s] ease-[cubic-bezier(0.4,0,0.2,1)] ${entered ? 'translate-x-full' : 'translate-x-0'}`} />

          {/* Entrance Content */}
          <div className={`relative z-10 text-center transition-opacity duration-700 ${entered ? 'opacity-0 delay-0' : 'opacity-100 delay-300'}`}>
            {/* Empty content or subtle loading indicator if needed, but keeping it clean for auto-transition */}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className={`transition-opacity duration-1000 delay-[1.5s] ${entered ? 'opacity-100' : 'opacity-0'}`}>
        <HeroSection language={language} />

        <div className="max-w-6xl mx-auto px-4 md:px-8 space-y-24 pb-24">
          <DateReveal language={language} />

          <div className="space-y-4 text-center">
            <h3 className="font-serif text-3xl md:text-4xl text-teatro-beige">Timeline</h3>
            <div className="w-20 h-[1px] bg-teatro-gold mx-auto" />
            <CountdownTimer language={language} />
          </div>

          <VenueSection language={language} />
          {/* Menu Section Removed */}
          <DressCodeSection language={language} />

          <div className="flex flex-col gap-16 md:gap-24 relative">
            {/* Visual connector line between sections */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-teatro-gold/20 to-transparent -translate-x-1/2 hidden md:block" />

            <SongRequest language={language} />
            <BlessingsWall language={language} />
          </div>

          <RSVPForm language={language} />
        </div>
      </main>

      <footer className="py-8 text-center text-teatro-beige/30 text-xs uppercase tracking-widest border-t border-teatro-primary mt-20">
        Made with Love
      </footer>
    </div>
  );
}

export default App;
