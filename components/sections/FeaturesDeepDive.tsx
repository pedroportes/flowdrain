import React from 'react';
import { LayoutDashboard, Users, FileText, DollarSign, Briefcase, Bot } from 'lucide-react';

export const FeaturesDeepDive: React.FC = () => {
    const features = [
        {
            title: "Controle Financeiro de Elite",
            functionality: "Visualize faturamento, ticket médio e performance da equipe em tempo real. O lucro da sua desentupidora não é mais um mistério.",
            copy: "Não gaste tempo procurando relatórios. O FlowDrain traz faturamento, contas a pagar e ticket médio em dashboards automáticos. Decisões instantâneas na palma da mão.",
            image: "/features/dashboard_real.png",
            icon: <DollarSign className="w-6 h-6 text-white" />,
            color: "from-blue-600 to-cyan-400",
            shadowColor: "shadow-blue-500/20"
        },
        {
            title: "Ordens de Serviço Profissionais",
            functionality: "Fluxo completo de chamados com registro de fotos (antes/depois) e status em tempo real.",
            copy: "Acabe com a confusão do papel. Seus técnicos registram tudo pelo app, com fotos obrigatórias e assinatura digital. Transmita confiança para o cliente com recibos digitais instantâneos.",
            image: "/features/os.png",
            icon: <FileText className="w-6 h-6 text-white" />,
            color: "from-emerald-600 to-teal-400",
            shadowColor: "shadow-emerald-500/20"
        },
        {
            title: "Controle Geográfico e GPS",
            functionality: "Gestão de despesas de campo e monitoramento da equipe em tempo real.",
            copy: "Sua margem de lucro protegida. Receba comprovantes de combustível e materiais direto dos técnicos. Saiba exatamente onde seu técnico está no mapa e otimize rotas para economizar diesel.",
            image: "/features/finance.png",
            icon: <LayoutDashboard className="w-6 h-6 text-white" />,
            color: "from-amber-500 to-orange-400",
            shadowColor: "shadow-amber-500/20"
        },
        {
            title: "CRM e Base de Clientes",
            functionality: "Controle total sobre o histórico de serviços e recorrência.",
            copy: "Sua carteira de clientes é seu maior ativo. Defina permissões granulares para seus técnicos e garanta que cada bueiro limpo se torne uma oportunidade de recorrência futura.",
            image: "/features/clients.png",
            icon: <Users className="w-6 h-6 text-white" />,
            color: "from-indigo-600 to-purple-500",
            shadowColor: "shadow-indigo-500/20"
        },
        {
            title: "Gestão de Técnicos e Frotas",
            functionality: "Assinaturas digitais, checklists de veículos e perfis detalhados.",
            copy: "Profissionalismo de ponta a ponta. Gerencie sua equipe, controle frotas e tenha assinaturas validadas em cada serviço. Um time organizado é um time que produz mais lucro.",
            image: "/features/team.png",
            icon: <Briefcase className="w-6 h-6 text-white" />,
            color: "from-rose-600 to-red-400",
            shadowColor: "shadow-rose-500/20"
        }
    ];

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-32 opacity-0 animate-reveal">
                    <h2 className="text-4xl md:text-6xl font-black text-brand-dark mb-6 tracking-tighter leading-none uppercase">
                        FUNCIONALIDADES <span className="text-gradient-cyan">PREMIUM</span>
                    </h2>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium">
                        Tudo o que sua desentupidora precisa para faturar mais com menos dor de cabeça.
                    </p>
                </div>

                <div className="space-y-40">
                    {features.map((feature, idx) => (
                        <div key={idx} className={`relative flex flex-col ${idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 md:gap-24 items-center`}>
                            {/* Device Frame */}
                            <div className="w-full md:w-3/5 group opacity-0 translate-y-10 animate-reveal" style={{ animationDelay: `${idx * 150}ms`, animationFillMode: 'forwards' }}>
                                <div className="relative">
                                    <div className={`absolute -inset-4 bg-gradient-to-br ${feature.color} opacity-[0.03] blur-3xl rounded-full transform group-hover:scale-110 transition duration-1000`}></div>
                                    <div className={`relative bg-gray-900 rounded-[2.5rem] p-3 shadow-2xl ${feature.shadowColor} border-4 border-gray-800 transition duration-500 group-hover:-translate-y-2`}>
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-800 rounded-b-2xl z-20"></div>
                                        <div className="relative aspect-video bg-white rounded-[2rem] overflow-hidden">
                                            <img
                                                src={feature.image}
                                                alt={feature.title}
                                                className="w-full h-full object-cover object-top transition duration-700 group-hover:scale-105"
                                            />
                                        </div>
                                    </div>
                                    <div className={`absolute -bottom-6 -right-6 md:-right-10 w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl shadow-xl flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition duration-500 z-30`}>
                                        {feature.icon}
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="w-full md:w-2/5 z-40">
                                <div className="space-y-6">
                                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-600 text-xs font-black uppercase tracking-widest`}>
                                        {feature.functionality.split(' ')[0]}
                                    </div>
                                    <h3 className="text-3xl md:text-5xl font-black text-brand-dark leading-[0.9] tracking-tighter uppercase italic">
                                        {feature.title.includes("Financeiro") ? (
                                            <>CONTROLE <span style={{ background: 'linear-gradient(to right, #22D3EE, #2563EB)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>FINANCEIRO</span></>
                                        ) : feature.title}
                                    </h3>
                                    <div className="glass-card p-6 rounded-2xl border-l-8 border-cyan-500">
                                        <p className="text-gray-600 font-medium leading-relaxed">
                                            {feature.copy}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm font-black text-gray-400 uppercase tracking-tighter">
                                        <span className="w-12 h-px bg-gray-200"></span>
                                        {feature.functionality}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
