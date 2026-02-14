
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";
import Stripe from "https://esm.sh/stripe@12.18.0?target=deno";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        // 2. Parse Body FIRST to get sessionId
        const { sessionId, passwordOpcional } = await req.json();

        if (!sessionId) {
            return new Response(JSON.stringify({ ok: false, message: "sessionId is required" }), {
                status: 400,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        // 3. Determine Stripe Key (Test or Live)
        const isTestSession = sessionId.startsWith('cs_test_');
        const STRIPE_SECRET_KEY = isTestSession
            ? Deno.env.get("STRIPE_TEST_SECRET_KEY")
            : Deno.env.get("STRIPE_SECRET_KEY");

        const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
        const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

        if (!STRIPE_SECRET_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
            throw new Error(`Missing environment variables: ${isTestSession ? 'STRIPE_TEST_SECRET_KEY' : 'STRIPE_SECRET_KEY'}, SUPABASE_URL, or SUPABASE_SERVICE_ROLE_KEY`);
        }

        const stripe = new Stripe(STRIPE_SECRET_KEY, {
            apiVersion: "2022-11-15",
            httpClient: Stripe.createFetchHttpClient(),
        });

        // Client with Service Role (Admin access to public schema)
        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

        // Auth Admin Client
        const adminAuthClient = supabase.auth.admin;

        // 3. Retrieve Stripe Session
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ["customer"],
        });

        const customerId = typeof session.customer === 'string' ? session.customer : session.customer?.id;
        const subscriptionId = typeof session.subscription === 'string' ? session.subscription : session.subscription?.id;
        const customerEmail = session.customer_details?.email || (session.customer as any)?.email;
        const customerName = session.customer_details?.name || (session.customer as any)?.name;

        if (!customerEmail) {
            return new Response(JSON.stringify({ ok: false, message: "Email not found in Stripe Session" }), {
                status: 400,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        if (!customerId) {
            return new Response(JSON.stringify({ ok: false, message: "Customer ID not found in Stripe Session" }), {
                status: 400,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        // 4. Ensure Company (public.empresas)
        // Try to find company by stripe_customer_id
        const { data: existingCompany, error: companyError } = await supabase
            .from("empresas")
            .select("id, nome, email, dono_id")
            .eq("stripe_customer_id", customerId)
            .limit(1)
            .maybeSingle();

        if (companyError) {
            throw new Error(`Error searching company: ${companyError.message}`);
        }

        let empresaFinal = existingCompany;

        if (!empresaFinal) {
            // Create new company
            const { data: newCompany, error: createCompanyError } = await supabase
                .from("empresas")
                .insert({
                    nome: customerName || customerEmail || "Nova Empresa",
                    email: customerEmail,
                    stripe_customer_id: customerId,
                    stripe_subscription_id: subscriptionId,
                    subscription_status: "active", // Assume active immediately after successful checkout
                })
                .select("id, nome, email")
                .single();

            if (createCompanyError) {
                throw new Error(`Error creating company: ${createCompanyError.message}`);
            }
            empresaFinal = newCompany;
        } else {
            // Optional: update email or name if missing
            // For now, we just use it
        }

        // 5. Ensure Auth User (auth.users)
        // Check if user exists by email
        // listUsers returns { data: { users: [] }, error }
        // note: listUsers only searches fairly small lists efficiently, better to use proper search if available, 
        // but here we likely don't have many users or we rely on create user to fail if exists?
        // Actually, create user returns error if exists.

        // Better approach: Try to create, if fails with "User already registered", then get user by email?
        // Or just list users by email strictly.

        // Using createUser directly.
        let userId: string;

        // We try to create a new user.
        const tempPassword = passwordOpcional || Math.random().toString(36).slice(-10) + Math.random().toString(36).slice(-10);

        const { data: createdUser, error: createUserError } = await adminAuthClient.createUser({
            email: customerEmail,
            password: tempPassword,
            email_confirm: true,
            user_metadata: { full_name: customerName }
        });

        if (createUserError) {
            // If error, check if it's because user already exists
            // There is no specific error code guaranteed, but message usually contains "already registered"
            console.log("Create user error (might be expected):", createUserError);

            // Try to fetch user by email to confirm existance
            // Is there a getUserByEmail? No, listUsers with filter.
            // Or createClient cannot fetch user by email easily without listUsers permission which enabled.

            // Note: adminAuthClient.listUsers is the way.
            // It's possible the error is "Key (email)=(...) already exists" from Postgres.

            // Let's try to find existing user
            // Using `supabase.auth.admin.listUsers` is generally safe for server-side
            // But listing all users is bad.
            // Does listUsers support email filter? No, standard `listUsers` is paginated.
            // However, we can use `generatLink` or something? No.

            // Actually, supabase-js v2 admin.createUser returns the existing user if we use correct config? No.

            // WORKAROUND: In standard Supabase, we access auth.users via SQL/RPC or just use listUsers if allowed.
            // BUT, since we are in Service Role, we can query auth.users if we enable it? No, schemas are separate.

            // Wait, supabase-js v2 `listUsers` does not support email filtering directly in all versions?
            // Let's assume we can't efficiently search by email via API in some versions.
            // HOWEVER, since we know `stripe_customer_id` is linked to an `empresa`, maybe `dono_id` is already set?
            // If `empresaFinal.dono_id` is set, we can use that userId.

            if (empresaFinal?.dono_id) {
                userId = empresaFinal.dono_id;
            } else {
                // Need to find the user.
                // If createUser failed, user exists. We need their ID.
                // We can try to sign in with password? No we don't know it.
                // We MUST be able to find it.
                // In typical Edge Function environment, we assume we might need to iterate or use specific filter if available.
                // Actually, we can use RPC if we had one.
                // But let's look at `listUsers`.
                // admin.listUsers() is unfortunately the only standard way.
                // Assuming the pool isn't massive or we can filter.
                // Actually, `supabase.auth.admin.listUsers()` is deprecated in favor of `listUsers()`.

                // Let's try `getUserByEmail` if it exists in this version?
                // Checking documentation... nope.

                // Re-read prompt: "Dependendo da versão do supabase-js v2, pode usar: listUsers com filtro de email"
                // Let's try to query auth schema directly? No, usually blocked.
                // But we have service_role_key. createClient(..., { db: { schema: 'auth' } })? No.

                // Let's try the only robust way: `listUsers` has no search.
                // Wait, logic hack: 
                // If `empresas` has `dono_id`, we use it. 
                // If not, we just created `empresas`.
                // If `createUser` failed, it means `email` is taken.
                // WE NEED THE ID.

                // Okay, let's look at Prompt suggestion: 
                // "const { data: usersPage } = await adminClient.auth.admin.listUsers({ page: 1, perPage: 1000 }); // filtrar pelo email"
                // This is feasible for small apps.

                // Let's implement that loop.
                let foundUser = false;
                let page = 1;
                while (!foundUser) {
                    const { data: pageData, error: listError } = await adminAuthClient.listUsers({ page: page, perPage: 1000 });
                    if (listError || !pageData.users || pageData.users.length === 0) break;

                    const match = pageData.users.find(u => u.email === customerEmail);
                    if (match) {
                        userId = match.id;
                        foundUser = true;
                    }

                    if (pageData.users.length < 1000) break; // End of list
                    page++;
                }

                if (!foundUser) {
                    throw new Error("User exists (create failed) but could not be found via listUsers. This is unexpected.");
                }
            }
        } else {
            // User created successfully
            userId = createdUser.user.id;
        }

        // 6. Ensure public.usuarios
        // Check if exists
        const { data: existingUsuario, error: usuarioError } = await supabase
            .from("usuarios")
            .select("id, empresa_id, tipo_usuario")
            .or(`id.eq.${userId},auth_user_id.eq.${userId}`)
            .maybeSingle();

        if (usuarioError) {
            console.error("Error fetching usuario:", usuarioError);
            // Continue to try insert/update?
        }

        if (!existingUsuario) {
            // Create usuario
            const { error: insertUsuarioError } = await supabase
                .from("usuarios")
                .insert({
                    id: userId,
                    auth_user_id: userId,
                    empresa_id: empresaFinal.id,
                    email: customerEmail,
                    nome_completo: customerName || "",
                    tipo_usuario: "empresa",
                    cargo: "admin",
                });

            if (insertUsuarioError) {
                throw new Error(`Error creating usuario: ${insertUsuarioError.message}`);
            }
        } else {
            // Update if missing fields or ensure link
            if (!existingUsuario.empresa_id || existingUsuario.empresa_id !== empresaFinal.id) {
                // If user already has an empresa, we might be overwriting or adding a second one?
                // Prompt says: "Se empresa_id estiver null, setar empresa_id = empresaFinal.id"
                // Prompt also says: "Garantir tipo_usuario = 'empresa'"

                const updateData: any = {};
                if (!existingUsuario.empresa_id) updateData.empresa_id = empresaFinal.id;
                if (!existingUsuario.tipo_usuario) updateData.tipo_usuario = 'empresa';

                if (Object.keys(updateData).length > 0) {
                    await supabase.from("usuarios").update(updateData).eq("id", existingUsuario.id);
                }
            }
        }

        // 7. Update 'dono_id' in Company
        if (empresaFinal.dono_id !== userId) {
            await supabase
                .from("empresas")
                .update({ dono_id: userId })
                .eq("id", empresaFinal.id);
        }

        // 8. Send password recovery email via Auth REST API
        // IMPORTANT: We call /recover directly with the anon key because
        // supabase.auth.resetPasswordForEmail() on a service_role client
        // silently bypasses SMTP email dispatch (confirmed in auth logs).
        const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsdHF4ZnlybHRnYnVkdHp4em90Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4NTMzNzIsImV4cCI6MjA4MjQyOTM3Mn0.25dykN-BHp6B_iB0l-EDtKiGrOGSc9inmo_403yhsUQ";

        const recoverResponse = await fetch(
            `${SUPABASE_URL}/auth/v1/recover`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "apikey": SUPABASE_ANON_KEY,
                },
                body: JSON.stringify({
                    email: customerEmail,
                    redirect_to: "https://app.gerenciaservicos.com.br/update-password",
                    gotrue_meta_security: {
                        captcha_token: "",
                    },
                }),
            }
        );

        const recoverBody = await recoverResponse.text();
        let resetError: string | null = null;

        if (!recoverResponse.ok) {
            resetError = `HTTP ${recoverResponse.status}: ${recoverBody}`;
            console.error("[onboarding-pos-checkout] Erro ao enviar e-mail de redefinição de senha:", resetError);
        } else {
            console.log("[onboarding-pos-checkout] E-mail de redefinição de senha disparado com sucesso para", customerEmail);
        }

        // Success response
        return new Response(JSON.stringify({
            ok: true,
            empresaId: empresaFinal.id,
            userId: userId,
            email: customerEmail,
            debug: {
                emailSent: !resetError,
                emailError: resetError || null,
                isNewUser: !createUserError,
            }
        }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });

    } catch (err: any) {
        console.error("Error in onboarding-pos-checkout:", err);

        // Log sensitive debug info carefully (only for our debugging purposes right now)
        // In production, avoid logging full keys.
        // But here we need to know WHICH key was used.
        try {
            const { sessionId } = await req.clone().json().catch(() => ({ sessionId: "unknown" }));
            const isTest = sessionId?.startsWith('cs_test_');
            const keyUsed = isTest
                ? Deno.env.get("STRIPE_TEST_SECRET_KEY")
                : Deno.env.get("STRIPE_SECRET_KEY");

            console.error(`Debug Info: Session=${sessionId}, IsTest=${isTest}, KeyPrefix=${keyUsed ? keyUsed.substring(0, 8) + '...' : 'undefined'}`);

            return new Response(JSON.stringify({
                ok: false,
                message: `${err.message} (Debug: ${sessionId?.substring(0, 10)}... | Test=${isTest} | Key=${keyUsed ? 'Set' : 'Missing'})`
            }), {
                status: 400,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        } catch (e) {
            // Fallback error
            return new Response(JSON.stringify({ ok: false, message: err.message }), {
                status: 400,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }
    }
});
