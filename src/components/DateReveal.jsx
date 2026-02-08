import React from 'react';
import { translations } from '../utils/translations';
import { Calendar as CalendarIcon } from 'lucide-react';

const DateReveal = ({ language }) => {
    // Calendar data for March 2026
    // March 1, 2026 is a Sunday
    const daysInMonth = 31;
    const startingDay = 0; // 0 = Sunday
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const weddingDay = 27;

    return (
        <div className="py-20 flex flex-col items-center justify-center space-y-12 animate-fade-in-up">

            {/* Elegant Date Text */}
            <div className="text-center space-y-4">
                <h3 className="text-teatro-gold uppercase tracking-[0.3em] text-sm font-sans flex items-center justify-center gap-3">
                    <CalendarIcon size={16} /> Save the Date
                </h3>
                <div className="space-y-2">
                    <p className="font-serif text-2xl md:text-3xl text-teatro-beige/80 italic">Friday</p>
                    <div className="font-serif text-5xl md:text-7xl font-bold text-teatro-warm gold-gradient-text py-2">
                        March 27
                    </div>
                     <p className="font-sans text-xl md:text-2xl tracking-[0.2em] text-teatro-warm/60">8:30 PM ONWARDS</p>
                    <p className="font-sans text-xl md:text-2xl tracking-[0.2em] text-teatro-warm/60">2026</p>
                </div>
            </div>

            {/* Mini Calendar */}
            <div className="glass-panel p-8 rounded-xl max-w-sm w-full mx-4">
                <div className="text-center font-serif text-xl text-teatro-warm mb-6">March 2026</div>

                <div className="grid grid-cols-7 gap-2 text-center mb-2">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                        <div key={`${d}-${i}`} className="font-sans text-xs font-bold text-teatro-gold">{d}</div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-2 text-center">
                    {/* Empty cells for days before start of month */}
                    {Array.from({ length: startingDay }).map((_, i) => (
                        <div key={`empty-${i}`} />
                    ))}

                    {days.map(day => (
                        <div
                            key={day}
                            className={`
                relative z-10 font-serif text-sm h-8 w-8 flex items-center justify-center rounded-full transition-colors
                ${day === weddingDay
                                    ? 'bg-teatro-gold text-white shadow-lg scale-110'
                                    : 'text-teatro-warm/70 hover:bg-teatro-gold/10'}
              `}
                        >
                            {day}
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default DateReveal;
