import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { SIGNUP_URL } from '../constants';

export const FinalCTA: React.FC = () => {
    return (
        <section className="py-24 bg-gradient-to-br from-brand-blue-dark to-brand-blue text-white text-center">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-4xl lg:text-5xl font-extrabold mb-8 tracking-tight">Pronto para organizar sua empresa?</h2>
                <p className="text-xl text-blue-100 mb-10">Junte-se a quem já usa FlowDrain e veja a diferença no fim do mês.</p>
                <div className="flex flex-col items-center gap-4">
                    <a href={SIGNUP_URL} className="bg-white text-brand-blue text-xl px-12 py-5 rounded-full font-bold hover:scale-105 transition duration-300 shadow-2xl">
                        Criar Conta Grátis
                    </a>
                    <p className="text-sm text-blue-200 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> Sem cartão de crédito • Cancelamento a qualquer momento
                    </p>
                </div>
            </div>
        </section>
    );
};
