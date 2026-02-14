import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Lock, CheckCircle, AlertCircle, Loader2, ArrowRight } from 'lucide-react';

export const ResetPasswordPage: React.FC = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [verifying, setVerifying] = useState(true);
    const [sessionReady, setSessionReady] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const initSession = async () => {
            setVerifying(true);
            setError(null);

            // 1. Check if there's a token_hash in query params (PKCE flow from email template)
            const tokenHash = searchParams.get('token_hash');
            const type = searchParams.get('type');

            if (tokenHash && type === 'recovery') {
                console.log('[ResetPassword] Token hash found, verifying OTP...');
                try {
                    const { data, error: verifyError } = await supabase.auth.verifyOtp({
                        token_hash: tokenHash,
                        type: 'recovery',
                    });

                    if (verifyError) {
                        console.error('[ResetPassword] OTP verification failed:', verifyError);
                        setError('Link inválido ou expirado. Solicite um novo link de redefinição de senha.');
                        setVerifying(false);
                        return;
                    }

                    if (data.session) {
                        console.log('[ResetPassword] Session established via token_hash!');
                        setSessionReady(true);
                        setVerifying(false);
                        return;
                    }
                } catch (err: any) {
                    console.error('[ResetPassword] Error verifying token:', err);
                    setError('Erro ao verificar o link. Tente novamente.');
                    setVerifying(false);
                    return;
                }
            }

            // 2. Fallback: Check if there's already an active session (old flow via hash fragment)
            const { data: sessionData } = await supabase.auth.getSession();
            if (sessionData.session) {
                console.log('[ResetPassword] Existing session found.');
                setSessionReady(true);
                setVerifying(false);
                return;
            }

            // 3. Listen for auth events (handles redirect with access_token in hash)
            const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
                console.log('[ResetPassword] Auth event:', event);
                if (event === 'PASSWORD_RECOVERY' && session) {
                    console.log('[ResetPassword] Password recovery session received!');
                    setSessionReady(true);
                    setVerifying(false);
                }
            });

            // Give the auth listener a moment to pick up events from the URL hash
            setTimeout(() => {
                setVerifying(false);
            }, 2000);

            return () => subscription.unsubscribe();
        };

        initSession();
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (password.length < 6) {
            setError('A senha deve ter pelo menos 6 caracteres.');
            return;
        }

        if (password !== confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }

        setLoading(true);

        try {
            const { error } = await supabase.auth.updateUser({
                password: password
            });

            if (error) throw error;

            setSuccess(true);
            setTimeout(() => {
                window.location.href = 'https://app.gerenciaservicos.com.br/login';
            }, 3000);
        } catch (err: any) {
            console.error('[ResetPassword] Error updating password:', err);
            setError(err.message || 'Erro ao atualizar senha. O link pode ter expirado.');
        } finally {
            setLoading(false);
        }
    };

    // Loading state while verifying token
    if (verifying) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20 px-4">
                <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100 text-center">
                    <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Verificando seu link...</h2>
                    <p className="text-gray-500">Aguarde um momento enquanto validamos seu acesso.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20 px-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Lock className="w-8 h-8 text-blue-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Definir sua Senha</h1>
                    <p className="text-gray-500 mt-2">
                        Escolha uma senha segura para acessar sua conta FlowDrain.
                    </p>
                </div>

                {success ? (
                    <div className="bg-green-50 border border-green-100 rounded-2xl p-6 text-center">
                        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-green-800 mb-2">Senha Definida!</h3>
                        <p className="text-green-700 text-sm">
                            Sua senha foi atualizada com sucesso. Você será redirecionado para o login em instantes...
                        </p>
                    </div>
                ) : !sessionReady ? (
                    <div className="bg-red-50 border border-red-100 rounded-2xl p-6 text-center">
                        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-red-800 mb-2">Link Inválido</h3>
                        <p className="text-red-700 text-sm mb-4">
                            {error || 'Este link de redefinição de senha é inválido ou expirou. Solicite um novo link.'}
                        </p>
                        <button
                            onClick={() => window.location.href = 'https://app.gerenciaservicos.com.br/login'}
                            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-all"
                        >
                            Ir para o Login
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-start gap-3 text-red-700 text-sm">
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                <p>{error}</p>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nova Senha
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Confirmar Senha
                            </label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>Salvar Senha e Acessar <ArrowRight className="w-5 h-5" /></>
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};
