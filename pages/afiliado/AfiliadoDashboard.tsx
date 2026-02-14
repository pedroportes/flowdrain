import React, { useEffect, useState } from 'react';
import { Users, ShoppingCart, DollarSign, Clock, Copy, CheckCircle, Link as LinkIcon } from 'lucide-react';
import { afiliadoPortalService } from '../../services/afiliadoPortalService';
import { Afiliado, VendaAfiliado } from '../../services/afiliadosService';

export function AfiliadoDashboard() {
    const [affiliate, setAffiliate] = useState<Afiliado | null>(null);
    const [sales, setSales] = useState<VendaAfiliado[]>([]);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [profile, salesData] = await Promise.all([
                afiliadoPortalService.getMyProfile(),
                afiliadoPortalService.getMySales()
            ]);
            setAffiliate(profile);
            setSales(salesData);
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

    const copyLink = () => {
        if (affiliate?.link_afiliado) {
            navigator.clipboard.writeText(affiliate.link_afiliado);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (!affiliate) {
        return <div className="text-center text-gray-500 py-20">Perfil de afiliado não encontrado.</div>;
    }

    const pendentes = (affiliate.total_comissoes_geradas || 0) - (Number(affiliate.total_comissoes_pagas) || 0);

    const stats = [
        { label: 'Cliques', value: affiliate.total_cliques || 0, icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
        { label: 'Vendas', value: affiliate.total_vendas || 0, icon: ShoppingCart, color: 'text-green-500', bg: 'bg-green-50' },
        { label: 'Comissões Geradas', value: formatCurrency(affiliate.total_comissoes_geradas || 0), icon: DollarSign, color: 'text-purple-500', bg: 'bg-purple-50' },
        { label: 'Pendentes', value: formatCurrency(pendentes), icon: Clock, color: 'text-orange-500', bg: 'bg-orange-50' },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Olá, {affiliate.nome.split(' ')[0]}! 👋</h1>
                <p className="text-sm text-gray-500 mt-1">Acompanhe suas indicações e comissões</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{stat.label}</p>
                            <div className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center`}>
                                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Link de Indicação */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                    <LinkIcon className="w-5 h-5" />
                    <h2 className="text-lg font-bold">Seu Link de Indicação</h2>
                </div>
                <p className="text-indigo-100 text-sm mb-4">
                    Compartilhe este link para ganhar comissões por cada venda indicada.
                </p>
                <div className="flex items-center gap-3">
                    <input
                        readOnly
                        value={affiliate.link_afiliado || `https://flowdrain.gerenciaservicos.com.br/?ref=${affiliate.codigo_afiliado}`}
                        className="flex-1 bg-white/20 backdrop-blur-sm text-white placeholder:text-indigo-200 border border-white/30 rounded-xl px-4 py-3 text-sm font-mono"
                    />
                    <button
                        onClick={copyLink}
                        className="flex items-center gap-2 bg-white text-indigo-600 px-5 py-3 rounded-xl font-bold text-sm hover:bg-indigo-50 transition shadow-md"
                    >
                        {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copied ? 'Copiado!' : 'Copiar'}
                    </button>
                </div>
                <p className="text-indigo-200 text-xs mt-2">Código: <span className="font-mono font-bold text-white">{affiliate.codigo_afiliado}</span></p>
            </div>

            {/* Últimas Vendas */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900">Últimas Vendas</h2>
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
                            {sales.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-sm text-gray-500">
                                        Nenhuma venda registrada ainda. Compartilhe seu link para começar!
                                    </td>
                                </tr>
                            ) : (
                                sales.map((sale) => (
                                    <tr key={sale.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {new Date(sale.data_venda).toLocaleDateString('pt-BR')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {formatCurrency(sale.valor_assinatura)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                                            {formatCurrency(sale.valor_comissao)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {sale.tipo_comissao === 'unica' ? 'Única' : 'Recorrente'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${sale.status === 'paga' ? 'bg-green-100 text-green-800' :
                                                    sale.status === 'aberta' ? 'bg-yellow-100 text-yellow-800' :
                                                        sale.status === 'cancelada' ? 'bg-red-100 text-red-800' :
                                                            'bg-blue-100 text-blue-800'
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
        </div>
    );
}
