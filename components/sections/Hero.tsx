import React from 'react';
import { Star, ArrowRight, Menu, User, Wifi, MapPin, Check, FileText } from 'lucide-react';
import { SIGNUP_URL } from '../constants';

export const Hero: React.FC = () => {
    return (
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-white">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-[80%] bg-gradient-to-b from-brand-gray to-white -z-10"></div>
            <div className="absolute right-0 top-20 w-1/2 h-1/2 bg-brand-blue/5 rounded-full blur-3xl -z-10"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                    <div className="mb-12 lg:mb-0 text-center lg:text-left">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-sm font-semibold mb-6 border border-brand-blue/20">
                            <Star className="w-4 h-4 mr-2" /> O App #1 para Desentupidoras
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-extrabold text-brand-dark tracking-tight leading-tight mb-6">
                            Gestão Inteligente com <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-cyan-400">FlowDrain</span>
                        </h1>
                        <p className="text-lg lg:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                            O software completo para organizar ordens de serviço, rastrear técnicos em tempo real e aumentar o faturamento da sua desentupidora.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <a href={SIGNUP_URL} className="bg-brand-green text-white text-lg px-8 py-4 rounded-xl font-bold hover:bg-brand-green-dark transition shadow-xl shadow-brand-green/20 flex items-center justify-center gap-2 transform hover:-translate-y-1">
                                Experimente Grátis Agora <ArrowRight className="w-5 h-5" />
                            </a>
                            <a href="#beneficios" className="bg-white text-brand-dark text-lg px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition border border-gray-200 shadow-sm">
                                Ver Funcionalidades
                            </a>
                        </div>
                        <div className="mt-8 flex items-center justify-center lg:justify-start gap-4 text-sm text-gray-500">
                            <div className="flex -space-x-2">
                                <img className="w-8 h-8 rounded-full border-2 border-white" src="https://picsum.photos/id/100/100" alt="User" />
                                <img className="w-8 h-8 rounded-full border-2 border-white" src="https://picsum.photos/id/101/100" alt="User" />
                                <img className="w-8 h-8 rounded-full border-2 border-white" src="https://picsum.photos/id/102/100" alt="User" />
                            </div>
                            <p>Mais de <span className="font-bold text-brand-dark">500 empresas</span> confiam.</p>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="relative mx-auto border-gray-800 bg-gray-800 border-[10px] rounded-[2.5rem] h-[640px] w-[320px] shadow-2xl flex flex-col overflow-hidden">
                            {/* Screen Content Mockup - Matching provided screenshot vibe */}
                            <div className="h-[32px] w-[3px] bg-gray-800 absolute -left-[13px] top-[72px] rounded-l-lg"></div>
                            <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[13px] top-[124px] rounded-l-lg"></div>
                            <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[13px] top-[142px] rounded-r-lg"></div>

                            <div className="rounded-[2rem] overflow-hidden w-full h-full bg-[#F8FAFC] relative flex flex-col">
                                {/* App Header */}
                                <div className="bg-gradient-to-r from-brand-blue to-cyan-500 p-6 pb-8 text-white rounded-b-3xl shadow-md z-10">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-lg font-bold">F</div>
                                        <div className="bg-white/20 p-2 rounded-full"><Menu className="w-5 h-5 text-white" /></div>
                                    </div>
                                    <p className="text-blue-100 text-sm">Bem-vindo de volta,</p>
                                    <h3 className="text-2xl font-bold">Olá, Fabiola</h3>
                                </div>

                                {/* Content */}
                                <div className="p-4 -mt-6 flex-1 overflow-y-auto space-y-4">
                                    {/* Status Card */}
                                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-brand-green-dark font-bold text-xs">
                                            <Check className="w-4 h-4" /> ASSINATURA ATIVA
                                        </div>
                                        <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">PLANO ESSENCIAL</div>
                                    </div>

                                    {/* Search Bar */}
                                    <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 text-gray-400 text-sm flex items-center gap-2">
                                        <span className="text-lg">🔍</span> Buscar por cliente...
                                    </div>

                                    {/* Main Action */}
                                    <button className="w-full bg-brand-green text-white py-4 rounded-xl shadow-lg shadow-brand-green/20 font-bold flex items-center justify-center gap-2">
                                        <span className="text-xl">+</span> Nova OS
                                    </button>

                                    {/* Active OS Card - Replicating screenshot */}
                                    <div className="bg-white p-5 rounded-2xl shadow-soft border border-gray-100">
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                                <span className="w-2 h-2 bg-blue-600 rounded-full"></span> EM DESLOCAMENTO
                                            </span>
                                            <span className="text-gray-300 text-xs">#e10382</span>
                                        </div>

                                        <div className="mb-4">
                                            <p className="text-xs text-gray-400 uppercase font-bold mb-1">Cliente</p>
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-700">
                                                    <User className="w-5 h-5" />
                                                </div>
                                                <p className="font-bold text-gray-800">GRACINHA Goncalves</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-2 mb-4">
                                            <button className="w-10 h-10 border border-blue-200 rounded-full flex items-center justify-center text-blue-500"><Wifi className="w-4 h-4" /></button>
                                            <button className="w-10 h-10 border border-green-200 rounded-full flex items-center justify-center text-green-500"><MapPin className="w-4 h-4" /></button>
                                        </div>

                                        <div className="border-t border-gray-100 pt-4 flex justify-between items-end">
                                            <div>
                                                <p className="text-xs text-gray-400 font-bold uppercase">Valor Total</p>
                                                <p className="text-2xl font-bold text-gray-800">R$ 539,34</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button className="p-2 bg-gray-50 rounded text-gray-400"><FileText className="w-4 h-4" /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Nav */}
                                <div className="bg-white border-t border-gray-100 p-4 flex justify-around text-gray-400">
                                    <div className="text-brand-green"><Menu className="w-6 h-6" /></div>
                                    <FileText className="w-6 h-6" />
                                    <div className="w-12 h-12 bg-brand-green -mt-8 rounded-full flex items-center justify-center text-white shadow-lg border-4 border-[#F8FAFC] text-2xl font-light">+</div>
                                    <User className="w-6 h-6" />
                                    <div className="w-6 h-6">⚙️</div>
                                </div>
                            </div>
                        </div>
                        {/* Abstract Elements */}
                        <div className="absolute -z-10 top-20 -left-10 w-64 h-64 bg-brand-blue/20 rounded-full blur-3xl"></div>
                        <div className="absolute -z-10 bottom-10 -right-10 w-64 h-64 bg-brand-green/20 rounded-full blur-3xl"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};
