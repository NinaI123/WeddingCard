import React, { useState, useEffect } from 'react';
import { translations } from '../utils/translations';
import { Heart, MessageCircle } from 'lucide-react';

// Helper function to format time (e.g., "2h ago", "Just now")
const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const now = new Date();
    const diffSeconds = Math.floor((now - date) / 1000);

    if (diffSeconds < 60) return 'Just now';
    if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)}m ago`;
    if (diffSeconds < 86400) return `${Math.floor(diffSeconds / 3600)}h ago`;
    if (diffSeconds < 604800) return `${Math.floor(diffSeconds / 86400)}d ago`;
    return date.toLocaleDateString();
};

const BlessingsWall = ({ language }) => {
    const t = translations[language].blessings;
    const [blessings, setBlessings] = useState([]);
    const [formData, setFormData] = useState({ name: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch blessings on load
    useEffect(() => {
        const fetchBlessings = async () => {
            try {
                const { supabase, isSupabaseConfigured } = await import('../lib/supabaseClient');
                if (isSupabaseConfigured() && supabase) {
                    const { data, error } = await supabase
                        .from('blessings')
                        .select('*')
                        .order('created_at', { ascending: false })
                        .limit(20);

                    if (data) setBlessings(data);
                }
            } catch (err) {
                console.warn("Could not fetch blessings", err);
            }
        };
        fetchBlessings();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.message) return;

        setIsSubmitting(true);

        try {
            const { supabase, isSupabaseConfigured } = await import('../lib/supabaseClient');

            const newBlessing = {
                id: 'temp-' + Date.now(),
                name: formData.name,
                message: formData.message,
                created_at: new Date().toISOString()
            };

            if (isSupabaseConfigured() && supabase) {
                const { error } = await supabase
                    .from('blessings')
                    .insert([
                        {
                            name: formData.name,
                            message: formData.message
                        }
                    ]);

                if (error) throw error;
            } else {
                console.warn("Supabase not configured.");
            }

            // UI Optimistic Update
            setBlessings(prev => [newBlessing, ...prev]);
            setFormData({ name: '', message: '' });
        } catch (error) {
            console.error("Error submitting blessing:", error);
            alert("Something went wrong.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="glass-panel p-8 rounded-xl md:p-10 space-y-8 flex flex-col h-full bg-white/70">
            <div className="space-y-2 border-b border-teatro-gold/10 pb-4">
                <h3 className="font-serif text-2xl md:text-3xl text-teatro-gold flex items-center gap-3">
                    <Heart size={24} className="text-teatro-gold fill-teatro-gold/20" />
                    {t.title}
                </h3>
            </div>

            {/* Message Feed */}
            <div className="flex-grow space-y-4 max-h-96 overflow-y-auto pr-2 scrollbar-hide bg-teatro-dark/5 p-4 rounded-lg shadow-inner">
                {blessings.length === 0 && (
                    <div className="text-center text-teatro-beige/50 italic py-8">
                        Be the first to send a blessing...
                    </div>
                )}
                {blessings.map((msg, i) => (
                    <div key={msg.id || i} className="animate-fade-in bg-white p-4 rounded-lg border-l-2 border-teatro-gold shadow-sm">
                        <p className="font-serif text-teatro-warm/90 italic mb-2 text-lg">"{msg.message}"</p>
                        <div className="flex justify-between items-end">
                            <span className="font-sans text-xs font-bold text-teatro-gold uppercase tracking-wider">{msg.name}</span>
                            <span className="text-[10px] text-teatro-beige/60 uppercase tracking-wider">{formatTime(msg.created_at)}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="relative pt-4 border-t border-teatro-gold/10">
                <div className="flex flex-col gap-4">
                    <input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={t.namePlaceholder}
                        className="bg-white/50 border border-teatro-gold/20 rounded px-4 py-3 text-sm text-teatro-warm focus:border-teatro-gold focus:outline-none transition-colors placeholder:text-teatro-beige/50"
                    />
                    <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder={t.messagePlaceholder}
                        rows={3}
                        className="bg-white/50 border border-teatro-gold/20 rounded px-4 py-3 text-sm text-teatro-warm resize-none focus:border-teatro-gold focus:outline-none transition-colors placeholder:text-teatro-beige/50"
                    />
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="self-end mt-2 text-xs uppercase font-bold text-teatro-gold hover:text-teatro-accent flex items-center gap-2 transition-colors disabled:opacity-50"
                    >
                        {isSubmitting ? 'Sending...' : t.submit} <MessageCircle size={14} />
                    </button>
                </div>
            </form>
        </section>
    );
};

export default BlessingsWall;
