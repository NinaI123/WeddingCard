import React from 'react';
import { Globe } from 'lucide-react';

const LanguageSwitcher = ({ language, setLanguage }) => {
    const toggleLanguage = () => {
        setLanguage(prev => prev === 'en' ? 'it' : 'en');
    };

    return (
        <button
            onClick={toggleLanguage}
            className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-teatro-gold hover:bg-teatro-gold/10 transition-all duration-300"
            aria-label="Switch Language"
        >
            <Globe size={18} />
            <span className="text-sm font-medium pt-0.5 uppercase tracking-wider">
                {language}
            </span>
        </button>
    );
};

export default LanguageSwitcher;
