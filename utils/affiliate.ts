/**
 * Utilitário de rastreamento de afiliados FlowDrain.
 * 
 * Fluxo:
 * 1. Visitante acessa /?ref=CODIGO
 * 2. captureAffiliateFromUrl() salva o código em cookie + localStorage
 * 3. Registra o clique na Edge Function
 * 4. Quando o visitante assina, getStoredAffiliateCode() recupera o código
 */

const COOKIE_NAME = 'flowdrain_afiliado';
const LS_KEY = 'flowdrain_afiliado';
const COOKIE_DAYS = 30;
const SUPABASE_URL = 'https://dltqxfyrltgbudtzxzot.supabase.co';

// ─── Cookie helpers ──────────────────────────────────────────────

function setCookie(name: string, value: string, days: number): void {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires};path=/;SameSite=Lax`;
}

function getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
    return match ? decodeURIComponent(match[1]) : null;
}

function deleteCookie(name: string): void {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
}

// ─── Registrar clique via Edge Function ──────────────────────────

async function registerClick(codigoAfiliado: string): Promise<void> {
    try {
        // Coletar UTMs da URL
        const params = new URLSearchParams(window.location.search);

        await fetch(`${SUPABASE_URL}/functions/v1/afiliados-registrar-clique`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                codigo_afiliado: codigoAfiliado,
                user_agent: navigator.userAgent,
                referrer: document.referrer || null,
                utm_source: params.get('utm_source') || null,
                utm_medium: params.get('utm_medium') || null,
                utm_campaign: params.get('utm_campaign') || null,
            }),
        });
    } catch (err) {
        // Silencia erros de rede para não impactar UX
        console.warn('[affiliate] Erro ao registrar clique:', err);
    }
}

// ─── API Pública ─────────────────────────────────────────────────

/**
 * Captura o código de afiliado da URL (?ref=XXXXX), salva por 30 dias,
 * registra o clique no backend e limpa a URL.
 * Deve ser chamada uma vez no carregamento da app.
 */
export function captureAffiliateFromUrl(): void {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('ref');

    if (!code) return;

    // Salvar em cookie + localStorage
    setCookie(COOKIE_NAME, code, COOKIE_DAYS);
    try {
        localStorage.setItem(LS_KEY, code);
    } catch {
        // localStorage pode estar bloqueado em modo privado
    }

    // Registrar clique (fire-and-forget)
    registerClick(code);

    // Limpar ?ref= da URL sem recarregar
    params.delete('ref');
    // Também remover UTMs da URL para ficar limpa
    params.delete('utm_source');
    params.delete('utm_medium');
    params.delete('utm_campaign');

    const cleanSearch = params.toString();
    const cleanUrl = window.location.pathname + (cleanSearch ? `?${cleanSearch}` : '');
    window.history.replaceState({}, '', cleanUrl);

    console.log('[affiliate] Código capturado:', code);
}

/**
 * Retorna o código do afiliado armazenado (cookie → localStorage fallback).
 * Filtra valores inválidos como "", "null" ou "undefined".
 */
export function getStoredAffiliateCode(): string | null {
    const filterValid = (val: string | null) => {
        if (!val || val === 'null' || val === 'undefined' || val.trim() === '') {
            return null;
        }
        return val;
    };

    const fromCookie = filterValid(getCookie(COOKIE_NAME));
    if (fromCookie) return fromCookie;

    try {
        return filterValid(localStorage.getItem(LS_KEY));
    } catch {
        return null;
    }
}

/**
 * Limpa o código do afiliado do cookie e localStorage.
 */
export function clearAffiliateCode(): void {
    deleteCookie(COOKIE_NAME);
    try {
        localStorage.removeItem(LS_KEY);
    } catch {
        // Ignora
    }
}
