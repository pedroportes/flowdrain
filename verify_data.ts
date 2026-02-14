
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dltqxfyrltgbudtzxzot.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsdHF4ZnlybHRnYnVkdHp4em90Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4NTMzNzIsImV4cCI6MjA4MjQyOTM3Mn0.25dykN-BHp6B_iB0l-EDtKiGrOGSc9inmo_403yhsUQ';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkData() {
    console.log("Checking afiliado...");

    // Get the first affiliate
    const { data: affiliates, error: affError } = await supabase
        .from('afiliados')
        .select('id, nome, email')
        .limit(1);

    if (affError) {
        console.error("Error fetching affiliates:", affError);
        return;
    }

    if (affiliates && affiliates.length > 0) {
        const affiliateId = affiliates[0].id; // Just check the first one found
        console.log(`Checking sales for affiliate: ${affiliates[0].nome} (${affiliateId})`);

        const { data: sales, error: salesError } = await supabase
            .from('afiliados_vendas')
            .select('*')
            .eq('afiliado_id', affiliateId);

        if (salesError) {
            console.error("Error fetching sales:", salesError);
        } else {
            console.log("Sales found:", sales);
            if (sales.length === 0) {
                console.log("No sales found for this affiliate.");
            }
        }
    } else {
        console.log("No affiliates found.");
    }

    // Also check if ANY sales exist
    const { count, error: countError } = await supabase
        .from('afiliados_vendas')
        .select('*', { count: 'exact', head: true });

    console.log("Total sales in DB:", count);
}

checkData();
