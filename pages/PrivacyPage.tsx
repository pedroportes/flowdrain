import React from 'react';
import { SEO } from '../components/SEO';

export const PrivacyPage: React.FC = () => {
    return (
        <div className="bg-gray-50 pt-32 pb-20">
            <SEO
                title="Política de Privacidade"
                description="Entenda como a FlowDrain coleta, usa e protege seus dados. Compromisso com a LGPD e segurança da informação."
            />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl md:text-4xl font-extrabold text-brand-dark mb-8">Política de Privacidade</h1>

                <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm space-y-8 text-gray-600 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-bold text-brand-dark mb-4">1. Coleta de Dados</h2>
                        <p>
                            A **FlowDrain** coleta informações essenciais para o funcionamento do SaaS, incluindo:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-2">
                            <li>Dados de cadastro da empresa (CNPJ, endereço, contatos).</li>
                            <li>Dados dos usuários (Nome, e-mail, função).</li>
                            <li>Dados operacionais inseridos no sistema (Ordens de Serviço, clientes finais, financeiro).</li>
                            <li>Logs de acesso e dados técnicos para segurança e auditoria.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-brand-dark mb-4">2. Uso das Informações</h2>
                        <p>
                            Utilizamos seus dados exclusivamente para:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-2">
                            <li>Prover o serviço contratado (gestão de desentupidoras).</li>
                            <li>Processar pagamentos via Stripe.</li>
                            <li>Melhorar a plataforma através de análise de uso (dados anonimizados).</li>
                            <li>Enviar comunicações importantes sobre manutenção ou atualizações.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-brand-dark mb-4">3. Proteção e Segurança</h2>
                        <p>
                            Adotamos práticas robustas de segurança, incluindo criptografia SSL em todas as comunicações, armazenamento seguro em nuvem e backups diários.
                            O acesso aos dados é restrito a funcionários autorizados que necessitam das informações para suporte técnico.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-brand-dark mb-4">4. Compartilhamento de Dados</h2>
                        <p>
                            A FlowDrain **não vende** seus dados. O compartilhamento ocorre apenas com:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-2">
                            <li>Processadores de pagamento (Stripe) para efetuar cobranças.</li>
                            <li>Autoridades judiciais, se legalmente exigido.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-brand-dark mb-4">5. Seus Direitos (LGPD)</h2>
                        <p>
                            Conforme a Lei Geral de Proteção de Dados (LGPD), você tem direito a:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-2">
                            <li>Solicitar cópia dos seus dados armazenados.</li>
                            <li>Corrigir dados incompletos ou errados.</li>
                            <li>Solicitar a exclusão de dados (quando não necessários para fins legais).</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-brand-dark mb-4">6. Cookies</h2>
                        <p>
                            Utilizamos cookies essenciais para manter sua sessão ativa e segura. Não utilizamos cookies de rastreamento publicitário de terceiros dentro da plataforma operacional.
                        </p>
                    </section>

                    <div className="pt-8 border-t border-gray-100 text-sm">
                        <p>Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
                        <p className="mt-2">Encarregado de Dados (DPO): Entre em contato pelo e-mail: pedrosportes@gmail.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
