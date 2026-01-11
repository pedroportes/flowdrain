import React from 'react';
import { LayoutDashboard, Users, FileText, DollarSign, Briefcase } from 'lucide-react';

export const FeaturesDeepDive: React.FC = () => {
    const features = [
        {
            title: "Dashboard (Painel de Controle)",
            functionality: "Visão geral em tempo real da saúde da empresa, mostrando serviços agendados, técnicos ativos e faturamento do dia.",
            copy: "Sua empresa na palma da mão. Pare de tentar adivinhar quanto vai ganhar no final do mês. Tenha um raio-x completo da sua operação em segundos e tome decisões baseadas em lucros reais, não em suposições.",
            icon: <LayoutDashboard className="w-8 h-8 text-white" />,
            color: "bg-blue-500"
        },
        {
            title: "Clientes (Base de Ativos)",
            functionality: "Gerenciamento completo de histórico, endereços e contatos, com foco em identificar clientes recorrentes.",
            copy: "Transforme atendimentos avulsos em contratos de recorrência. Conheça o histórico de cada bueiro ou caixa de gordura que você limpou e antecipe-se à necessidade do cliente, garantindo faturamento o ano todo.",
            icon: <Users className="w-8 h-8 text-white" />,
            color: "bg-purple-500"
        },
        {
            title: "Ordens de Serviço (O Coração)",
            functionality: "Criação e acompanhamento de chamados com checklist de fotos (antes/depois) e assinatura digital.",
            copy: "Adeus ao papel e à caneta. Envie orçamentos profissionais via WhatsApp em segundos e proteja-se contra reclamações com o registro fotográfico obrigatório. Profissionalismo que gera confiança e fecha orçamentos mais caros.",
            icon: <FileText className="w-8 h-8 text-white" />,
            color: "bg-green-500"
        },
        {
            title: "Financeiro (Lucratividade Real)",
            functionality: "Controle de entradas, fluxo de caixa e gestão de despesas enviadas pelos técnicos na rua.",
            copy: "Controle cada centavo que entra e sai. Monitore os gastos de combustível e materiais direto pelo app dos técnicos. Saiba exatamente qual serviço deu lucro e onde você está perdendo dinheiro.",
            icon: <DollarSign className="w-8 h-8 text-white" />,
            color: "bg-yellow-500"
        },
        {
            title: "Equipe (Gestão de Performance)",
            functionality: "Cadastro de técnicos, controle de veículos (frotas) e cálculo automático de comissões.",
            copy: "Sua equipe motivada e sob controle. Calcule comissões sem erros e saiba quem são seus melhores técnicos. Gerencie sua frota e garanta que todos os colaboradores estejam alinhados com a meta da empresa.",
            icon: <Briefcase className="w-8 h-8 text-white" />,
            color: "bg-red-500"
        }
    ];

    return (
        <section id="funcionalidades" className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-brand-dark mb-6">
                        O Sistema Operacional da sua Desentupidora
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Cada módulo foi pensado para resolver uma dor específica do seu dia a dia.
                    </p>
                </div>

                <div className="space-y-24">
                    {features.map((feature, idx) => (
                        <div key={idx} className={`flex flex-col ${idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center`}>
                            {/* Visual Side (Mockup Placeholder/Icon) */}
                            <div className="w-full md:w-1/2 relative group">
                                <div className={`absolute inset-0 ${feature.color} opacity-10 blur-3xl rounded-full transform group-hover:scale-110 transition duration-700`}></div>
                                <div className="relative bg-gray-50 border border-gray-100 rounded-3xl p-8 h-80 flex items-center justify-center shadow-lg hover:shadow-xl transition duration-500">
                                    <div className={`w-24 h-24 ${feature.color} rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:rotate-12 transition duration-500`}>
                                        {feature.icon}
                                    </div>
                                </div>
                            </div>

                            {/* Content Side */}
                            <div className="w-full md:w-1/2">
                                <h3 className="text-2xl md:text-3xl font-bold text-brand-dark mb-4 flex items-center gap-3">
                                    <span className={`w-3 h-3 rounded-full ${feature.color}`}></span>
                                    {feature.title}
                                </h3>
                                <div className="mb-6 p-4 bg-gray-50 rounded-xl border-l-4 border-gray-200">
                                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Funcionalidade</p>
                                    <p className="text-gray-700">{feature.functionality}</p>
                                </div>
                                <div>
                                    <p className="text-lg text-gray-600 leading-relaxed italic border-l-4 border-brand-blue pl-4">
                                        "{feature.copy}"
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
