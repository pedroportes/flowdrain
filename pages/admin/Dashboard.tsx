import { useEffect, useState } from 'react';
import { Users, TrendingUp, DollarSign, CreditCard } from 'lucide-react';
import { afiliadosService, AffiliateStats } from '../../services/afiliadosService';

export function AdminDashboard() {
    const [stats, setStats] = useState<AffiliateStats>({
        afiliadosAtivos: 0,
        vendasIndicadas: 0,
        comissoesGeradas: 0,
        comissoesPagas: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStats();
    }, []);

    async function loadStats() {
        try {
            const data = await afiliadosService.getDashboardStats();
            setStats(data);
        } catch (error) {
            console.error('Failed to load dashboard stats', error);
        } finally {
            setLoading(false);
        }
    }

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Carregando painel...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Visão Geral</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Afiliados Ativos"
                    value={stats.afiliadosAtivos}
                    icon={Users}
                    color="blue"
                    subtext="Total"
                />
                <StatsCard
                    title="Vendas Indicadas"
                    value={stats.vendasIndicadas}
                    icon={TrendingUp}
                    color="green"
                    subtext="Total histórico"
                />
                <StatsCard
                    title="Comissões Geradas"
                    value={formatCurrency(stats.comissoesGeradas)}
                    icon={DollarSign}
                    color="purple"
                    subtext="Acumulado"
                />
                <StatsCard
                    title="Comissões Pagas"
                    value={formatCurrency(stats.comissoesPagas)}
                    icon={CreditCard}
                    color="orange"
                    subtext="Já transferido"
                />
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Atividade Recente</h2>
                <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg text-gray-400">
                    Gráfico de vendas será implementado aqui
                </div>
            </div>
        </div>
    );
}

function StatsCard({ title, value, icon: Icon, color, subtext }: any) {
    const colors: Record<string, string> = {
        blue: 'bg-blue-50 text-blue-600',
        green: 'bg-green-50 text-green-600',
        purple: 'bg-purple-50 text-purple-600',
        orange: 'bg-orange-50 text-orange-600',
    };

    return (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
                </div>
                <div className={`p-3 rounded-full ${colors[color] || ''}`}>
                    <Icon className="w-6 h-6" />
                </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-500">
                <span>{subtext}</span>
            </div>
        </div>
    );
}
