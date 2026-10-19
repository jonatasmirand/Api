'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AuthUser } from '@/types';
import {
  getStoredAuth,
  validateSession,
  logoutApi,
  clearAuthSession,
} from '@/services/auth';

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Validação segura de sessão contra o backend
  const checkAuth = useCallback(async () => {
    const { user: localUser, token: localToken } = getStoredAuth();

    if (!localToken) {
      setUser(null);
      setToken(null);
      setIsLoading(false);
      clearAuthSession();
      router.push(`/login?redirect=${encodeURIComponent(pathname || '/dashboard')}`);
      return;
    }

    if (localUser) {
      setUser(localUser);
      setToken(localToken);
    }

    try {
      const result = await validateSession(true);

      if (!result.isValid) {
        setUser(null);
        setToken(null);
        clearAuthSession();
        router.push(`/login?redirect=${encodeURIComponent(pathname || '/dashboard')}`);
      } else if (result.user) {
        setUser(result.user);
        setToken(localToken);
      }
    } catch (err) {
      console.error('Erro na validação de sessão:', err);
    } finally {
      setIsLoading(false);
    }
  }, [pathname, router]);

  useEffect(() => {
    let isMounted = true;

    const runValidation = async () => {
      const { user: localUser, token: localToken } = getStoredAuth();

      if (!localToken) {
        if (isMounted) {
          setUser(null);
          setToken(null);
          setIsLoading(false);
        }
        clearAuthSession();
        router.push(`/login?redirect=${encodeURIComponent(pathname || '/dashboard')}`);
        return;
      }

      if (localUser && isMounted) {
        setUser(localUser);
        setToken(localToken);
      }

      try {
        const result = await validateSession(true);

        if (!result.isValid) {
          if (isMounted) {
            setUser(null);
            setToken(null);
          }
          clearAuthSession();
          router.push(`/login?redirect=${encodeURIComponent(pathname || '/dashboard')}`);
        } else if (result.user && isMounted) {
          setUser(result.user);
          setToken(localToken);
        }
      } catch (err) {
        console.error('Erro na validação de sessão:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    runValidation();

    return () => {
      isMounted = false;
    };
  }, [pathname, router]);

  // Ação de logout oficial utilizando serviços existentes
  const logout = useCallback(async () => {
    try {
      await logoutApi();
    } finally {
      setUser(null);
      setToken(null);
      clearAuthSession();
      router.push('/login');
    }
  }, [router]);

  const value: AuthContextValue = {
    user,
    token,
    isLoading,
    isAuthenticated: Boolean(token && user),
    logout,
    refreshSession: checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser utilizado dentro de um AuthProvider');
  }
  return context;
}
