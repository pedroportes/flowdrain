import { createClient } from '@supabase/supabase-js';

// As variáveis de ambiente devem ser criadas no arquivo .env.local
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error("ERRO CRÍTICO: VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY são obrigatórios no .env.local");
}

export const supabase = createClient(
    supabaseUrl || '',
    supabaseAnonKey || ''
);
