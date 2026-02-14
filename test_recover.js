const SUPABASE_URL = "https://dltqxfyrltgbudtzxzot.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsdHF4ZnlybHRnYnVkdHp4em90Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4NTMzNzIsImV4cCI6MjA4MjQyOTM3Mn0.25dykN-BHp6B_iB0l-EDtKiGrOGSc9inmo_403yhsUQ";

async function sendRecover() {
    const response = await fetch(`${SUPABASE_URL}/auth/v1/recover`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_ANON_KEY
        },
        body: JSON.stringify({
            email: "muriloportelaservicos@gmail.com",
            redirect_to: "https://app.gerenciaservicos.com.br/update-password"
        })
    });

    if (response.ok) {
        console.log("Email enviado com sucesso!");
    } else {
        const text = await response.text();
        console.error("Erro:", response.status, text);
    }
}

sendRecover();
