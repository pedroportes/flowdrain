import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../sections/Header';
import { Footer } from '../sections/Footer';
import { WhatsAppButton } from '../WhatsAppButton';

export function PublicLayout() {
    return (
        <div className="min-h-screen bg-white font-sans selection:bg-brand-blue selection:text-white flex flex-col">
            <Header />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
            <WhatsAppButton />
        </div>
    );
}
