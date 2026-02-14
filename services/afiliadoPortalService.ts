import { supabase } from '../lib/supabase';
import { Afiliado, VendaAfiliado } from './afiliadosService';

export const afiliadoPortalService = {
    /**
     * Busca o perfil do afiliado logado pelo email do usuário autenticado.
     */
    async getMyProfile(): Promise<Afiliado | null> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user?.email) return null;

        const { data, error } = await supabase
            .from('afiliados')
            .select('*')
            .eq('email', user.email)
            .single();

        if (error) {
            console.error('Erro ao buscar perfil do afiliado:', error);
            return null;
        }
        return data;
    },

    /**
     * Atualiza apenas campos permitidos do perfil do afiliado.
     * NÃO permite alterar: tipo_comissao, percentual_comissao, status, codigo_afiliado
     */
    async updateMyProfile(updates: {
        nome?: string;
        telefone?: string;
        pix_tipo?: string;
        pix_chave?: string;
    }): Promise<Afiliado | null> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user?.email) throw new Error('Não autenticado');

        // Busca o ID do afiliado pelo email
        const { data: afiliado } = await supabase
            .from('afiliados')
            .select('id')
            .eq('email', user.email)
            .single();

        if (!afiliado) throw new Error('Afiliado não encontrado');

        // Filtra apenas campos permitidos
        const safeUpdates: Record<string, any> = {};
        if (updates.nome !== undefined) safeUpdates.nome = updates.nome;
        if (updates.telefone !== undefined) safeUpdates.telefone = updates.telefone;
        if (updates.pix_tipo !== undefined) safeUpdates.pix_tipo = updates.pix_tipo;
        if (updates.pix_chave !== undefined) safeUpdates.pix_chave = updates.pix_chave;

        const { data, error } = await supabase
            .from('afiliados')
            .update(safeUpdates)
            .eq('id', afiliado.id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    /**
     * Busca as vendas do afiliado logado.
     */
    async getMySales(): Promise<VendaAfiliado[]> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user?.email) return [];

        const { data: afiliado } = await supabase
            .from('afiliados')
            .select('id')
            .eq('email', user.email)
            .single();

        if (!afiliado) return [];

        const { data, error } = await supabase
            .from('afiliados_vendas')
            .select('*')
            .eq('afiliado_id', afiliado.id)
            .order('data_venda', { ascending: false })
            .limit(20);

        if (error) {
            console.error('Erro ao buscar vendas:', error);
            return [];
        }
        return data || [];
    }
};
