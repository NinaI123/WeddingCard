import { createClient } from '@supabase/supabase-js';

// These environment variables will be needed in your .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Fallback for development if keys are missing or are placeholders
const isConfigured =
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith('http') &&
    !supabaseUrl.includes('your_project_url');

export const supabase = isConfigured
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export const isSupabaseConfigured = () => {
    if (!isConfigured) {
        console.warn('Supabase Config Missing:', {
            urlPresent: !!supabaseUrl,
            keyPresent: !!supabaseAnonKey,
            urlValid: supabaseUrl?.startsWith('http'),
            notPlaceholder: !supabaseUrl?.includes('your_project_url')
        });
    }
    return isConfigured;
};
