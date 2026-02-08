import React from 'react';
import { translations } from '../utils/translations';
import { MapPin } from 'lucide-react';

const VenueSection = ({ language }) => {
    const t = translations[language].venue;

    return (
        <section className="text-center space-y-8 animate-fade-in-up">
            {/* Venue Illustration */}
            <div className="relative w-full max-w-2xl aspect-video mx-auto mb-12 overflow-hidden rounded-lg shadow-xl glass-panel">
                <img
                    src="/src/assets/venue_illustration.png"
                    alt="Moti Mahal Lawn"
                    className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                        e.target.parentElement.classList.add('flex', 'items-center', 'justify-center', 'bg-teatro-primary/10');
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = '<div class="text-center p-8"><span class="text-teatro-gold/50 text-xs uppercase tracking-widest block mb-2">Venue Illustration</span><span class="text-teatro-text/50 text-xs">Place venue_illustration.png in src/assets</span></div>';
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teatro-dark/50 to-transparent pointer-events-none" />
            </div>

            <div className="space-y-4">
                <h2 className="font-serif text-4xl md:text-5xl text-teatro-gold gold-gradient-text">
                    Moti Mahal Lawn1 (Richi Rich)
                </h2>

                <div className="flex flex-col items-center gap-2 text-teatro-beige/80 font-sans tracking-wide">
                    <p>{t.address}</p>
                    <a
                        // href="https://maps.google.com/?q=Villa+Medicea+di+Artimino"
                        href="https://www.google.com/maps/place/Moti+Mahal+Lawn+1(RICHI+RICH)/@26.8573647,80.93789,17z/data=!4m6!3m5!1s0x399bfd8eb009a235:0xd980df364583468b!8m2!3d26.8573647!4d80.9404649!16s%2Fg%2F11byz93d7s?entry=ttu&g_ep=EgoyMDI2MDIwNC4wIKXMDSoASAFQAw%3D%3D"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs uppercase text-teatro-gold border-b border-teatro-gold/50 hover:text-teatro-accent pb-0.5 mt-2 transition-colors"
                    >
                        <MapPin size={14} /> Open in Maps
                    </a>
                </div>
            </div>
        </section>
    );
};

export default VenueSection;
