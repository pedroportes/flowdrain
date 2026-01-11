import React from 'react';
import { SalesPillars } from '../components/sections/SalesPillars';
import { FinalCTA } from '../components/sections/FinalCTA';

export const BenefitsPage: React.FC = () => {
    return (
        <div className="pt-20">
            <div className="bg-brand-gray py-12 px-4 text-center">
                <h1 className="text-4xl font-bold text-brand-dark">Por que escolher o FlowDrain?</h1>
            </div>
            <SalesPillars />
            <FinalCTA />
        </div>
    );
};
