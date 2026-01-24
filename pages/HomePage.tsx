import React from 'react';
import { Hero } from '../components/sections/Hero';
import { ProblemSolution } from '../components/sections/ProblemSolution';
import { FeaturesDeepDive } from '../components/sections/FeaturesDeepDive';
import { Testimonials } from '../components/sections/Testimonials';
import { FinalCTA } from '../components/sections/FinalCTA';
import { SEO } from '../components/SEO';

export const HomePage: React.FC = () => {
    return (
        <div className="flex flex-col">
            <SEO
                title="SaaS para Desentupidoras e Saneamento"
                description="O FlowDrain é o sistema completo para gestão de desentupidoras. Controle financeiro, ordens de serviço digitais e aplicativo para técnicos."
            />
            <Hero />
            <div className="relative">
                <ProblemSolution />
                <div className="h-24 bg-gradient-to-b from-white to-gray-50"></div>
                <FeaturesDeepDive />
            </div>
            <Testimonials />
            <FinalCTA />
        </div>
    );
};
