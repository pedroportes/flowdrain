import React, { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { LayoutDashboard, User, LogOut, Loader2 } from 'lucide-react';

export function AfiliadoLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [userEmail, setUserEmail] = useState('');
    const [affiliateName, setAffiliateName] = useState('');

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user?.email) {
                navigate('/afiliado/login');
                return;
            }

            // Verifica se é afiliado
            const { data: afiliado } = await supabase
                .from('afiliados')
                .select('nome, status')
                .eq('email', user.email)
                .single();

            if (!afiliado || afiliado.status !== 'ativo') {
                await supabase.auth.signOut();
                navigate('/afiliado/login');
                return;
            }

            setUserEmail(user.email);
            setAffiliateName(afiliado.nome);
        } catch {
            navigate('/afiliado/login');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/afiliado/login');
    };

    const isActive = (path: string) => {
        if (path === '/afiliado' && location.pathname === '/afiliado') return true;
        if (path !== '/afiliado' && location.pathname.startsWith(path)) return true;
        return false;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
            </div>
        );
    }

    const navItems = [
        { to: '/afiliado', icon: LayoutDashboard, label: 'Dashboard' },
        { to: '/afiliado/perfil', icon: User, label: 'Meu Perfil' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col min-h-screen">
                <div className="p-6 border-b border-gray-100">
                    <Link to="/">
                        <img src="/logo-flowdrain.png" alt="FlowDrain" className="h-12 w-auto object-contain" />
                    </Link>
                    <p className="text-xs text-indigo-600 font-semibold mt-2">Painel do Afiliado</p>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map(item => (
                        <Link
                            key={item.to}
                            to={item.to}
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive(item.to)
                                    ? 'bg-indigo-50 text-indigo-700'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <div className="mb-3">
                        <p className="text-sm font-medium text-gray-900 truncate">{affiliateName}</p>
                        <p className="text-xs text-gray-500 truncate">{userEmail}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        Sair
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
}
