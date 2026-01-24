import React from 'react';
import { X, CheckCircle2, TrendingDown, Zap } from 'lucide-react';

export const BenefitsComparison: React.FC = () => {
    return (
        <section className="py-24 bg-brand-dark overflow-hidden relative">
            {/* Background Orbs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-none">
                        O DIVISOR DE <span style={{ background: 'linear-gradient(to right, #22D3EE, #2563EB)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>ÁGUAS.</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium">
                        O amadorismo custa caro. Veja a diferença entre lutar sozinho e escalar com o FlowDrain.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {/* The Old Way */}
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[3rem] p-8 md:p-12 opacity-0 animate-reveal" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest mb-8">
                            ❌ O JEITO SOLITÁRIO (ANTIGO)
                        </div>

                        <div className="space-y-6">
                            {[
                                "Caos de papéis, blocos e ordens ilegíveis.",
                                "Técnicos 'sumidos' e rotas desorganizadas.",
                                "Diesel jogado fora com deslocamentos inúteis.",
                                "Esquecimento de cobrar serviços adicionais.",
                                "Dono preso no WhatsApp 24h por dia.",
                                "Lucro que evaporando em pequenos 'erros'."
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-4 text-gray-400">
                                    <X className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                                    <span className="font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* The FlowDrain Way */}
                    <div className="relative group opacity-0 animate-reveal" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
                        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-[3rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                        <div className="relative bg-[#0B0F1A] border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-widest mb-8">
                                ✨ O JEITO FLOWDRAIN (LÍDER)
                            </div>

                            <div className="space-y-6">
                                {[
                                    "Tudo no app: fotos, GPS e assinatura digital.",
                                    "Monitoramento de frotas e técnicos em tempo real.",
                                    "Rotas otimizadas = menos gasto com combustível.",
                                    "Faturamento automático: nenhuma OS fica de fora.",
                                    "Dono vira gestor e foca no crescimento.",
                                    "Lucratividade máxima e controle de estoque."
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-4 text-white">
                                        <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-1" />
                                        <span className="font-black italic uppercase tracking-tighter">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-12 flex justify-center">
                                <div className="flex items-center gap-3 p-4 bg-cyan-500/5 rounded-2xl border border-cyan-500/20">
                                    <TrendingDown className="w-6 h-6 text-cyan-400" />
                                    <span className="text-sm font-black text-cyan-400 uppercase tracking-tighter">REDUZA ATÉ 40% DOS GASTOS DE OPERAÇÃO</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
