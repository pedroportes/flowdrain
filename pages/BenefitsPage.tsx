import React from 'react';
import { BenefitsHero } from '../components/sections/BenefitsHero';
import { BenefitsGrid } from '../components/sections/BenefitsGrid';
import { BenefitsComparison } from '../components/sections/BenefitsComparison';
import { FinalCTA } from '../components/sections/FinalCTA';
import { SEO } from '../components/SEO';

export const BenefitsPage: React.FC = () => {
    return (
        <div className="flex flex-col">
            <SEO
                title="Benefícios de Usar FlowDrain | Transforme sua Desentupidora"
                description="Entenda como o FlowDrain traz autoridade, segurança e lucro para sua desentupidora. Saia do amadorismo e vire uma referência."
            />
            <BenefitsHero />
            <BenefitsGrid />
            <BenefitsComparison />
            <div className="h-px bg-gray-100 max-w-7xl mx-auto w-full"></div>
            <FinalCTA />
        </div>
    );
};
