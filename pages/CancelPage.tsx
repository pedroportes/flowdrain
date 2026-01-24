import React from 'react';
import { XCircle, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Footer } from '../components/sections/Footer';
import { Header } from '../components/sections/Header';

export const CancelPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-grow flex items-center justify-center py-20 px-4">
                <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center border border-gray-100">
                    <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8">
                        <XCircle className="w-12 h-12 text-red-500" />
                    </div>

                    <h1 className="text-3xl md:text-4xl font-extrabold text-brand-dark mb-4">
                        Algo deu errado?
                    </h1>

                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                        O processo de assinatura não foi concluído. Se você teve algum problema com o pagamento ou ficou com dúvida, nós podemos ajudar.
                    </p>

                    <div className="flex flex-col gap-4">
                        <Link
                            to="/planos"
                            className="bg-brand-blue text-white text-lg px-8 py-4 rounded-xl font-bold hover:bg-brand-blue-dark transition shadow-lg shadow-brand-blue/20"
                        >
                            Tentar Novamente
                        </Link>

                        <a
                            href="https://wa.me/5511999999999" // Substituir pelo número real se disponível
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 text-gray-600 hover:text-brand-green font-semibold transition py-2"
                        >
                            <MessageCircle className="w-5 h-5" /> Falar com Suporte no WhatsApp
                        </a>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};
