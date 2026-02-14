import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Users, ShoppingCart, DollarSign, Clock } from 'lucide-react';
import { afiliadosService, Afiliado, VendaAfiliado } from '../../services/afiliadosService';
import { AffiliateForm } from './AffiliateForm';

export function AffiliateDetails() {
    const { id } = useParams();
    const [affiliate, setAffiliate] = useState<Afiliado | null>(null);
    const [sales, setSales] = useState<VendaAfiliado[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) loadData(id);
    }, [id]);

    async function loadData(affiliateId: string) {
        setLoading(true);
        try {
            const [affData, salesData] = await Promise.all([
                afiliadosService.getAfiliadoById(affiliateId),
                afiliadosService.getUltimasVendasAfiliado(affiliateId)
            ]);
            setAffiliate(affData);
            setSales(salesData || []);
        } catch (error) {
            console.error('Failed to load affiliate data', error);
        } finally {
            setLoading(false);
        }
    }

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

    if (loading) return <div>Carregando...</div>;
    if (!affiliate) return <div>Afiliado não encontrado.</div>;

    return (
        <div className="space-y-8">
            <div className="flex items-center mb-6">
                <Link to="/admin/afiliados" className="mr-4 p-2 rounded-full hover:bg-gray-100 text-gray-600">
                    <ChevronLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{affiliate.nome}</h1>
                    <p className="text-sm text-gray-500">{affiliate.email}</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <p className="text-xs font-medium text-gray-500 uppercase">Cliques</p>
                    <div className="mt-2 flex items-center justify-between">
                        <span className="text-2xl font-bold text-gray-900">{affiliate.total_cliques || 0}</span>
                        <Users className="w-5 h-5 text-gray-400" />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <p className="text-xs font-medium text-gray-500 uppercase">Vendas</p>
                    <div className="mt-2 flex items-center justify-between">
                        <span className="text-2xl font-bold text-gray-900">{affiliate.total_vendas || 0}</span>
                        <ShoppingCart className="w-5 h-5 text-green-500" />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <p className="text-xs font-medium text-gray-500 uppercase">Comissões Geradas</p>
                    <div className="mt-2 flex items-center justify-between">
                        <span className="text-2xl font-bold text-gray-900">{formatCurrency(affiliate.total_comissoes_geradas || 0)}</span>
                        <DollarSign className="w-5 h-5 text-purple-500" />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <p className="text-xs font-medium text-gray-500 uppercase">Pendentes</p>
                    <div className="mt-2 flex items-center justify-between">
                        {/* Assuming total_comissoes_geradas - total_comissoes_pagas = pendentes if column doesn't exist. Service interface has total_comissoes_pendentes? No, I added it in Step 253 Omit, but maybe not in interface? 
                           Let's check interface in Step 253.
                           Interface: total_comissoes_pendentes is NOT in the interface I wrote in Step 253.
                           I wrote: total_comissoes_geradas?: number; total_comissoes_pagas?: number;
                           Wait, I added it in the Omit but not in the interface definition?
                           "export interface Afiliado { ... total_comissoes_geradas?: number; ... }"
                           I should probably calculate pending here or just show 0 if undefined.
                        */}
                        <span className="text-2xl font-bold text-gray-900">{formatCurrency((affiliate.total_comissoes_geradas || 0) - (Number(affiliate.total_comissoes_pagas) || 0))}</span>
                        <Clock className="w-5 h-5 text-orange-500" />
                    </div>
                </div>
            </div>

            {/* Edit Form */}
            <section>
                <div className="mb-4">
                    <h2 className="text-lg font-medium text-gray-900">Editar Informações</h2>
                </div>
                <AffiliateForm initialData={affiliate} isEditing={true} />
            </section>


        </div>
    );
}
