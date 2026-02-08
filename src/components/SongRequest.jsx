import React, { useState } from 'react';
import { translations } from '../utils/translations';
import { Music } from 'lucide-react';

const SongRequest = ({ language }) => {
    const t = translations[language].songRequest;
    const [formData, setFormData] = useState({
        name: '',
        song: '',
        artist: '',
        event: 'Reception' // Default event
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Reset isSubmitted if user starts typing again after a successful submission
        if (isSubmitted) {
            setIsSubmitted(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.song) {
            alert("Please provide at least your name and a song title.");
            return;
        }

        setIsSubmitting(true);
        setIsSubmitted(false); // Reset submitted state on new submission attempt

        try {
            const { supabase, isSupabaseConfigured } = await import('../lib/supabaseClient');

            if (isSupabaseConfigured() && supabase) {
                const { error } = await supabase
                    .from('song_requests')
                    .insert([
                        {
                            name: formData.name,
                            song: formData.song,
                            artist: formData.artist,
                            event: formData.event,
                            submitted_at: new Date()
                        }
                    ]);

                if (error) throw error;
                console.log("Saved to Supabase");
            } else {
                console.warn("Supabase not configured or client is null. Skipping submission.");
            }

            await new Promise(r => setTimeout(r, 1500)); // Simulate network delay

            setIsSubmitted(true);
            setFormData({ name: '', song: '', artist: '', event: 'Reception' }); // Reset form
        } catch (error) {
            console.error("Error submitting song:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="glass-panel p-8 rounded-xl md:p-10 space-y-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <Music size={80} />
            </div>

            <div className="space-y-2 relative z-10">
                <h3 className="font-serif text-2xl md:text-3xl text-teatro-gold">{t.title}</h3>
                <p className="font-sans text-sm text-teatro-beige/60">{t.subtitle}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                <div className="grid grid-cols-1 gap-4">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={t.namePlaceholder}
                        required
                        className="w-full bg-teatro-dark/50 border border-teatro-gold/20 rounded px-4 py-3 text-teatro-warm focus:outline-none focus:border-teatro-gold/60 transition-colors placeholder:text-teatro-beige/20 text-sm"
                    />
                    <input
                        type="text"
                        name="song"
                        value={formData.song}
                        onChange={handleInputChange}
                        placeholder={t.songPlaceholder}
                        required
                        className="w-full bg-teatro-dark/50 border border-teatro-gold/20 rounded px-4 py-3 text-teatro-warm focus:outline-none focus:border-teatro-gold/60 transition-colors placeholder:text-teatro-beige/20 text-sm"
                    />
                    <input
                        type="text"
                        name="artist"
                        value={formData.artist}
                        onChange={handleInputChange}
                        placeholder={t.artistPlaceholder}
                        className="w-full bg-teatro-dark/50 border border-teatro-gold/20 rounded px-4 py-3 text-teatro-warm focus:outline-none focus:border-teatro-gold/60 transition-colors placeholder:text-teatro-beige/20 text-sm"
                    />
                </div>

                <div className="pt-2">
                    <label className="block text-xs uppercase tracking-widest text-teatro-gold/60 mb-2">{t.eventLabel}</label>
                    <div className="flex flex-wrap gap-2">
                        {['Mehndi', 'Nikah', 'Reception', 'Walima'].map(event => (
                            <label key={event} className={`flex items-center gap-2 cursor-pointer px-3 py-1.5 rounded-full border transition-colors ${formData.event === event ? 'bg-teatro-gold text-teatro-dark border-teatro-gold' : 'bg-teatro-dark/30 border-teatro-gold/10 hover:border-teatro-gold/40'}`}>
                                <input
                                    type="radio"
                                    name="event"
                                    value={event}
                                    checked={formData.event === event}
                                    onChange={handleInputChange}
                                    className="hidden"
                                />
                                <span className={`text-xs ${formData.event === event ? 'text-teatro-dark font-bold' : 'text-teatro-beige/80'}`}>{event}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitted}
                    className="w-full sm:w-auto mt-4 px-6 py-3 bg-teatro-gold/10 hover:bg-teatro-gold text-teatro-gold hover:text-teatro-dark border border-teatro-gold transition-all duration-300 rounded font-sans uppercase tracking-widest text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitted ? "Message Sent!" : t.submit}
                </button>
            </form>
        </section>
    );
};

export default SongRequest;
