import React, { useState } from 'react';
import { BadgeCheck, Scale, Clock, TrendingUp, Users, FileText, Play, X } from 'lucide-react';

export const BenefitsGrid: React.FC = () => {
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

    const pillars = [
        {
            title: "Autoridade Imbatível",
            description: "Sua empresa deixa de ser 'o cara que desentope' e vira uma referência em engenharia de fluxo. Use tecnologia para passar confiança imediata ao fechar orçamentos maiores.",
            icon: <BadgeCheck className="w-10 h-10 text-cyan-500" />,
            color: "from-cyan-500/10 to-blue-500/10",
            borderColor: "border-cyan-500/20",
            videoTitle: "Ver Case de Autoridade",
            videoId: "institutional" // Placeholder id
        },
        {
            title: "Segurança Jurídica",
            description: "Proteja-se contra processos e calotes com registros fotográficos e assinaturas digitais feitos na hora. Se o cliente reclamar, você tem a prova do antes e depois no sistema.",
            icon: <Scale className="w-10 h-10 text-blue-600" />,
            color: "from-blue-600/10 to-indigo-600/10",
            borderColor: "border-blue-600/20",
        },
        {
            title: "Liberdade de Tempo",
            description: "O dono para de ser o 'suporte 24h' dos técnicos no WhatsApp e passa a focar na estratégia. Ganhe seu tempo de volta para o que realmente importa.",
            icon: <Clock className="w-10 h-10 text-emerald-500" />,
            color: "from-emerald-500/10 to-teal-500/10",
            borderColor: "border-emerald-500/20",
            videoTitle: "Case de Organização",
            videoId: "yGI78j7kIik"
        },
        {
            title: "Lucratividade Real",
            description: "Chega de perder dinheiro com diesel e materiais 'esquecidos'. Controle cada centavo por veículo e saiba exatamente qual equipe dá mais lucro no fim do mês.",
            icon: <TrendingUp className="w-10 h-10 text-amber-500" />,
            color: "from-amber-500/10 to-orange-500/10",
            borderColor: "border-amber-500/20",
        },
        {
            title: "Equipe de Alta Performance",
            description: "O técnico trabalha mais feliz com a vida facilitada pelo GPS e comissões automáticas. Reduza a rotatividade e tenha os melhores com você.",
            icon: <Users className="w-10 h-10 text-rose-500" />,
            color: "from-rose-500/10 to-red-500/10",
            borderColor: "border-rose-500/20",
            videoTitle: "Ver Case do Técnico",
            videoId: "C37uHR9ZwOs"
        },
        {
            title: "Faturamento Sem Burocracia",
            description: "Emita notas fiscais (NFS-e) e recibos em segundos. Sem lutar com sites de prefeituras ou sistemas complexos. Tudo integrado no seu fluxo de serviço.",
            icon: <FileText className="w-10 h-10 text-brand-dark" />,
            color: "from-gray-900/10 to-brand-dark/10",
            borderColor: "border-gray-900/20",
        }
    ];

    const openVideo = (videoId: string) => {
        if (!videoId || videoId === 'institutional') return;
        setSelectedVideo(videoId);
        document.body.style.overflow = 'hidden';
    };

    return (
        <section className="py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-3 gap-8">
                    {pillars.map((pillar, idx) => (
                        <div
                            key={idx}
                            className={`group relative p-8 rounded-[2.5rem] bg-gradient-to-br ${pillar.color} border-2 ${pillar.borderColor} transition duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/10 opacity-0 animate-reveal`}
                            style={{ animationDelay: `${idx * 100}ms`, animationFillMode: 'forwards' }}
                        >
                            <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm mb-8 transition duration-500 group-hover:scale-110 group-hover:rotate-3">
                                {pillar.icon}
                            </div>

                            <h3 className="text-2xl font-black text-brand-dark mb-4 tracking-tighter uppercase italic">{pillar.title}</h3>

                            <p className="text-gray-600 font-medium leading-relaxed mb-8">
                                {pillar.description}
                            </p>

                            {pillar.videoId && pillar.videoId !== 'institutional' && (
                                <button
                                    onClick={() => openVideo(pillar.videoId!)}
                                    className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-dark hover:text-cyan-600 transition"
                                >
                                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                                        <Play className="w-3 h-3 fill-current" />
                                    </div>
                                    {pillar.videoTitle}
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Video Modal */}
            {selectedVideo && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-sm"
                    onClick={() => { setSelectedVideo(null); document.body.style.overflow = 'unset'; }}
                >
                    <button className="absolute top-6 right-6 text-white"><X className="w-8 h-8" /></button>
                    <div className="w-full max-w-lg aspect-[9/16] bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10" onClick={(e) => e.stopPropagation()}>
                        <iframe
                            src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="w-full h-full"
                        ></iframe>
                    </div>
                </div>
            )}
        </section>
    );
};
