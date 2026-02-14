import React, { useEffect, useState } from 'react';
import { CheckCircle, ArrowRight, Loader2, AlertCircle, Mail } from 'lucide-react';

const SUPABASE_PROJECT_URL = 'https://dltqxfyrltgbudtzxzot.supabase.co';

export const SuccessPage: React.FC = () => {
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('Processando sua assinatura...');
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [emailSent, setEmailSent] = useState(false);

    useEffect(() => {
        const onboardUser = async () => {
            const params = new URLSearchParams(window.location.search);
            const sessionId = params.get('session_id');

            // Se não tiver session_id, apenas exibe sucesso genérico (comportamento antigo/fallback)
            if (!sessionId) {
                setStatus('success');
                setMessage('Bem-vindo ao FlowDrain! Sua assinatura foi iniciada.');
                return;
            }

            try {
                const response = await fetch(
                    `${SUPABASE_PROJECT_URL}/functions/v1/onboarding-pos-checkout`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ sessionId }),
                    }
                );

                const data = await response.json();
                console.log('[Onboarding] Response data:', data);

                if (response.ok && data.ok) {
                    setStatus('success');
                    setMessage('Sua conta foi criada e vinculada com sucesso!');
                    setUserEmail(data.email);
                    setEmailSent(data.debug?.emailSent || false);

                    // No auto-redirect: user needs to check email to define password
                } else {
                    console.error('Onboarding warning:', data);
                    // Mesmo se der erro (ex: usuário já existe), mostramos sucesso mas avisamos
                    setStatus('success');
                    setMessage('Pagamento confirmado! Acesse seu e-mail para definir sua senha.');
                }
            } catch (error: any) {
                console.error('Network error:', error);
                setStatus('success'); // Fallback para sucesso visual
                setMessage('Pagamento confirmado! Verifique seu e-mail.');
            }
        };

        onboardUser();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20 px-4">
            <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center border border-gray-100">

                {status === 'loading' && (
                    <>
                        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                            <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                            Finalizando configuração...
                        </h1>
                        <p className="text-gray-600 mb-6">
                            Estamos criando sua conta e configurando seu acesso.
                        </p>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                            <CheckCircle className="w-12 h-12 text-green-600" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-brand-dark mb-4">
                            Tudo pronto!
                        </h1>
                        <p className="text-lg text-gray-600 mb-6 font-medium">
                            {message}
                        </p>
                        {userEmail && (
                            <div className="bg-gray-50 rounded-2xl p-8 mb-8 border border-gray-100 text-center max-w-md mx-auto shadow-sm">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Mail className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">
                                    Verifique seu E-mail
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Enviamos um link de <strong>primeiro acesso</strong> para <span className="font-semibold text-gray-900">{userEmail}</span>.
                                    Clique no link para definir sua senha e liberar seu acesso.
                                </p>

                                <div className="space-y-3">
                                    <button
                                        onClick={() => window.open('https://mail.google.com/', '_blank')}
                                        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all shadow-md flex items-center justify-center gap-2"
                                    >
                                        Abrir E-mail <ArrowRight className="w-4 h-4" />
                                    </button>
                                    <p className="text-xs text-gray-400">
                                        Não recebeu? Verifique sua caixa de spam ou lixo eletrônico.
                                    </p>
                                </div>
                            </div>
                        )}

                        <a
                            href="https://app.gerenciaservicos.com.br/login"
                            className="inline-flex items-center justify-center gap-2 bg-brand-green text-white text-lg px-8 py-4 rounded-xl font-bold hover:bg-brand-green-dark transition shadow-lg w-full"
                        >
                            Ir para o Login <ArrowRight className="w-5 h-5" />
                        </a>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-8">
                            <AlertCircle className="w-12 h-12 text-red-600" />
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                            Houve um imprevisto
                        </h1>
                        <p className="text-lg text-gray-600 mb-6">
                            O pagamento foi processado, mas houve uma falha na ativação automática.
                            Por favor, contate o suporte.
                        </p>
                        <a
                            href="https://wa.me/5541984501037"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-gray-800 text-white text-lg px-8 py-4 rounded-xl font-bold hover:bg-gray-900 transition w-full md:w-auto"
                        >
                            Falar com Suporte
                        </a>
                    </>
                )}
            </div>
        </div>
    );
};
