"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  fetchCurrentCustomer,
  logoutCustomer,
  type AuthUser,
} from "./api";

export type User = AuthUser;

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (userData: User, token: string) => void;
  logout: () => void;
  updateUser: (userData: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const TOKEN_KEY = "oasis_token";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const restoreStarted = useRef(false);

  // Sayfa açılışında localStorage'daki token'ı doğrular. Tüm setState
  // çağrıları bilinçli olarak tek bir async callback'te toplanır; böylece
  // effect gövdesinde senkron state güncellemesi (cascading render) olmaz.
  useEffect(() => {
    // StrictMode dev'de effect'i iki kez çalıştırır; aynı token için
    // backend'e çift istek atılmasını (ve çift 401'i) önler.
    if (restoreStarted.current) return;
    restoreStarted.current = true;

    let cancelled = false;

    async function restoreSession(): Promise<{ user: User; token: string } | null> {
      const storedToken = localStorage.getItem(TOKEN_KEY);
      if (!storedToken) return null;

      try {
        return { user: await fetchCurrentCustomer(storedToken), token: storedToken };
      } catch {
        localStorage.removeItem(TOKEN_KEY);
        return null;
      }
    }

    restoreSession().then((session) => {
      if (cancelled) return;
      setUser(session?.user ?? null);
      setToken(session?.token ?? null);
      setIsLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const login = (userData: User, newToken: string) => {
    localStorage.setItem(TOKEN_KEY, newToken);
    setUser(userData);
    setToken(newToken);
  };

  const logout = () => {
    const currentToken = localStorage.getItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
    setToken(null);
    if (currentToken) logoutCustomer(currentToken).catch(() => {});
    router.push("/login");
  };

  const updateUser = (userData: User) => {
    setUser(userData);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isLoading, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
