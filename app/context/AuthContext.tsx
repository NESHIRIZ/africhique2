'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type User = { name: string; email: string };
type AuthState = { user: User | null; loading: boolean };

type AuthContextType = AuthState & {
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; message: string }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_KEY = 'africhique_auth';
const USERS_KEY = 'africhique_users';

type StoredUser = { name: string; email: string; password: string };

const defaultUsers: StoredUser[] = [
  { name: 'Admin', email: 'admin@africhique.co.zw', password: 'P@ssw0rd!' },
];

const normalizeEmail = (email: string) => email.trim().toLowerCase();

function readUsers() {
  try {
    const stored = localStorage.getItem(USERS_KEY);
    if (!stored) return defaultUsers;
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return defaultUsers;
    return parsed as StoredUser[];
  } catch {
    return defaultUsers;
  }
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function readAuth() {
  try {
    const stored = localStorage.getItem(AUTH_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as User;
  } catch {
    return null;
  }
}

function saveAuth(user: User | null) {
  if (!user) localStorage.removeItem(AUTH_KEY);
  else localStorage.setItem(AUTH_KEY, JSON.stringify(user));
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = readAuth();
    setUser(stored);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const users = readUsers();
    const normalized = normalizeEmail(email);
    const match = users.find((u) => normalizeEmail(u.email) === normalized && u.password === password);
    if (!match) return { success: false, message: 'Email or password not found.' };
    const authUser = { name: match.name, email: match.email };
    setUser(authUser);
    saveAuth(authUser);
    return { success: true, message: 'Logged in.' };
  };

  const logout = () => {
    setUser(null);
    saveAuth(null);
  };

  const register = async (name: string, email: string, password: string) => {
    const users = readUsers();
    const normalized = normalizeEmail(email);
    if (users.some((u) => normalizeEmail(u.email) === normalized)) {
      return { success: false, message: 'Email already registered. Log in instead.' };
    }
    const newUser: StoredUser = { name: name.trim(), email: normalized, password };
    const nextUsers = [...users, newUser];
    saveUsers(nextUsers);
    const authUser = { name: newUser.name, email: newUser.email };
    setUser(authUser);
    saveAuth(authUser);
    return { success: true, message: 'Registration successful. Logged in.' };
  };

  const value = useMemo(
    () => ({ user, loading, login, logout, register }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
