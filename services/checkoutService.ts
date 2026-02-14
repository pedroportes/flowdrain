/**
 * Serviço de Checkout do Stripe via Edge Function.
 * Cria sessões de checkout enviando o código de afiliado via metadata.
 */

import { getStoredAffiliateCode } from '../utils/affiliate';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

/**
 * Inicia o fluxo de checkout do Stripe via Edge Function do Supabase.
 * @param priceId - O ID do preço no Stripe.
 * @param affiliateCode - Código opcional do afiliado para atribuição de comissão.
 */
export async function startCheckout(priceId: string, affiliateCode: string | null = null): Promise<string> {
    const payload = {
        priceId,
        successUrl: `${window.location.origin}/sucesso?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/cancelado`,
        codigoAfiliado: affiliateCode, // A Edge Function mapeia este campo para client_reference_id no Stripe
    };

    console.log('[CheckoutService] Iniciando checkout:', {
        priceId,
        affiliateCode,
        endpoint: `${SUPABASE_URL}/functions/v1/create-checkout-session`
    });

    const response = await fetch(
        `${SUPABASE_URL}/functions/v1/create-checkout-session`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'Erro ao iniciar checkout');
    }

    return data.url;
}
