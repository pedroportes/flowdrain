import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PublicLayout } from './components/layouts/PublicLayout';
import { captureAffiliateFromUrl } from './utils/affiliate';

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
import { ResetPasswordPage } from './pages/ResetPasswordPage';
// Admin Pages
import { AdminLogin } from './pages/admin/Login';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/Dashboard';
import { AffiliatesList } from './pages/admin/AffiliatesList';
import { AffiliateCreate } from './pages/admin/AffiliateCreate';
import { AffiliateDetails } from './pages/admin/AffiliateDetails';
// Affiliate Portal Pages
import { AfiliadoLogin } from './pages/afiliado/AfiliadoLogin';
import { AfiliadoLayout } from './pages/afiliado/AfiliadoLayout';
import { AfiliadoDashboard } from './pages/afiliado/AfiliadoDashboard';
import { AfiliadoPerfil } from './pages/afiliado/AfiliadoPerfil';

function App() {
  // Captura código de afiliado da URL (?ref=CODIGO) no primeiro load
  useEffect(() => { captureAffiliateFromUrl(); }, []);

  return (
    <Router>
      <Routes>
        {/* Public Routes with Header/Footer */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/solucao" element={<SolutionPage />} />
          <Route path="/beneficios" element={<BenefitsPage />} />
          <Route path="/funcionalidades" element={<FeaturesPage />} />
          <Route path="/planos" element={<PricingPage />} />
          <Route path="/termos" element={<TermsPage />} />
          <Route path="/privacidade" element={<PrivacyPage />} />
          <Route path="/sucesso" element={<SuccessPage />} />
          <Route path="/cancelado" element={<CancelPage />} />
          <Route path="/definir-senha" element={<ResetPasswordPage />} />
          <Route path="/update-password" element={<ResetPasswordPage />} />
        </Route >

        {/* Admin Routes - Login Isolated */}
        <Route path="/admin/login" element={< AdminLogin />} />

        {/* Admin Routes - Dashboard Layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="afiliados" element={<AffiliatesList />} />
          <Route path="afiliados/novo" element={<AffiliateCreate />} />
          <Route path="afiliados/:id" element={<AffiliateDetails />} />
        </Route>

        {/* Affiliate Portal - Login Isolated */}
        <Route path="/afiliado/login" element={<AfiliadoLogin />} />

        {/* Affiliate Portal - Dashboard Layout */}
        <Route path="/afiliado" element={<AfiliadoLayout />}>
          <Route index element={<AfiliadoDashboard />} />
          <Route path="perfil" element={<AfiliadoPerfil />} />
        </Route>
      </Routes >
    </Router >
  );
}

export default App;