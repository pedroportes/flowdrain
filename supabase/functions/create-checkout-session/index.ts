import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const { priceId, successUrl, cancelUrl, codigoAfiliado } = await req.json();

        if (!priceId) {
            throw new Error("Missing priceId");
        }

        // Default to Live key. If you need logic to switch based on priceId format or client param, add it here.
        // Assuming the provided priceId is compatible with the key in STRIPE_SECRET_KEY.
        const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') as string, {
            apiVersion: '2023-10-16',
            httpClient: Stripe.createFetchHttpClient(),
        });

        console.log(`Creating checkout session for price: ${priceId} (Afiliado: ${codigoAfiliado})`);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'], // Add 'boleto' if needed/configured
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: successUrl,
            cancel_url: cancelUrl,
            metadata: {
                codigo_afiliado: codigoAfiliado || undefined,
            },
            client_reference_id: codigoAfiliado || undefined,
        });

        return new Response(JSON.stringify({ url: session.url }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        console.error("Error creating checkout session:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
        });
    }
});
