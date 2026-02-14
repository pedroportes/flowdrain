import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export function useAdminAuth() {
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        checkAdmin();
    }, []);

    async function checkAdmin() {
        try {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                navigate('/admin/login');
                return;
            }

            // Check public.usuarios table
            const { data: profile, error } = await supabase
                .from('usuarios')
                .select('tipo_usuario, is_super_admin')
                .eq('auth_user_id', user.id) // Assuming auth_user_id links to auth.users.id
                .single();

            if (error || !profile) {
                console.error('Erro ao verificar permissão:', error);
                navigate('/admin/login'); // Or unauthorized page
                return;
            }

            if (profile.tipo_usuario === 'admin' || profile.is_super_admin) {
                setIsAdmin(true);
            } else {
                navigate('/'); // Redirect non-admins to home
            }
        } catch (error) {
            console.error('Auth error:', error);
            navigate('/admin/login');
        } finally {
            setLoading(false);
        }
    }

    return { loading, isAdmin };
}
