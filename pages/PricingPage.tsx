import React from 'react';
import { Pricing } from '../components/sections/Pricing';
import { FinalCTA } from '../components/sections/FinalCTA';

export const PricingPage: React.FC = () => {
    return (
        <div className="pt-20">
            <Pricing />
            <FinalCTA />
        </div>
    );
};
