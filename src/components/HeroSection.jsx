import React from 'react';
import { translations } from '../utils/translations';

const HeroSection = ({ language }) => {
    const t = translations[language].hero;

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center py-20 px-6 text-center overflow-hidden">
            {/* Decorative Gold Border */}
            <div className="absolute inset-4 md:inset-8 border border-teatro-gold/30 pointer-events-none z-0" />
            <div className="absolute inset-6 md:inset-10 border border-teatro-gold/10 pointer-events-none z-0" />

            <div className="z-10 animate-fade-in-up space-y-8 max-w-4xl mx-auto">
                {/* Bismillah */}
                <div className="space-y-4">
                    <h1 className="font-arabic text-3xl md:text-5xl text-teatro-gold leading-relaxed drop-shadow-md">
                        {t.bismillah}
                    </h1>
                    <p className="font-serif text-teatro-beige/80 italic text-sm md:text-lg tracking-wide">
                        {t.bismillahTrans}
                    </p>
                </div>

                {/* Separator */}
                <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-teatro-gold to-transparent mx-auto my-8" />

                {/* Family Names */}
                <div className="font-sans text-teatro-warm uppercase tracking-[0.2em] text-xs md:text-sm">
                    Mr. & Mrs. Qamrul Hasan
                </div>

                {/* Request Line */}
                <h2 className="font-serif text-2xl md:text-2.5xl text-teatro-beige/90 leading-relaxed px-4">
                    {t.request}                </h2>

                {/* Couple Names */}
                <div className="space-y-6 pt-4">
                    {/* ... Names ... */}
                    <div className="font-serif text-5xl md:text-7xl lg:text-8xl text-teatro-gold gold-gradient-text transform hover:scale-105 transition-transform duration-700 cursor-default">
                        Samrah Fatima
                    </div>
                    {/* Daughter of */}
                    <div className="font-sans text-teatro-warm uppercase tracking-[0.2em] text-xs md:text-sm">
                        D/o Mr. & Mrs. Badrul Hasan
                    </div>
                    <div className="font-serif text-2xl md:text-4xl text-teatro-beige/60 italic">
                        &
                    </div>
                    <div className="font-serif text-5xl md:text-7xl lg:text-8xl text-teatro-gold gold-gradient-text transform hover:scale-105 transition-transform duration-700 cursor-default">
                        Abdul Sattar
                    </div>
                    {/* Son of */}
                    <div className="font-sans text-teatro-warm uppercase tracking-[0.2em] text-xs md:text-sm">
                        S/o Mr. & Mrs. Izharul Haque
                    </div>

                    {/* Couple Illustration Placeholder */}
                    <div className="pt-8 flex justify-center">
                        <div className="relative w-64 h-64 md:w-80 md:h-80 opacity-80 mix-blend-multiply">
                            <img
                                src="/src/assets/couple_illustration.png"
                                alt="Couple Illustration"
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.parentElement.classList.add('border', 'border-dashed', 'border-teatro-gold/50', 'flex', 'items-center', 'justify-center');
                                    e.target.parentElement.innerHTML = '<span class="text-teatro-gold/50 text-xs uppercase tracking-widest">Place couple_illustration.png in src/assets</span>';
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
