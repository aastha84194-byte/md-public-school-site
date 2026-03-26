"use client";

import React, { useState, useEffect, createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "./api-client";

interface User {
  id: number;
  username: string;
  email: string;
  full_name: string;
  role: {
    name: string;
  };
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (loginData: { username_or_email: string; password: string }) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

import { storage } from "./storage";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedToken = storage.getToken();
    const storedUser = storage.getUser();

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const login = async (loginData: { username_or_email: string; password: string }) => {
    try {
      const data = await apiRequest("/auth/login", "POST", loginData);
      const { access_token } = data;
      
      const userInfo = await apiRequest("/auth/me", "GET", null, access_token);

      setToken(access_token);
      setUser(userInfo);
      
      storage.setToken(access_token);
      storage.setUser(userInfo);

      const role = userInfo.role?.name || 'student';
      if (role === "admin") router.push("/admin/dashboard");
      else if (role === "teacher") router.push("/teacher/dashboard");
      else router.push("/student/dashboard");
      
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    storage.clear();
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
