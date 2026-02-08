import React, { useState } from 'react';
import { translations } from '../utils/translations';

const RSVPForm = ({ language }) => {
    const t = translations[language].rsvp;
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        attendance: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.name || !formData.email || !formData.attendance) {
            alert("Please fill in all required fields.");
            return;
        }

        setIsSubmitting(true);

        try {
            // Import dynamically to avoid top-level issues if file not ready
            const { supabase, isSupabaseConfigured } = await import('../lib/supabaseClient');

            if (isSupabaseConfigured() && supabase) {
                const { error } = await supabase
                    .from('rsvps')
                    .insert([
                        {
                            name: formData.name,
                            email: formData.email,
                            attendance: formData.attendance,
                            message: formData.message,
                            submitted_at: new Date()
                        }
                    ]);

                if (error) throw error;
                console.log("Saved to Supabase");
            } else {
                console.warn("Supabase not configured. Data not saved to DB.");
            }

            // Simulate network delay for effect
            await new Promise(r => setTimeout(r, 1500));

            setIsSubmitted(true);
            setFormData({ name: '', email: '', attendance: '', message: '' });
        } catch (error) {
            console.error("Error submitting RSVP:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="py-16 max-w-2xl mx-auto">
            <div className="relative glass-panel p-8 md:p-12 rounded-2xl shadow-2xl border border-teatro-gold/30">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-teatro-gold text-teatro-dark px-6 py-2 uppercase tracking-[0.3em] font-sans text-xs font-bold shadow-lg">
                    {t.title}
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-teatro-gold/70 pl-1">{t.name}</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full bg-teatro-dark/5 border-b border-teatro-gold/30 px-4 py-3 text-teatro-warm focus:border-teatro-gold focus:bg-teatro-primary outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-teatro-gold/70 pl-1">{t.email}</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-teatro-dark/5 border-b border-teatro-gold/30 px-4 py-3 text-teatro-warm focus:border-teatro-gold focus:bg-teatro-primary outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-xs uppercase tracking-widest text-teatro-gold/70 pl-1 block text-center mb-4">{t.attendance}</label>
                        <div className="flex flex-col md:flex-row gap-4 justify-center">
                            <label className="flex-1 cursor-pointer group">
                                <input
                                    type="radio"
                                    name="attendance"
                                    value="attending"
                                    checked={formData.attendance === 'attending'}
                                    onChange={handleChange}
                                    className="peer hidden"
                                />
                                <div className="border border-teatro-gold/20 p-4 text-center rounded hover:bg-teatro-gold/5 peer-checked:bg-teatro-gold peer-checked:text-teatro-dark transition-all duration-300 group-hover:border-teatro-gold/40">
                                    <span className="font-serif italic text-lg">{t.attending}</span>
                                </div>
                            </label>
                            <label className="flex-1 cursor-pointer group">
                                <input
                                    type="radio"
                                    name="attendance"
                                    value="declining"
                                    checked={formData.attendance === 'declining'}
                                    onChange={handleChange}
                                    className="peer hidden"
                                />
                                <div className="border border-teatro-gold/20 p-4 text-center rounded hover:bg-teatro-gold/5 peer-checked:bg-teatro-warm peer-checked:text-teatro-dark peer-checked:border-teatro-gold transition-all duration-300 group-hover:border-teatro-gold/40">
                                    <span className="font-serif italic text-lg text-teatro-beige/70 peer-checked:text-teatro-dark">{t.declining}</span>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-teatro-gold/70 pl-1">{t.message}</label>
                        <textarea
                            rows="3"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full bg-teatro-dark/5 border-b border-teatro-gold/30 px-4 py-3 text-teatro-warm focus:border-teatro-gold focus:bg-teatro-primary outline-none transition-all resize-none"
                        ></textarea>
                    </div>

                    <div className="pt-4 text-center">
                        <button
                            type="submit"
                            className="bg-teatro-gold text-teatro-dark px-10 py-4 font-sans uppercase tracking-[0.2em] text-sm hover:scale-105 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300 font-bold w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isSubmitting || isSubmitted}
                        >
                            {isSubmitting ? 'Submitting...' : isSubmitted ? 'Submitted!' : t.submit}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default RSVPForm;
