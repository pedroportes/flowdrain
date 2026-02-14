import { supabase } from '../lib/supabase';

export interface AffiliateStats {
    afiliadosAtivos: number;
    vendasIndicadas: number;
    comissoesGeradas: number;
    comissoesPagas: number;
}

export interface Afiliado {
    id: string;
    nome: string;
    email: string;
    telefone?: string;
    codigo_afiliado: string;
    link_afiliado: string;
    tipo_comissao: 'unica' | 'recorrente';
    percentual_comissao: number;
    total_cliques?: number;
    total_vendas?: number;
    total_comissoes_geradas?: number;
    total_comissoes_pagas?: number;
    status: 'ativo' | 'inativo' | 'bloqueado';
    pix_chave?: string;
    pix_tipo?: string;
    banco?: string;
    agencia?: string;
    conta?: string;
    tipo_conta?: string;
    created_at: string;
}

export interface VendaAfiliado {
    id: string;
    data_venda: string;
    valor_assinatura: number;
    valor_comissao: number;
    tipo_comissao: string;
    status: string;
}

export const afiliadosService = {
    // 1. Dashboard Stats
    async getDashboardStats(): Promise<AffiliateStats> {
        try {
            // Afiliados Ativos using count
            const { count: afiliadosAtivos, error: err1 } = await supabase
                .from('afiliados')
                .select('*', { count: 'exact', head: true })
                .eq('status', 'ativo');

            if (err1) throw err1;

            // Vendas Indicadas (Total)
            const { count: vendasIndicadas, error: err2 } = await supabase
                .from('afiliados_vendas')
                .select('*', { count: 'exact', head: true });

            if (err2) throw err2;

            // Somas de comissões
            // Nota: Supabase não tem SUM() direto na API JS sem RPC, mas se o volume for baixo podemos buscar e somar.
            // Se o volume for alto, o ideal é criar uma RCP.
            // Como o usuário pediu para NÃO criar funções SQL, vamos baixar os dados agregados da tabela afiliados
            // que já tem colunas de totalizadores: total_comissoes_geradas, total_comissoes_pagas.

            const { data: afiliados, error: err3 } = await supabase
                .from('afiliados')
                .select('total_comissoes_geradas, total_comissoes_pagas');

            if (err3) throw err3;

            const comissoesGeradas = afiliados?.reduce((acc, curr) => acc + (Number(curr.total_comissoes_geradas) || 0), 0) || 0;
            const comissoesPagas = afiliados?.reduce((acc, curr) => acc + (Number(curr.total_comissoes_pagas) || 0), 0) || 0;

            return {
                afiliadosAtivos: afiliadosAtivos || 0,
                vendasIndicadas: vendasIndicadas || 0,
                comissoesGeradas,
                comissoesPagas
            };
        } catch (error) {
            console.error('Erro ao buscar stats:', error);
            throw error;
        }
    },

    // 2. Listar Afiliados
    async listAfiliados({ page = 1, pageSize = 10, search = '' }) {
        try {
            let query = supabase
                .from('afiliados')
                .select('*', { count: 'exact' });

            if (search) {
                query = query.or(`nome.ilike.%${search}%,email.ilike.%${search}%`);
            }

            const from = (page - 1) * pageSize;
            const to = from + pageSize - 1;

            const { data, count, error } = await query
                .range(from, to)
                .order('created_at', { ascending: false });

            if (error) throw error;

            return { data, count };
        } catch (error) {
            console.error('Erro ao listar afiliados:', error);
            throw error;
        }
    },

    // 3. Obter Afiliado por ID
    async getAfiliadoById(id: string) {
        try {
            const { data, error } = await supabase
                .from('afiliados')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Erro ao obter afiliado:', error);
            throw error;
        }
    },

    // 4. Criar Afiliado
    async createAfiliado(afiliado: Omit<Afiliado, 'id' | 'created_at' | 'total_vendas' | 'total_comissoes_geradas'>) {
        try {
            // Gerar user_id no auth? Não, o user_id deve vir de um usuário existente ou ser NULL se o afiliado ainda não tem login.
            // Neste MVP o admin cria o cadastro do afiliado. O campo user_id é FK para auth.users.
            // Se não criarmos o usuário no Auth, user_id deve ser null ou omitido (se a tabela permitir).
            // A tabela diz: user_id uuid (FK auth.users). Se for NOT NULL, teremos problema.
            // O prompt diz: "user_id uuid (FK auth.users)". Não diz NOT NULL. Vamos assumir nullable.

            const { data, error } = await supabase
                .from('afiliados')
                .insert([{
                    ...afiliado,
                    total_cliques: 0,
                    total_vendas: 0,
                    total_comissoes_geradas: 0,
                    total_comissoes_pagas: 0,
                    total_comissoes_pendentes: 0
                }])
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Erro ao criar afiliado:', error);
            throw error;
        }
    },

    // 5. Atualizar Afiliado
    async updateAfiliado(id: string, updates: Partial<Afiliado>) {
        try {
            const { data, error } = await supabase
                .from('afiliados')
                .update(updates)
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Erro ao atualizar afiliado:', error);
            throw error;
        }
    },

    // 6. Últimas Vendas
    async getUltimasVendasAfiliado(id: string) {
        try {
            const { data, error } = await supabase
                .from('afiliados_vendas')
                .select('*')
                .eq('afiliado_id', id)
                .order('data_venda', { ascending: false })
                .limit(10);

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Erro ao buscar vendas do afiliado:', error);
            throw error;
        }
    }
};
