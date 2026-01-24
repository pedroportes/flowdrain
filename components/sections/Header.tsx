import React from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { LOGIN_URL, SIGNUP_URL } from '../constants';

export const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path ? "text-brand-blue font-bold" : "text-gray-600 hover:text-brand-blue font-medium";
    };

    return (
        <nav className="fixed w-full z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-32 items-center">
                    <Link to="/" className="flex items-center gap-2">
                        <img src="/logo-flowdrain.png" alt="FlowDrain Logo" className="h-28 w-auto object-contain" />
                    </Link>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/solucao" className={`transition ${isActive('/solucao')}`}>Solução</Link>
                        <Link to="/beneficios" className={`transition ${isActive('/beneficios')}`}>Benefícios</Link>
                        <Link to="/funcionalidades" className={`transition ${isActive('/funcionalidades')}`}>Funcionalidades</Link>
                        <Link to="/planos" className={`transition ${isActive('/planos')}`}>Planos</Link>
                        <a href={LOGIN_URL} className="text-brand-blue hover:text-brand-blue-dark font-semibold transition">Entrar</a>
                        <a href={SIGNUP_URL} className="bg-brand-green text-white px-6 py-2.5 rounded-full font-bold hover:bg-brand-green-dark transition shadow-lg shadow-brand-green/20">
                            Criar Conta
                        </a>
                    </div>

                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-brand-dark">
                            {isMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden bg-white border-b border-gray-100">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/solucao" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-600 hover:text-brand-blue">Solução</Link>
                        <Link to="/beneficios" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-600 hover:text-brand-blue">Benefícios</Link>
                        <Link to="/funcionalidades" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-600 hover:text-brand-blue">Funcionalidades</Link>
                        <Link to="/planos" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-600 hover:text-brand-blue">Planos</Link>
                        <a href={LOGIN_URL} className="block px-3 py-2 text-brand-blue font-bold">Entrar</a>
                        <a href={SIGNUP_URL} className="block w-full text-center mt-4 bg-brand-green text-white px-5 py-3 rounded-lg font-bold">
                            Criar Conta
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
};
