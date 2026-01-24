import React from 'react';
import { Star, ArrowRight, Check, Zap } from 'lucide-react';
import { SIGNUP_URL } from '../constants';
import { Link } from 'react-router-dom';

export const Hero: React.FC = () => {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-[80%] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-50/50 via-white to-white -z-10"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
                    <div className="mb-16 lg:mb-0 text-center lg:text-left opacity-0 animate-reveal">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 text-[10px] font-black uppercase tracking-widest mb-8">
                            <Star className="w-3 h-3 fill-cyan-500 shadow-sm" /> O APP #1 PARA DESENTUPIDORAS
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-black text-brand-dark tracking-tighter leading-[0.9] mb-8">
                            ASSUMA O <span style={{ background: 'linear-gradient(to right, #22D3EE, #2563EB)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>CONTROLE</span> TOTAL DA SUA EMPRESA.
                        </h1>
                        <p className="text-xl text-gray-500 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                            Abandone o papel e as planilhas. O <span className="font-black" style={{ color: '#2563EB' }}>FlowDrain</span> é o sistema operacional que transforma sua desentupidora em uma máquina de lucro organizada.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <a href={SIGNUP_URL} className="group bg-brand-dark text-white text-lg px-8 py-5 rounded-2xl font-black hover:bg-black transition shadow-2xl shadow-brand-dark/20 flex items-center justify-center gap-3 transform hover:-translate-y-1">
                                TESTAR GRÁTIS
                                <Zap className="w-5 h-5" style={{ color: '#22D3EE' }} />
                            </a>
                            <Link to="/solucao" className="bg-white text-brand-dark text-lg px-8 py-5 rounded-2xl font-black hover:bg-gray-50 transition border-2 border-gray-100 flex items-center justify-center gap-2">
                                VER POR DENTRO
                            </Link>
                        </div>

                        <div className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map(i => (
                                    <img key={i} className="w-10 h-10 rounded-full border-4 border-white shadow-sm" src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="Client" />
                                ))}
                            </div>
                            <div className="text-left">
                                <p className="font-black text-brand-dark leading-none">+500 EMPRESAS</p>
                                <p className="text-gray-400 text-xs font-bold tracking-wider uppercase">Confiando diariamente</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative opacity-0 translate-x-10 animate-reveal" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
                        <div className="relative group">
                            {/* Decorative Glow */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

                            {/* Main Image Container */}
                            <div className="relative bg-white border border-gray-100 rounded-[3rem] p-4 shadow-2xl overflow-hidden transition duration-500 group-hover:-translate-y-2">
                                <img
                                    src="/features/hero_dashboard.png"
                                    alt="FlowDrain Dashboard"
                                    className="w-full h-auto rounded-[2.5rem] shadow-sm transform group-hover:scale-105 transition duration-700"
                                />

                                {/* Floating Badge */}
                                <div className="absolute top-8 right-8 glass-card px-6 py-4 rounded-2xl border-l-4 border-cyan-500 animate-bounce">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 bg-brand-green rounded-full animate-ping"></div>
                                        <p className="text-xs font-black text-brand-dark uppercase tracking-tighter">SISTEMA ATIVO</p>
                                    </div>
                                </div>
                            </div>

                            {/* Abstract Shapes */}
                            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-cyan-400 opacity-10 rounded-full blur-3xl animate-pulse"></div>
                            <div className="absolute -top-10 -left-10 w-48 h-48 bg-blue-400 opacity-10 rounded-full blur-3xl animate-pulse delay-700"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
