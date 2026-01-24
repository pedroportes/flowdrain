import React from 'react';
import { Check, Star, Zap, Truck, Shield } from 'lucide-react';
import { SIGNUP_URL } from '../constants';

export const Pricing: React.FC = () => {
    const plans = [
        {
            name: "Plano Inicial",
            price: "59,90",
            checkoutUrl: "https://buy.stripe.com/fZu00iczf3o70nhegF5kk00",
            icon: <Star className="w-6 h-6 text-gray-400" />,
            features: [
                "Até 2 técnicos",
                "Gestão de Clientes",
                "Ordens de Serviço Simples",
                "Suporte por Email"
            ],
            highlight: false
        },
        {
            name: "Pro Fluxo",
            price: "129,90",
            checkoutUrl: "https://buy.stripe.com/8x25kC9n3aQzb1Vc8x5kk01",
            icon: <Zap className="w-6 h-6 text-brand-blue" />,
            features: [
                "Até 5 técnicos",
                "Gestão Financeira Completa",
                "Relatórios Avançados",
                "Suporte Prioritário"
            ],
            highlight: true,
            tag: "MAIS POPULAR"
        },
        {
            name: "Operacional",
            price: "249,90",
            checkoutUrl: "https://buy.stripe.com/aFa7sK56N2k35HB0pP5kk02",
            icon: <Truck className="w-6 h-6 text-gray-500" />,
            features: [
                "Até 10 técnicos",
                "Gestão de Frotas",
                "Rastreamento em Tempo Real",
                "Gestor de Contas Dedicado"
            ],
            highlight: false
        },
        {
            name: "Prime Fleet",
            price: "499,90",
            checkoutUrl: "https://buy.stripe.com/7sY28q56N3o7fiba0p5kk03",
            icon: <Shield className="w-6 h-6 text-gray-500" />,
            features: [
                "Técnicos Ilimitados",
                "API Personalizada",
                "White Label (Sua Marca)",
                "Atendimento 24/7"
            ],
            highlight: false
        }
    ];

    return (
        <section id="precos" className="py-20 bg-brand-gray">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">Escolha o Plano Ideal</h2>
                    <p className="text-gray-600 text-lg">Potencialize sua desentupidora com as ferramentas certas.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
                    {plans.map((plan, idx) => (
                        <div
                            key={idx}
                            className={`relative bg-white p-8 rounded-2xl transition-all duration-300 ${plan.highlight
                                ? 'ring-2 ring-brand-blue shadow-xl scale-105 z-10'
                                : 'border border-gray-100 shadow-sm hover:shadow-md'
                                }`}
                        >
                            {plan.highlight && (
                                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-brand-blue text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap">
                                    {plan.tag}
                                </div>
                            )}

                            <div className="mb-6 bg-gray-50 w-12 h-12 rounded-xl flex items-center justify-center">
                                {plan.icon}
                            </div>

                            <h3 className="text-xl font-bold text-brand-dark mb-2">{plan.name}</h3>
                            <div className="flex items-baseline gap-1 mb-6">
                                <span className="text-sm text-gray-500">R$</span>
                                <span className="text-4xl font-extrabold text-brand-dark">{plan.price}</span>
                                <span className="text-gray-400 text-sm">/mês</span>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                                        <Check className={`w-5 h-5 shrink-0 ${plan.highlight ? 'text-brand-blue' : 'text-brand-green'}`} />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="flex flex-col gap-3 mt-auto">
                                <a
                                    href={plan.checkoutUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`block w-full py-3 rounded-xl font-bold text-center transition-all ${plan.highlight
                                        ? 'bg-brand-blue text-white hover:bg-brand-blue-dark shadow-lg shadow-brand-blue/20'
                                        : 'bg-brand-dark text-white hover:bg-gray-800'
                                        }`}
                                >
                                    Assinar Agora
                                </a>
                                <a
                                    href={SIGNUP_URL}
                                    className={`block w-full py-3 rounded-xl font-bold text-center transition-all border-2 ${plan.highlight
                                        ? 'border-brand-blue/30 text-brand-blue hover:bg-brand-blue/5'
                                        : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                        }`}
                                >
                                    Criar Conta Grátis
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
