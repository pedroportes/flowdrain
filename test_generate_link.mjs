import { writeFileSync } from 'node:fs';

const SUPABASE_URL = "https://dltqxfyrltgbudtzxzot.supabase.co";
const SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsdHF4ZnlybHRnYnVkdHp4em90Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Njg1MzM3MiwiZXhwIjoyMDgyNDI5MzcyfQ.gtkP1f6zGxU2YA7AD5cSlnVxeldvpi0aXHNQO_raXpk";

async function generateRecoveryLink() {
    const response = await fetch(`${SUPABASE_URL}/auth/v1/admin/generate_link`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apikey': SERVICE_ROLE_KEY,
            'Authorization': `Bearer ${SERVICE_ROLE_KEY}`
        },
        body: JSON.stringify({
            type: "recovery",
            email: "muriloportelaservicos@gmail.com",
            redirect_to: "https://app.gerenciaservicos.com.br/update-password"
        })
    });

    const data = await response.json();

    if (response.ok) {
        const output = [
            "=== LINK GERADO COM SUCESSO ===",
            "",
            "ACTION_LINK:",
            data.action_link,
            "",
            "REDIRECT_TO: " + (data.redirect_to || "N/A"),
            "TYPE: " + (data.verification_type || "N/A"),
        ].join("\n");

        writeFileSync("recovery_link_output.txt", output, "utf-8");
        console.log("Link salvo em recovery_link_output.txt");
    } else {
        console.error("Erro:", response.status, JSON.stringify(data));
    }
}

generateRecoveryLink();
