import React, { useState } from 'react';
import { Play, X } from 'lucide-react';

export const Testimonials: React.FC = () => {
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

    const videos = [
        {
            title: "Como saí do zero controle para a organização total",
            author: "Maria Silva - Desentupidora Silva",
            date: "Há 2 meses",
            videoId: "yGI78j7kIik",
        },
        {
            title: "Meus técnicos agora amam registrar o serviço",
            author: "João Paulo - JP Saneamento",
            date: "Há 1 mês",
            videoId: "C37uHR9ZwOs",
        },
        {
            title: "Parei de perder dinheiro com gastos de rua",
            author: "Carlos Eduardo - EsgotoLimp",
            date: "Há 3 semanas",
            videoId: "kFvxVcPjZdo",
        },
        {
            title: "O FlowDrain mudou minha vida de dono de empresa",
            author: "Ana Clara - Soluções Rápidas",
            date: "Há 1 semana",
            videoId: "BcJ7yexMdHs",
        }
    ];

    const openVideo = (videoId: string) => {
        setSelectedVideo(videoId);
        document.body.style.overflow = 'hidden';
    };

    const closeVideo = () => {
        setSelectedVideo(null);
        document.body.style.overflow = 'unset';
    };

    return (
        <section className="py-24 bg-[#0B0F1A] relative overflow-hidden">
            {/* Abstract Background with Gradient Orbs */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-blue/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen animate-pulse delay-1000"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20 opacity-0 animate-reveal">
                    <span className="inline-block py-1.5 px-4 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-black mb-6 uppercase tracking-[0.2em] text-[10px]">
                        CASES REAIS
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-[0.9]">
                        QUEM USA, <span style={{ background: 'linear-gradient(to right, #22D3EE, #2563EB)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>APROVA.</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-medium">
                        Veja como transformamos a gestão de diversas desentupidoras pelo Brasil com resultados reais.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {videos.map((video, idx) => (
                        <div
                            key={idx}
                            onClick={() => openVideo(video.videoId)}
                            className="group relative flex flex-col h-full cursor-pointer"
                        >
                            {/* Card Container */}
                            <div className="relative aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group-hover:border-cyan-400/50 transition-all duration-300 transform group-hover:-translate-y-2 bg-gray-900">

                                {/* YouTube Thumbnail */}
                                <img
                                    src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                                    alt={video.title}
                                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition duration-500 transform group-hover:scale-110"
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90"></div>

                                {/* Content */}
                                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                    {/* Play Button */}
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 scale-50 group-hover:scale-100">
                                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                                            <Play className="w-4 h-4 text-brand-blue ml-0.5 fill-brand-blue" />
                                        </div>
                                    </div>

                                    <div className="transform translate-y-2 group-hover:translate-y-0 transition duration-300">
                                        <p className="text-cyan-400 text-xs font-bold mb-2 uppercase tracking-wider flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                                            Sucesso Confirmado
                                        </p>
                                        <h3 className="text-lg font-bold text-white mb-2 leading-snug line-clamp-3 group-hover:text-cyan-400 transition-colors">
                                            "{video.title}"
                                        </h3>
                                        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/10">
                                            <div className="w-6 h-6 rounded-full bg-brand-blue flex items-center justify-center text-[10px] font-bold text-white">
                                                {video.author[0]}
                                            </div>
                                            <p className="text-gray-400 text-xs font-medium truncate">
                                                {video.author}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <a
                        href="https://www.youtube.com/@flowdrain"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 transition font-black border-b-2 pb-1 uppercase tracking-widest text-xs"
                        style={{ color: '#22D3EE', borderColor: 'rgba(34, 211, 238, 0.3)' }}
                    >
                        Ver mais casos de sucesso no YouTube <Play className="w-4 h-4" />
                    </a>
                </div>
            </div>

            {/* Video Modal */}
            {selectedVideo && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-sm"
                    onClick={closeVideo}
                >
                    <button
                        className="absolute top-6 right-6 p-2 text-white/50 hover:text-white transition group"
                        onClick={closeVideo}
                    >
                        <X className="w-8 h-8 group-hover:rotate-90 transition duration-300" />
                    </button>

                    <div
                        className="w-full max-w-lg aspect-[9/16] bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10"
                        onClick={(e) => e.stopPropagation()}
                    >
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
