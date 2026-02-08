import React, { useState, useEffect } from 'react';
import { translations } from '../utils/translations';

const CountdownTimer = ({ language }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const t = translations[language].countdown;

    useEffect(() => {
        const targetDate = new Date('2026-03-27T11:00:00').getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000)
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="py-12 w-full max-w-4xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 justify-items-center">
                {Object.entries(timeLeft).map(([unit, value]) => (
                    <div key={unit} className="flex flex-col items-center">
                        <div className="text-4xl md:text-6xl font-serif text-teatro-gold font-light tabular-nums">
                            {String(value).padStart(2, '0')}
                        </div>
                        <div className="text-xs md:text-sm uppercase tracking-widest text-teatro-beige/60 mt-2 font-sans">
                            {t[unit]}
                        </div>
                        {/* Visual Separator for md+ that isn't on the last item */}
                        {/* This is complex to render inside map, simplifying visual */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CountdownTimer;
