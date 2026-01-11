import React from 'react';
import { SEO } from '../components/SEO';


export const TermsPage: React.FC = () => {
    return (
        <div className="bg-gray-50 pt-32 pb-20">
            <SEO
                title="Termos de Uso"
                description="Leia os Termos de Uso do FlowDrain. Conheça seus direitos e deveres ao utilizar nossa plataforma de gestão para desentupidoras."
            />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl md:text-4xl font-extrabold text-brand-dark mb-8">Termos de Uso</h1>

                <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm space-y-8 text-gray-600 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-bold text-brand-dark mb-4">1. Aceitação dos Termos</h2>
                        <p>
                            Ao acessar e utilizar a plataforma **FlowDrain**, você concorda integralmente com estes Termos de Uso.
                            O FlowDrain é um software como serviço (SaaS) destinado à gestão operacional e financeira de desentupidoras e empresas de saneamento.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-brand-dark mb-4">2. Descrição do Serviço</h2>
                        <p>
                            O FlowDrain oferece ferramentas para:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-2">
                            <li>Gestão de Ordens de Serviço (OS) digitais com fotos e assinaturas.</li>
                            <li>Controle financeiro, incluindo fluxo de caixa e cálculo de comissões.</li>
                            <li>Aplicativo para técnicos (PWA) com funcionamento offline.</li>
                            <li>Emissão de relatórios e orçamentos em PDF com a identidade visual da sua empresa.</li>
                            <li>Suporte via Inteligência Artificial (Suporte Drain IA).</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-brand-dark mb-4">3. Responsabilidades do Usuário</h2>
                        <p>
                            Você é responsável por manter a confidencialidade de suas credenciais de acesso (login e senha).
                            Todo o conteúdo inserido na plataforma, incluindo dados de clientes finais, fotos de serviços e informações financeiras, é de propriedade e responsabilidade exclusiva da sua empresa.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-brand-dark mb-4">4. Planos e Pagamentos</h2>
                        <p>
                            O acesso ao FlowDrain é concedido mediante assinatura (mensal ou anual).
                            Os pagamentos são processados de forma segura via Stripe. O não pagamento pode resultar na suspensão temporária do acesso à plataforma até a regularização.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-brand-dark mb-4">5. Propriedade Intelectual</h2>
                        <p>
                            O software FlowDrain, sua marca, layout, código-fonte e funcionalidades são propriedade exclusiva da FlowDrain Tecnologia.
                            A assinatura concede uma licença de uso revogável, não exclusiva e intransferível, não implicando na transferência de propriedade do software.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-brand-dark mb-4">6. Limitação de Responsabilidade</h2>
                        <p>
                            O FlowDrain não se responsabiliza por lucros cessantes, perdas de dados decorrentes de mau uso da plataforma ou instabilidades causadas por terceiros (como falhas de internet ou provedores de nuvem).
                            Trabalhamos com backups diários e servidores de alta disponibilidade para minimizar riscos.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-brand-dark mb-4">7. Alterações nos Termos</h2>
                        <p>
                            Reservamo-nos o direito de atualizar estes termos periodicamente. Notificaremos os usuários sobre mudanças significativas através do e-mail cadastrado ou avisos na plataforma.
                        </p>
                    </section>

                    <div className="pt-8 border-t border-gray-100 text-sm">
                        <p>Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
                        <p className="mt-2">Dúvidas? Entre em contato pelo e-mail: pedrosportes@gmail.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
