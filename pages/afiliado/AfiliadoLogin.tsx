import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { LogIn, AlertCircle } from 'lucide-react';

export function AfiliadoLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // 1. Login via Supabase Auth
            const { error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (authError) throw new Error('Email ou senha incorretos.');

            // 2. Verifica se o email é de um afiliado
            const { data: afiliado, error: affError } = await supabase
                .from('afiliados')
                .select('id, status')
                .eq('email', email)
                .single();

            if (affError || !afiliado) {
                await supabase.auth.signOut();
                throw new Error('Sua conta não está vinculada a um perfil de afiliado.');
            }

            if (afiliado.status === 'bloqueado') {
                await supabase.auth.signOut();
                throw new Error('Sua conta de afiliado está bloqueada. Entre em contato com o suporte.');
            }

            if (afiliado.status === 'inativo') {
                await supabase.auth.signOut();
                throw new Error('Sua conta de afiliado está inativa. Entre em contato com o suporte.');
            }

            navigate('/afiliado');
        } catch (err: any) {
            setError(err.message || 'Erro ao fazer login.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <LogIn className="w-8 h-8 text-indigo-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Painel do Afiliado</h1>
                    <p className="text-sm text-gray-500 mt-2">
                        Acesse com o email e senha da sua conta
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="seu@email.com"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Senha</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold text-base hover:bg-indigo-700 transition disabled:opacity-50 shadow-lg shadow-indigo-200"
                    >
                        {loading ? 'Entrando...' : 'Entrar no Painel'}
                    </button>
                </form>
            </div>
        </div>
    );
}
