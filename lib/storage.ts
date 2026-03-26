"use client";

export const storage = {
  getToken: () => {
    if (typeof window === "undefined") return null;
    return sessionStorage.getItem("token");
  },
  setToken: (token: string) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("token", token);
      // Also set cookie for middleware
      document.cookie = `token=${token}; path=/; samesite=strict`;
    }
  },
  getUser: () => {
    if (typeof window === "undefined") return null;
    const user = sessionStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
  setUser: (user: any) => {
    if (typeof window !== "undefined") {
      const userStr = JSON.stringify(user);
      sessionStorage.setItem("user", userStr);
      document.cookie = `user=${userStr}; path=/; samesite=strict`;
    }
  },
  clear: () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }
};
