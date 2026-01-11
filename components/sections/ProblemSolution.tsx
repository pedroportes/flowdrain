import React from 'react';
import { X, CheckCircle2 } from 'lucide-react';

export const ProblemSolution: React.FC = () => {
    return (
        <section id="solucao" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-brand-dark mb-4">Sua operação não precisa ser um caos</h2>
                    <p className="text-gray-600">Veja como o FlowDrain transforma problemas em produtividade.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <span className="text-3xl">❌</span> O Jeito Antigo
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center text-red-500 shrink-0 mt-0.5"><X className="w-4 h-4" /></div>
                                <p className="text-gray-600">Blocos de papel e ordens de serviço ilegíveis.</p>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center text-red-500 shrink-0 mt-0.5"><X className="w-4 h-4" /></div>
                                <p className="text-gray-600">Descontrole sobre a localização dos técnicos.</p>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center text-red-500 shrink-0 mt-0.5"><X className="w-4 h-4" /></div>
                                <p className="text-gray-600">Falta de histórico de clientes e serviços.</p>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-xl shadow-brand-blue/5 border border-blue-50 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-bl-[100px]"></div>
                        <h3 className="text-2xl font-bold text-brand-blue mb-6 flex items-center gap-2">
                            <span className="text-3xl">✨</span> Com FlowDrain
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-brand-green/10 rounded-full flex items-center justify-center text-brand-green shrink-0 mt-0.5"><CheckCircle2 className="w-4 h-4" /></div>
                                <p className="text-gray-700 font-medium">App intuitivo para técnicos e gestores.</p>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-brand-green/10 rounded-full flex items-center justify-center text-brand-green shrink-0 mt-0.5"><CheckCircle2 className="w-4 h-4" /></div>
                                <p className="text-gray-700 font-medium">Painel financeiro em tempo real (veja o lucro na hora).</p>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-brand-green/10 rounded-full flex items-center justify-center text-brand-green shrink-0 mt-0.5"><CheckCircle2 className="w-4 h-4" /></div>
                                <p className="text-gray-700 font-medium">Histórico completo e agenda inteligente.</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};
