import React, { useEffect, useState } from 'react';
import { CheckCircle, ArrowRight, Loader2 } from 'lucide-react';

export const SuccessPage: React.FC = () => {
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        const redirect = setTimeout(() => {
            window.location.href = "https://app.gerenciaservicos.com.br/login";
        }, 5000);

        return () => {
            clearInterval(timer);
            clearTimeout(redirect);
        };
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20 px-4">
            <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center border border-gray-100">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                </div>

                <h1 className="text-3xl md:text-4xl font-extrabold text-brand-dark mb-4">
                    Pagamento Confirmado!
                </h1>

                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    Bem-vindo ao FlowDrain! Sua assinatura foi iniciada com sucesso.
                </p>

                <div className="flex items-center justify-center gap-2 text-brand-blue font-medium mb-8 bg-brand-blue/5 py-2 px-4 rounded-full mx-auto w-fit">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Redirecionando para o sistema em {countdown}s...
                </div>

                <div className="bg-brand-blue/5 border border-brand-blue/10 rounded-xl p-6 mb-8 text-left">
                    <h3 className="font-bold text-brand-blue mb-2">Próximos Passos:</h3>
                    <ul className="space-y-3 text-gray-600 text-sm">
                        <li className="flex items-start gap-2">
                            <span className="bg-brand-blue text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">1</span>
                            Verifique seu e-mail para confirmação de acesso.
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="bg-brand-blue text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">2</span>
                            Acesse o painel e complete o cadastro da sua empresa.
                        </li>
                    </ul>
                </div>

                <a
                    href="https://app.gerenciaservicos.com.br/login"
                    className="inline-flex items-center justify-center gap-2 bg-brand-green text-white text-lg px-8 py-4 rounded-xl font-bold hover:bg-brand-green-dark transition shadow-lg shadow-brand-green/20 w-full md:w-auto"
                >
                    Acessar Agora <ArrowRight className="w-5 h-5" />
                </a>
            </div>
        </div>
    );
};
