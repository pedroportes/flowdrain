import React from 'react';
import { Link } from 'react-router-dom';
import { X, CheckCircle2, AlertCircle, TrendingDown, ClipboardList, Zap, ShieldCheck, MapPin } from 'lucide-react';

export const ProblemSolution: React.FC = () => {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-32 opacity-0 animate-reveal">
                    <h2 className="text-4xl md:text-6xl font-black text-brand-dark mb-6 tracking-tighter leading-none">
                        O SISTEMA QUE <span className="text-gradient-cyan">VOCÊ</span> CONTROLA.
                    </h2>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium">
                        Pare de se adaptar ao software. O FlowDrain foi construído sobre a realidade do desentupidor.
                    </p>
                </div>

                {/* The Descent (The Chaos) */}
                <div className="relative mb-40">
                    <div className="absolute left-1/2 -top-20 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent to-red-200"></div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1 opacity-0 translate-y-10 animate-reveal" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
                            <div className="space-y-8">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 text-xs font-bold uppercase tracking-widest border border-red-100 italic">
                                    ❌ O Jeito Antigo
                                </div>
                                <h3 className="text-3xl md:text-5xl font-black text-brand-dark leading-tight tracking-tighter">
                                    POR QUE SUA OPERAÇÃO ESTÁ <span className="text-red-500">SANGRANDO?</span>
                                </h3>

                                <div className="space-y-6">
                                    <div className="flex gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-red-200 transition duration-300">
                                        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center shrink-0">
                                            <ClipboardList className="w-6 h-6 text-red-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800 mb-1">Caos no Papel</h4>
                                            <p className="text-sm text-gray-500 leading-relaxed italic">"Blocos de papel que somem, ordens ilegíveis e informações perdidas no fundo do carro."</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-red-200 transition duration-300">
                                        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center shrink-0">
                                            <MapPin className="w-6 h-6 text-red-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800 mb-1">Cegueira Logística</h4>
                                            <p className="text-sm text-gray-500 leading-relaxed italic">"Onde está o técnico? O serviço já acabou? Você só descobre no final do dia."</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-red-200 transition duration-300">
                                        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center shrink-0">
                                            <TrendingDown className="w-6 h-6 text-red-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800 mb-1">Lucro que Escorre</h4>
                                            <p className="text-sm text-gray-500 leading-relaxed italic">"Comissões erradas, faturamento que você esquece de cobrar e prejuízo escondido."</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="order-1 md:order-2 relative opacity-0 scale-95 animate-reveal" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
                            <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100 group">
                                <img
                                    src="/features/chaos.png"
                                    alt="Operational Chaos"
                                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition duration-700"
                                />
                                <div className="absolute inset-0 bg-red-900/10 group-hover:bg-transparent transition duration-700"></div>
                                <div className="absolute bottom-8 left-8 right-8 text-center bg-black/40 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
                                    <p className="text-white font-black text-xl tracking-tighter italic uppercase">O papel é o inimigo do lucro.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* The Ascension (The Solution) */}
                <div className="relative">
                    <div className="absolute left-1/2 -top-20 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-red-200 to-cyan-500"></div>

                    <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
                        <div className="relative opacity-0 scale-95 animate-reveal" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
                            <div className="relative aspect-square rounded-[4rem] overflow-hidden shadow-2xl group border-4 border-cyan-500/20">
                                <img
                                    src="/features/dashboard.png"
                                    alt="Digital Order"
                                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/60 to-transparent"></div>
                                <div className="absolute bottom-8 left-8 right-8 text-center bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/20">
                                    <p className="text-white font-black text-2xl tracking-tighter uppercase italic">O FLOW NO SEU BOLSO.</p>
                                </div>
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
                            </div>
                        </div>

                        <div className="opacity-0 translate-y-10 animate-reveal" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
                            <div className="space-y-8">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-50 text-cyan-600 text-xs font-bold uppercase tracking-widest border border-cyan-100 shadow-sm shadow-cyan-500/10">
                                    ✨ O Mundo FlowDrain
                                </div>
                                <h3 className="text-3xl md:text-5xl font-black text-brand-dark leading-tight tracking-tighter uppercase">
                                    FINALMENTE, O <span style={{ background: 'linear-gradient(to right, #22D3EE, #2563EB)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>LUCRO</span> APARECE.
                                </h3>

                                <div className="space-y-4">
                                    {[
                                        { title: "Dashboard em Tempo Real", desc: "Decisões baseadas em números, não em achismos.", icon: <Zap className="w-5 h-5" /> },
                                        { title: "Controle Geográfico Total", desc: "Saiba onde sua equipe está em um mapa interativo.", icon: <ShieldCheck className="w-5 h-5" /> },
                                        { title: "Automação Financeira", desc: "Prejuízo zero. Toda OS é cobrada e registrada.", icon: <CheckCircle2 className="w-5 h-5" /> }
                                    ].map((item, i) => (
                                        <div key={i} className="glass-card p-6 rounded-2xl flex items-start gap-4 hover:translate-x-2 transition duration-300">
                                            <div className="w-10 h-10 bg-cyan-500 text-white rounded-lg flex items-center justify-center shrink-0 shadow-lg shadow-cyan-500/20">
                                                {item.icon}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-800">{item.title}</h4>
                                                <p className="text-gray-500 text-sm font-medium">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-8">
                                    <Link
                                        to="/planos"
                                        className="group inline-flex items-center gap-3 bg-brand-dark text-white px-8 py-4 rounded-2xl font-black text-lg hover:bg-black transition shadow-2xl shadow-brand-dark/20"
                                    >
                                        QUERO ESTE CONTROLE
                                        <Zap className="w-5 h-5 text-cyan-400 group-hover:scale-125 transition duration-300" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
