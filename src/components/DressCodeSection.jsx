import React from 'react';
import { translations } from '../utils/translations';
import { Shirt, Sparkles } from 'lucide-react';

const DressCodeSection = ({ language }) => {
    const t = translations[language].dressCode;

    return (
        <section className="text-center py-12 px-6 border-y border-teatro-gold/10 relative">
            <div className="max-w-xl mx-auto space-y-8">
                <h2 className="font-serif text-3xl md:text-4xl text-teatro-gold">{t.title}</h2>

                <div className="flex justify-center gap-12 text-teatro-beige/60">
                    <div className="flex flex-col items-center gap-3">
                        <div className="p-4 rounded-full border border-teatro-gold/20 bg-teatro-primary/30">
                            <Shirt size={32} className="text-teatro-gold" />
                        </div>
                        <span className="font-sans text-xs uppercase tracking-widest">Formal Suit</span>
                    </div>

                    <div className="flex flex-col items-center gap-3">
                        <div className="p-4 rounded-full border border-teatro-gold/20 bg-teatro-primary/30">
                            <Sparkles size={32} className="text-teatro-gold" />
                        </div>
                        <span className="font-sans text-xs uppercase tracking-widest">Elegant Dress</span>
                    </div>
                </div>

                <p className="font-serif italic text-teatro-warm/80 text-lg">
                    "{t.description}"
                </p>

                <p className="font-sans text-xs text-teatro-beige/40 max-w-sm mx-auto leading-relaxed">
                    We kindly request our guests to adhere to the formal dress code. Black tie optional.
                </p>
            </div>
        </section>
    );
};

export default DressCodeSection;
