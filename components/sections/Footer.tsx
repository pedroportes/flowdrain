import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-white border-t border-gray-100 text-gray-500 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2">
                    <Link to="/">
                        <img src="/logo-flowdrain.png" alt="FlowDrain Logo" className="h-24 w-auto transition duration-300 object-contain" />
                    </Link>
                </div>
                <div className="text-sm">
                    &copy; {new Date().getFullYear()} FlowDrain Tecnologia.
                </div>
                <div className="flex gap-6 text-sm">
                    <Link to="/termos" className="hover:text-brand-blue transition">Termos de Uso</Link>
                    <Link to="/privacidade" className="hover:text-brand-blue transition">Política de Privacidade</Link>
                </div>
            </div>
        </footer>
    );
};
