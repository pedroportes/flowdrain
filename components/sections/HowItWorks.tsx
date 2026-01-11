import { FileText, DollarSign, Smartphone, FileCheck, Bot } from 'lucide-react';

export const HowItWorks: React.FC = () => {
    const features = [
        {
            title: "OS Digital",
            desc: "Ordens de serviço com fotos, checklist e assinatura digital.",
            icon: <FileText className="w-8 h-8 text-brand-blue" />
        },
        {
            title: "Financeiro",
            desc: "Controle total de entradas, saídas e adiantamentos.",
            icon: <DollarSign className="w-8 h-8 text-brand-blue" />
        },
        {
            title: "App do Técnico",
            desc: "Interface PWA otimizada, offline e intuitiva.",
            icon: <Smartphone className="w-8 h-8 text-brand-blue" />
        },
        {
            title: "Relatórios PDF",
            desc: "Emissão de documentos profissionais com sua logo.",
            icon: <FileCheck className="w-8 h-8 text-brand-blue" />
        },
        {
            title: "Suporte Drain IA",
            desc: "IA que auxilia no preenchimento e tira dúvidas técnicas.",
            icon: <Bot className="w-8 h-8 text-brand-blue" />
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-brand-dark">Funcionalidades de Elite</h2>
                    <p className="mt-4 text-gray-500 max-w-2xl mx-auto">Tudo o que sua desentupidora precisa para crescer com organização e lucratividade.</p>
                </div>

                <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
                    {features.map((feature, idx) => (
                        <div key={idx} className="relative group">
                            <div className="w-20 h-20 bg-brand-blue/5 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform group-hover:scale-110 duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-lg font-bold mb-2 text-brand-dark">{feature.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
