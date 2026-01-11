import React from 'react';
import { Star } from 'lucide-react';

export const Testimonials: React.FC = () => {
    return (
        <section className="py-20 bg-brand-dark relative overflow-hidden">
            {/* Abstract Shapes */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/10 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-green/10 rounded-full blur-[100px]"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <h2 className="text-3xl font-bold text-center text-white mb-16">O que dizem nossos parceiros</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { name: "Carlos Ferreira", company: "HidroMax", quote: "O FlowDrain mudou a forma como enxergo meu lucro. Antes era tudo no caderno." },
                        { name: "Ana Souza", company: "Desentupidora Souza", quote: "A interface é muito limpa e fácil. Meus técnicos aprenderam a usar em 10 minutos." },
                        { name: "Pedro Alencar", company: "Alencar Serviços", quote: "O suporte é incrível e o sistema não trava. Recomendo para todos." }
                    ].map((t, idx) => (
                        <div key={idx} className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 text-white">
                            <div className="flex text-brand-green mb-4">
                                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                            </div>
                            <p className="text-gray-300 mb-6 italic">"{t.quote}"</p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-brand-blue to-brand-green rounded-full flex items-center justify-center font-bold text-sm">
                                    {t.name[0]}
                                </div>
                                <div>
                                    <p className="font-bold text-white text-sm">{t.name}</p>
                                    <p className="text-xs text-gray-400">{t.company}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
