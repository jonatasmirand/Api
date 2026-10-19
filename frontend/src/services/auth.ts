import { ApiErrorResponse, AuthUser, LoginCredentials, LoginResponse, LoginResponseData } from '@/types';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

const TOKEN_STORAGE_KEY = 'fingestao_auth_token';
const USER_STORAGE_KEY = 'fingestao_auth_user';
const REMEMBER_EMAIL_KEY = 'fingestao_remember_email';

export class AuthError extends Error {
  status?: number;
  details?: ApiErrorResponse['details'];

  constructor(message: string, status?: number, details?: ApiErrorResponse['details']) {
    super(message);
    this.name = 'AuthError';
    this.status = status;
    this.details = details;
  }
}

/**
 * Realiza autenticação com email e senha na API.
 * Endpoint: POST /api/v1/auth/login
 */
export async function loginApi(credentials: LoginCredentials): Promise<LoginResponseData> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email.trim(),
        password: credentials.password,
      }),
    });
  } catch (err) {
    const errorMsg =
      err instanceof Error && err.name === 'AbortError'
        ? 'A requisição demorou muito para responder.'
        : `Não foi possível conectar ao servidor em ${API_BASE_URL}. Verifique se o backend está em execução.`;
    throw new AuthError(errorMsg);
  }

  const data: (LoginResponse & ApiErrorResponse) | null = await response.json().catch(() => null);

  if (!response.ok) {
    if (response.status === 401) {
      throw new AuthError(
        data?.message || 'Email ou senha inválidos. Verifique suas credenciais.',
        response.status
      );
    }

    if (response.status === 400 && data?.details && data.details.length > 0) {
      const messages = data.details.map((d) => d.msg).join(' | ');
      throw new AuthError(messages || data?.message || 'Dados inválidos.', response.status, data.details);
    }

    throw new AuthError(
      data?.message || `Erro no login (${response.status}). Tente novamente.`,
      response.status
    );
  }

  if (!data?.data?.token) {
    throw new AuthError('Resposta inválida do servidor: token não recebido.');
  }

  return data.data;
}

/**
 * Salva os dados de sessão no localStorage e em cookie para acessibilidade.
 */
export function saveAuthSession(data: LoginResponseData, rememberEmail = false): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(TOKEN_STORAGE_KEY, data.token);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data.user));

    if (rememberEmail) {
      localStorage.setItem(REMEMBER_EMAIL_KEY, data.user.email);
    } else {
      localStorage.removeItem(REMEMBER_EMAIL_KEY);
    }

    // Salva cookie seguro para o token (permite leitura se necessário)
    document.cookie = `auth_token=${encodeURIComponent(data.token)}; path=/; max-age=86400; SameSite=Lax`;
  } catch (error) {
    console.error('Falha ao salvar sessão localmente:', error);
  }
}

/**
 * Recupera o email salvo para preenchimento automático.
 */
export function getRememberedEmail(): string {
  if (typeof window === 'undefined') return '';
  try {
    return localStorage.getItem(REMEMBER_EMAIL_KEY) || '';
  } catch {
    return '';
  }
}

/**
 * Recupera a sessão ativa do usuário.
 */
export function getStoredAuth(): { user: AuthUser | null; token: string | null } {
  if (typeof window === 'undefined') return { user: null, token: null };

  try {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    const userJson = localStorage.getItem(USER_STORAGE_KEY);
    const user = userJson ? (JSON.parse(userJson) as AuthUser) : null;
    return { user, token };
  } catch {
    return { user: null, token: null };
  }
}

/**
 * Encerra a sessão ativa removendo dados locais.
 */
export function clearAuthSession(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
  } catch (error) {
    console.error('Falha ao limpar sessão local:', error);
  }
}

/**
 * Valida a sessão atual com o backend.
 * Se o usuário tiver sido excluído ou o token tiver expirado, limpa o armazenamento local automaticamente.
 */
export async function validateSession(clearIfInvalid = true): Promise<{
  isValid: boolean;
  user: AuthUser | null;
  reason?: 'no_token' | 'invalid_or_deleted' | 'network_error';
}> {
  if (typeof window === 'undefined') {
    return { isValid: false, user: null, reason: 'no_token' };
  }

  const { token, user: localUser } = getStoredAuth();

  if (!token) {
    if (clearIfInvalid) clearAuthSession();
    return { isValid: false, user: null, reason: 'no_token' };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401 || response.status === 403 || response.status === 404) {
      // Usuário foi excluído no banco ou o token foi invalidado/expirou
      if (clearIfInvalid) {
        clearAuthSession();
      }
      return { isValid: false, user: null, reason: 'invalid_or_deleted' };
    }

    if (!response.ok) {
      // Outro status HTTP não-fatal (ex.: 500 temporário)
      return { isValid: Boolean(localUser), user: localUser };
    }

    const data = await response.json();
    const freshUser: AuthUser = data.data?.user;

    if (freshUser) {
      try {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(freshUser));
      } catch {}
      return { isValid: true, user: freshUser };
    }

    return { isValid: true, user: localUser };
  } catch {
    // Falha de rede (ex: backend reiniciando), mantém estado local para evitar logout indesejado
    return { isValid: Boolean(localUser), user: localUser, reason: 'network_error' };
  }
}

/**
 * Realiza logout informando o backend e limpando a sessão local.
 */
export async function logoutApi(): Promise<void> {
  const { token } = getStoredAuth();

  if (token) {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
    } catch {
      // Silenciosamente ignora falha de rede e limpa dados locais abaixo
    }
  }

  clearAuthSession();
}

/**
 * Verifica se há sessão ativa localmente.
 */
export function isAuthenticated(): boolean {
  const { token } = getStoredAuth();
  return Boolean(token);
}

