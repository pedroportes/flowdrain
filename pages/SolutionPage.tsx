import React from 'react';
import { ProblemSolution } from '../components/sections/ProblemSolution';
import { FinalCTA } from '../components/sections/FinalCTA';

export const SolutionPage: React.FC = () => {
    return (
        <div className="pt-20">
            <ProblemSolution />
            <FinalCTA />
        </div>
    );
};
