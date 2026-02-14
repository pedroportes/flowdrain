import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { afiliadosService, Afiliado } from '../../services/afiliadosService';

interface AffiliateFormProps {
    initialData?: Afiliado;
    isEditing?: boolean;
}

export function AffiliateForm({ initialData, isEditing = false }: AffiliateFormProps) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        status: 'ativo' as 'ativo' | 'inativo' | 'bloqueado',
        tipo_comissao: 'unica' as 'unica' | 'recorrente',
        percentual_comissao: 100,
        codigo_afiliado: '',
        pix_tipo: 'cpf',
        pix_chave: '',
    });

    const [commissionMode, setCommissionMode] = useState<'first_month' | 'recurring' | 'custom'>('first_month');

    useEffect(() => {
        if (initialData) {
            setFormData({
                nome: initialData.nome || '',
                email: initialData.email || '',
                telefone: initialData.telefone || '',
                status: initialData.status || 'ativo',
                tipo_comissao: initialData.tipo_comissao || 'unica',
                percentual_comissao: initialData.percentual_comissao || 10,
                codigo_afiliado: initialData.codigo_afiliado || '',
                pix_tipo: initialData.pix_tipo || 'cpf',
                pix_chave: initialData.pix_chave || '',
            });
            if (initialData.tipo_comissao === 'unica' && initialData.percentual_comissao === 100) {
                setCommissionMode('first_month');
            } else if (initialData.tipo_comissao === 'recorrente') {
                setCommissionMode('recurring');
            } else {
                setCommissionMode('custom');
            }
        }
    }, [initialData]);

    const handleCommissionModeChange = (mode: 'first_month' | 'recurring' | 'custom') => {
        setCommissionMode(mode);
        if (mode === 'first_month') {
            setFormData(prev => ({ ...prev, tipo_comissao: 'unica' as const, percentual_comissao: 100 }));
        } else if (mode === 'recurring') {
            setFormData(prev => ({ ...prev, tipo_comissao: 'recorrente' as const, percentual_comissao: 20 }));
        } else {
            setFormData(prev => ({ ...prev, tipo_comissao: 'unica' as const, percentual_comissao: 10 }));
        }
    };

    const generateCode = () => {
        const baseName = formData.nome?.trim();
        if (!baseName) {
            alert('Preencha o nome primeiro para gerar o código.');
            return;
        }
        const cleanName = baseName.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 6);
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        const code = `${cleanName}${random}`;
        setFormData(prev => ({ ...prev, codigo_afiliado: code }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const code = formData.codigo_afiliado || `${formData.nome.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 6)}${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
            const link = `https://flowdrain.gerenciaservicos.com.br/?ref=${code}`;

            const payload = {
                nome: formData.nome,
                email: formData.email,
                telefone: formData.telefone || null,
                status: formData.status,
                tipo_comissao: formData.tipo_comissao,
                percentual_comissao: formData.percentual_comissao,
                codigo_afiliado: code,
                link_afiliado: link,
                pix_tipo: formData.pix_tipo || null,
                pix_chave: formData.pix_chave || null,
            };

            if (isEditing && initialData?.id) {
                await afiliadosService.updateAfiliado(initialData.id, payload);
                alert('Afiliado atualizado com sucesso!');
            } else {
                await afiliadosService.createAfiliado(payload as any);
                alert('Afiliado criado com sucesso!');
                navigate('/admin/afiliados');
            }
        } catch (error: any) {
            console.error('Erro ao salvar:', error);
            alert('Erro ao salvar afiliado: ' + (error?.message || 'Verifique os dados.'));
        } finally {
            setLoading(false);
        }
    };

    const inputClass = "mt-1 block w-full rounded-lg border border-gray-400 bg-white text-gray-900 px-3 py-2.5 shadow-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 placeholder:text-gray-400";
    const selectClass = "mt-1 block w-full rounded-lg border border-gray-400 bg-white text-gray-900 px-3 py-2.5 shadow-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600";
    const labelClass = "block text-sm font-semibold text-gray-800";

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Dados Pessoais */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
                    <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-3">Dados Pessoais</h3>

                    <div>
                        <label className={labelClass}>Nome *</label>
                        <input
                            required
                            type="text"
                            value={formData.nome}
                            onChange={e => setFormData({ ...formData, nome: e.target.value })}
                            placeholder="Nome completo do afiliado"
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Email *</label>
                        <input
                            required
                            type="email"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            placeholder="email@exemplo.com"
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Telefone</label>
                        <input
                            type="text"
                            value={formData.telefone}
                            onChange={e => setFormData({ ...formData, telefone: e.target.value })}
                            placeholder="(00) 00000-0000"
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Status</label>
                        <select
                            value={formData.status}
                            onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                            className={selectClass}
                        >
                            <option value="ativo">Ativo</option>
                            <option value="inativo">Inativo</option>
                            <option value="bloqueado">Bloqueado</option>
                        </select>
                    </div>
                </div>

                {/* Comissão */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
                    <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-3">Configuração de Comissão</h3>

                    <div className="space-y-3">
                        {[
                            { id: 'first_month', label: '100% da primeira mensalidade' },
                            { id: 'recurring', label: 'Recorrente (Todo mês)' },
                            { id: 'custom', label: 'Personalizado' },
                        ].map(opt => (
                            <label
                                key={opt.id}
                                htmlFor={opt.id}
                                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${commissionMode === opt.id
                                    ? 'border-indigo-500 bg-indigo-50 text-indigo-800'
                                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                <input
                                    type="radio"
                                    id={opt.id}
                                    name="commissionMode"
                                    checked={commissionMode === opt.id}
                                    onChange={() => handleCommissionModeChange(opt.id as any)}
                                    className="h-4 w-4 text-indigo-600 border-gray-400 focus:ring-indigo-500"
                                />
                                <span className="text-sm font-medium">{opt.label}</span>
                            </label>
                        ))}
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        {commissionMode === 'first_month' && (
                            <p className="text-sm text-gray-700">
                                O afiliado recebe <strong className="text-gray-900">100%</strong> do valor da primeira mensalidade paga pelo cliente indicado.
                            </p>
                        )}
                        {commissionMode === 'recurring' && (
                            <div className="space-y-3">
                                <p className="text-sm text-gray-700">
                                    O afiliado recebe uma porcentagem de <strong className="text-gray-900">todas</strong> as mensalidades pagas.
                                </p>
                                <div className="flex items-center gap-3">
                                    <label className="text-sm font-semibold text-gray-800">Percentual:</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={formData.percentual_comissao}
                                        onChange={e => setFormData({ ...formData, percentual_comissao: Number(e.target.value) })}
                                        className="w-24 rounded-lg border border-gray-400 bg-white text-gray-900 px-3 py-2 shadow-sm text-sm"
                                    />
                                    <span className="text-sm font-semibold text-gray-800">%</span>
                                </div>
                            </div>
                        )}
                        {commissionMode === 'custom' && (
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-800 mb-1">Tipo</label>
                                    <select
                                        value={formData.tipo_comissao}
                                        onChange={e => setFormData({ ...formData, tipo_comissao: e.target.value as any })}
                                        className={selectClass}
                                    >
                                        <option value="unica">Única (Primeira Mensalidade)</option>
                                        <option value="recorrente">Recorrente</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-800 mb-1">Percentual</label>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="number"
                                            min="0"
                                            max="100"
                                            value={formData.percentual_comissao}
                                            onChange={e => setFormData({ ...formData, percentual_comissao: Number(e.target.value) })}
                                            className="w-28 rounded-lg border border-gray-400 bg-white text-gray-900 px-3 py-2 shadow-sm text-sm"
                                        />
                                        <span className="text-sm font-semibold text-gray-800">%</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Link Afiliado */}
            <div className="bg-indigo-50 rounded-xl shadow-sm border border-indigo-200 p-6">
                <h3 className="text-lg font-bold text-indigo-900 mb-4">Código e Link</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-indigo-800 mb-1">Código do Afiliado</label>
                        <div className="flex">
                            <input
                                type="text"
                                value={formData.codigo_afiliado}
                                onChange={e => setFormData({ ...formData, codigo_afiliado: e.target.value })}
                                className="block w-full rounded-l-lg border border-gray-400 bg-white text-gray-900 px-3 py-2.5 shadow-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600"
                                placeholder="Ex: joao1234"
                            />
                            <button
                                type="button"
                                onClick={generateCode}
                                className="inline-flex items-center px-4 py-2.5 border border-l-0 border-indigo-400 rounded-r-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors"
                            >
                                Gerar
                            </button>
                        </div>
                        <p className="mt-1 text-xs text-indigo-600">Preencha o Nome acima e clique em Gerar</p>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-indigo-800 mb-1">Link de Divulgação</label>
                        <div className="flex gap-2">
                            <input
                                readOnly
                                type="text"
                                value={formData.codigo_afiliado ? `https://flowdrain.gerenciaservicos.com.br/?ref=${formData.codigo_afiliado}` : 'Gere um código primeiro...'}
                                className="flex-1 block w-full rounded-lg border border-gray-400 bg-gray-100 text-gray-700 px-3 py-2.5 shadow-sm text-sm"
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    if (formData.codigo_afiliado) {
                                        navigator.clipboard.writeText(`https://flowdrain.gerenciaservicos.com.br/?ref=${formData.codigo_afiliado}`);
                                        alert('Link copiado!');
                                    }
                                }}
                                className="inline-flex items-center px-4 py-2.5 border border-transparent text-sm font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                            >
                                Copiar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dados PIX */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-200 pb-3">Chave PIX</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className={labelClass}>Tipo Chave PIX</label>
                        <select
                            value={formData.pix_tipo}
                            onChange={e => setFormData({ ...formData, pix_tipo: e.target.value })}
                            className={selectClass}
                        >
                            <option value="cpf">CPF</option>
                            <option value="cnpj">CNPJ</option>
                            <option value="email">Email</option>
                            <option value="telefone">Telefone</option>
                            <option value="chave_aleatoria">Aleatória</option>
                        </select>
                    </div>
                    <div>
                        <label className={labelClass}>Chave PIX</label>
                        <input
                            type="text"
                            value={formData.pix_chave}
                            onChange={e => setFormData({ ...formData, pix_chave: e.target.value })}
                            placeholder="Digite a chave PIX"
                            className={inputClass}
                        />
                    </div>
                </div>
            </div>




            {/* Últimas Vendas */}
            <LastSalesTable affiliateId={initialData?.id} />

            {/* Botões */}
            <div className="flex justify-end gap-3 pt-2">
                <button
                    type="button"
                    onClick={() => navigate('/admin/afiliados')}
                    className="px-5 py-2.5 border border-gray-400 text-sm font-semibold rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 border border-transparent text-sm font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors shadow-sm"
                >
                    {loading ? 'Salvando...' : 'Salvar Afiliado'}
                </button>
            </div>
        </form>
    );
}

function LastSalesTable({ affiliateId }: { affiliateId?: string }) {
    const [sales, setSales] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (affiliateId) {
            loadSales();
        }
    }, [affiliateId]);

    const loadSales = async () => {
        setLoading(true);
        try {
            // @ts-ignore
            const data = await afiliadosService.getUltimasVendasAfiliado(affiliateId!);
            setSales(data || []);
        } catch (error) {
            console.error('Erro ao carregar vendas:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!affiliateId) return null;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900">Últimas Vendas</h3>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comissão</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">Carregando...</td>
                            </tr>
                        ) : sales.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">Nenhuma venda registrada ainda.</td>
                            </tr>
                        ) : (
                            sales.map((sale) => (
                                <tr key={sale.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {new Date(sale.data_venda).toLocaleDateString('pt-BR')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(sale.valor_assinatura)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(sale.valor_comissao)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {sale.tipo_comissao === 'unica' ? 'Única' : 'Recorrente'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${sale.status === 'aberta' ? 'bg-yellow-100 text-yellow-800' :
                                            sale.status === 'paga' ? 'bg-green-100 text-green-800' :
                                                sale.status === 'cancelada' ? 'bg-red-100 text-red-800' :
                                                    'bg-blue-100 text-blue-800' // ativa
                                            }`}>
                                            {sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
