import React from 'react';
import { FileText, MapPin, DollarSign, Calendar } from 'lucide-react';

export const Benefits: React.FC = () => {
    const benefits = [
        {
            icon: <FileText className="w-6 h-6 text-brand-blue" />,
            title: "OS Digital",
            desc: "Adeus papelada. Tudo digital com fotos e assinaturas."
        },
        {
            icon: <MapPin className="w-6 h-6 text-brand-blue" />,
            title: "GPS em Tempo Real",
            desc: "Saiba exatamente onde sua equipe está e otimize rotas."
        },
        {
            icon: <DollarSign className="w-6 h-6 text-brand-blue" />,
            title: "Gestão Financeira",
            desc: "Fluxo de caixa, comissões e despesas em um só lugar."
        },
        {
            icon: <Calendar className="w-6 h-6 text-brand-blue" />,
            title: "Agendamento Fácil",
            desc: "Organize a agenda dos técnicos com arrastar e soltar."
        }
    ];

    return (
        <section id="beneficios" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-brand-green font-bold text-sm tracking-wider uppercase mb-2 block">Recursos Principais</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">Tudo o que você precisa</h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((item, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-brand-blue/5 transition duration-300 group">
                            <div className="w-14 h-14 bg-brand-blue/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
                                {React.cloneElement(item.icon as React.ReactElement<any>, { className: "w-6 h-6 transition-colors duration-300 group-hover:text-white" })}
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-brand-dark">{item.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
