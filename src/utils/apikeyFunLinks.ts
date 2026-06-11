export const APIKEY_FUN_REGISTER_URL = 'https://apikey.fun/register?aff=cockpit';
export const APIKEY_FUN_DOCS_URL = 'https://apikey.fun/docs';
export const APIKEY_FUN_GLOBAL_ENDPOINT = 'https://api.apikey.fun';
export const APIKEY_FUN_DIRECT_ENDPOINT = 'https://slb.apikey.fun';
export const APIKEY_FUN_SOURCE_TAG = 'apikey_fun';
export const APIKEY_FUN_PROVIDER_BASE_URL = buildApiKeyFunProviderBaseUrl(
  APIKEY_FUN_GLOBAL_ENDPOINT,
);

export function buildApiKeyFunProviderBaseUrl(endpoint: string): string {
  return `${endpoint.trim().replace(/\/+$/, '')}/v1`;
}

export function normalizeApiKeyFunOfficialUrl(value?: string | null): string {
  const raw = value?.trim() ?? '';
  if (!raw) return '';
  try {
    const parsed = new URL(raw);
    if (
      parsed.protocol === 'https:' &&
      parsed.hostname.toLowerCase() === 'apikey.fun' &&
      (parsed.pathname === '/' || parsed.pathname === '/register')
    ) {
      return APIKEY_FUN_REGISTER_URL;
    }
  } catch {
    return raw;
  }
  return raw;
}

export function isApiKeyFunProviderBaseUrl(value?: string | null): boolean {
  const raw = value?.trim() ?? '';
  if (!raw) return false;
  try {
    const parsed = new URL(raw);
    const expected = new URL(APIKEY_FUN_PROVIDER_BASE_URL);
    return (
      parsed.protocol === expected.protocol &&
      parsed.hostname.toLowerCase() === expected.hostname.toLowerCase() &&
      parsed.pathname.replace(/\/+$/, '') === expected.pathname.replace(/\/+$/, '')
    );
  } catch {
    return false;
  }
}

export function resolveApiKeyFunWireApi(
  baseUrl?: string | null,
  wireApi?: 'responses' | 'chat_completions' | null,
): 'responses' | 'chat_completions' | null {
  return isApiKeyFunProviderBaseUrl(baseUrl) ? 'responses' : wireApi ?? null;
}
