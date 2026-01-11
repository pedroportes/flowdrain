import React from 'react';
import { FeaturesDeepDive } from '../components/sections/FeaturesDeepDive';
import { FinalCTA } from '../components/sections/FinalCTA';

export const FeaturesPage: React.FC = () => {
    return (
        <div className="pt-20">
            <FeaturesDeepDive />
            <FinalCTA />
        </div>
    );
};
