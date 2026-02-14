import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

type UserProfile = {
    id: string;
    auth_user_id: string;
    tipo_usuario: 'admin' | 'empresa' | 'afiliado';
    empresa_id: string | null;
    afiliado_id: string | null;
    nome: string;
    email: string;
    is_super_admin: boolean;
};

type AuthContextType = {
    user: User | null;
    session: Session | null;
    profile: UserProfile | null;
    loading: boolean;
    isAdmin: boolean;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    session: null,
    profile: null,
    loading: true,
    isAdmin: false,
    signOut: async () => { },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Verificar sessão ativa inicial
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user) {
                fetchProfile(session.user.id);
            } else {
                setLoading(false);
            }
        });

        // Escutar mudanças na autenticação
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user) {
                fetchProfile(session.user.id);
            } else {
                setProfile(null);
                setLoading(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchProfile = async (userId: string) => {
        try {
            // Busca o perfil na tabela usuarios que criamos
            const { data, error } = await supabase
                .from('usuarios')
                .select('*')
                .eq('auth_user_id', userId)
                .single();

            if (error) {
                console.error('Erro ao buscar perfil:', error);
                // Se não achar perfil, tenta criar um básico (safety fallback) ou deixa null
            } else {
                setProfile(data);
            }
        } catch (error) {
            console.error('Erro inesperado ao buscar perfil:', error);
        } finally {
            setLoading(false);
        }
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setSession(null);
        setProfile(null);
    };

    const isAdmin = profile?.tipo_usuario === 'admin' || profile?.is_super_admin === true;

    return (
        <AuthContext.Provider value={{ user, session, profile, loading, isAdmin, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
