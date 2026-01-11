import React from 'react';
import { Hero } from '../components/sections/Hero';
import { Testimonials } from '../components/sections/Testimonials';
import { HowItWorks } from '../components/sections/HowItWorks';
import { FinalCTA } from '../components/sections/FinalCTA';
import { SEO } from '../components/SEO';

export const HomePage: React.FC = () => {
    return (
        <div className="pt-20">
            <SEO
                title="SaaS para Desentupidoras e Saneamento"
                description="O FlowDrain é o sistema completo para gestão de desentupidoras. Controle financeiro, ordens de serviço digitais e aplicativo para técnicos."
            />
            <Hero />
            <HowItWorks />
            <Testimonials />
            <FinalCTA />
        </div>
    );
};
