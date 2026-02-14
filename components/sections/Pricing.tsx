import React, { useState } from 'react';
import { Check, Star, Zap, Truck, Shield } from 'lucide-react';
import { SIGNUP_URL } from '../constants';
import { startCheckout } from '../../services/checkoutService';
import { getStoredAffiliateCode } from '../../utils/affiliate';

export const Pricing: React.FC = () => {
    const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

    const plans = [
        {
            name: "Plano Solo",
            price: "59,90",
            checkoutUrl: "https://buy.stripe.com/dRm28qgPv3o78TN2xX5kk05",
            priceId: "",
            icon: <Star className="w-6 h-6 text-gray-400" />,
            features: [
                "1 Usuário (Apenas Dono)",
                "Sem acesso para técnicos",
                "Gestão de Clientes",
                "Ordens de Serviço Simples",
                "Suporte por Email"
            ],
            highlight: false
        },
        {
            name: "Essencial",
            price: "98,90",
            checkoutUrl: "https://buy.stripe.com/28EaEW1UBgaTfibdcB5kk06",
            priceId: "",
            icon: <Zap className="w-6 h-6 text-brand-blue" />,
            features: [
                "Até 3 técnicos",
                "Gestão Financeira Básica",
                "Relatórios Simples",
                "Suporte Horário Comercial"
            ],
            highlight: false
        },
        {
            name: "Pro Fluxo",
            price: "129,90",
            checkoutUrl: "https://buy.stripe.com/3cI3cuar75wf8TNgoN5kk07",
            priceId: "",
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
            checkoutUrl: "",
            priceId: "",
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
            priceId: "",
            icon: <Shield className="w-6 h-6 text-gray-500" />,
            features: [
                "Técnicos Ilimitados",
                "API Personalizada",
                "White Label (Sua Marca)",
                "Atendimento 24/7"
            ],
            highlight: false
        },
        {
            name: "Plano Teste",
            price: "1,99",
            checkoutUrl: "https://buy.stripe.com/aFa7sK2YF2k39XR2xX5kk04",
            priceId: "",
            icon: <Shield className="w-6 h-6 text-purple-500" />,
            features: [
                "Plano para testes",
                "Validação de comissão",
                "Acesso completo (demo)",
                "Cancelamento automático"
            ],
            highlight: false,
            tag: "TESTE"
        }
    ];

    /**
     * Lida com o clique no botão de assinar.
     * - AGORA: Prioriza links diretos (checkoutUrl) se existirem.
     * - Anexa client_reference_id manualmente para garantir o afiliado.
     * - Se não tiver link direto, usa o checkout dinâmico como fallback.
     */
    const handleSubscribe = async (plan: typeof plans[0]) => {
        const affiliateCode = getStoredAffiliateCode();
        console.log(`[Pricing] Iniciando assinatura: ${plan.name} (PriceID: ${plan.priceId}, Afiliado: ${affiliateCode || 'Nenhum'})`);

        // 1. Prioridade: Link Direto (Stripe Payment Link)
        if (plan.checkoutUrl) {
            try {
                const url = new URL(plan.checkoutUrl);
                if (affiliateCode) {
                    url.searchParams.set('client_reference_id', affiliateCode);
                }
                console.log('[Pricing] Redirecionando para Link Direto:', url.toString());
                window.location.href = url.toString();
                return;
            } catch (err) {
                console.warn('[Pricing] Erro ao processar checkoutUrl, usando fallback string logic:', err);
                // Fallback simples se a URL for inválida para o construtor URL
                let finalUrl = plan.checkoutUrl;
                if (affiliateCode) {
                    const separator = finalUrl.includes('?') ? '&' : '?';
                    finalUrl += `${separator}client_reference_id=${affiliateCode}`;
                }
                window.location.href = finalUrl;
                return;
            }
        }

        // 2. Fallback: Checkout Dinâmico via Edge Function
        const cleanPriceId = plan.priceId?.trim();
        const hasValidId = cleanPriceId && !cleanPriceId.includes('PLACEHOLDER');

        if (hasValidId) {
            setLoadingPlan(plan.name);
            try {
                const checkoutUrl = await startCheckout(cleanPriceId, affiliateCode);
                window.location.href = checkoutUrl;
            } catch (err: any) {
                console.error('[Pricing] Erro no checkout dinâmico:', err);
                alert('Erro ao iniciar checkout: ' + (err.message || 'Erro desconhecido'));
            } finally {
                setLoadingPlan(null);
            }
        } else {
            alert('Este plano não está disponível para contratação online no momento.');
        }
    };

    return (
        <section id="precos" className="py-20 bg-brand-gray">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">Escolha o Plano Ideal</h2>
                    <p className="text-gray-600 text-lg">Potencialize sua desentupidora com as ferramentas certas.</p>
                    {/* Debug visual para o usuário verificar se o afiliado foi capturado */}
                    {getStoredAffiliateCode() && (
                        <p className="mt-2 text-sm text-green-600 font-medium bg-green-50 inline-block px-3 py-1 rounded-full border border-green-200">
                            Afiliado ativo: {getStoredAffiliateCode()}
                        </p>
                    )}
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
                                <button
                                    onClick={() => handleSubscribe(plan)}
                                    disabled={loadingPlan === plan.name}
                                    className={`block w-full py-3 rounded-xl font-bold text-center transition-all disabled:opacity-60 disabled:cursor-wait ${plan.highlight
                                        ? 'bg-brand-blue text-white hover:bg-brand-blue-dark shadow-lg shadow-brand-blue/20'
                                        : 'bg-brand-dark text-white hover:bg-gray-800'
                                        }`}
                                >
                                    {loadingPlan === plan.name ? 'Redirecionando...' : 'Assinar Agora'}
                                </button>
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
