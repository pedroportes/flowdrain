import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/sections/Header';
import { Footer } from './components/sections/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';

// Pages
import { HomePage } from './pages/HomePage';
import { SolutionPage } from './pages/SolutionPage';
import { BenefitsPage } from './pages/BenefitsPage';
import { FeaturesPage } from './pages/FeaturesPage';
import { PricingPage } from './pages/PricingPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';

import { SuccessPage } from './pages/SuccessPage';
import { CancelPage } from './pages/CancelPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white font-sans selection:bg-brand-blue selection:text-white flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/solucao" element={<SolutionPage />} />
            <Route path="/beneficios" element={<BenefitsPage />} />
            <Route path="/funcionalidades" element={<FeaturesPage />} />
            <Route path="/planos" element={<PricingPage />} />
            <Route path="/termos" element={<TermsPage />} />
            <Route path="/privacidade" element={<PrivacyPage />} />
            <Route path="/sucesso" element={<SuccessPage />} />
            <Route path="/cancelado" element={<CancelPage />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
}

export default App;