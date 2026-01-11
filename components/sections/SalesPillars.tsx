import React from 'react';
import { BadgeCheck, Scale, Clock } from 'lucide-react';

export const SalesPillars: React.FC = () => {
    const pillars = [
        {
            title: "Autoridade",
            description: "Sua empresa deixa de ser \"o cara que desentope\" e vira uma \"empresa de engenharia de fluxo\".",
            icon: <BadgeCheck className="w-10 h-10 text-brand-purple" />,
            bg: "bg-purple-50"
        },
        {
            title: "Segurança Jurídica",
            description: "Fotos e assinaturas digitais salvam o dono de processos e calotes.",
            icon: <Scale className="w-10 h-10 text-brand-blue" />,
            bg: "bg-blue-50"
        },
        {
            title: "Tempo",
            description: "O dono para de responder WhatsApp de técnico e passa a olhar para o crescimento do negócio.",
            icon: <Clock className="w-10 h-10 text-brand-green" />,
            bg: "bg-green-50"
        }
    ];

    return (
        <section id="beneficios" className="py-20 bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-3 gap-8">
                    {pillars.map((pillar, idx) => (
                        <div key={idx} className={`${pillar.bg} p-8 rounded-3xl transition hover:-translate-y-2 hover:shadow-lg duration-300`}>
                            <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm mb-6">
                                {pillar.icon}
                            </div>
                            <h3 className="text-xl font-bold text-brand-dark mb-4">{pillar.title}</h3>
                            <p className="text-gray-700 font-medium leading-relaxed">
                                {pillar.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
