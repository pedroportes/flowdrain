import React from 'react';
import { Star, Zap, ShieldCheck, TrendingUp } from 'lucide-react';

export const BenefitsHero: React.FC = () => {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden bg-white">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-50/50 via-white to-white -z-10"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 text-[10px] font-black uppercase tracking-widest mb-8 opacity-0 animate-reveal">
                    <Star className="w-3 h-3 fill-cyan-500 shadow-sm" /> ELEVANDO O NÍVEL DO SEU NEGÓCIO
                </div>

                <h1 className="text-5xl lg:text-7xl font-black text-brand-dark tracking-tighter leading-[0.9] mb-8 opacity-0 animate-reveal" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
                    POR QUE O <span style={{ background: 'linear-gradient(to right, #22D3EE, #2563EB)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>FLOWDRAIN</span> É A <br className="hidden md:block" /> ESCOLHA DOS LÍDERES?
                </h1>

                <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-medium mb-12 opacity-0 animate-reveal" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
                    Não é apenas sobre software. É sobre transformar sua desentupidora comum em uma <span className="text-brand-dark font-black">referência de mercado</span> altamente lucrativa e organizada.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto opacity-0 animate-reveal" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
                    {[
                        { label: "+30% Lucratividade", icon: <TrendingUp className="w-5 h-5 text-cyan-500" /> },
                        { label: "Zero Papel", icon: <Zap className="w-5 h-5 text-cyan-500" /> },
                        { label: "GPS em Tempo Real", icon: <ShieldCheck className="w-5 h-5 text-cyan-500" /> },
                        { label: "Suporte Especializado", icon: <Star className="w-5 h-5 text-cyan-500" /> },
                    ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition duration-300">
                            {item.icon}
                            <span className="text-xs font-black text-brand-dark uppercase tracking-tighter">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
