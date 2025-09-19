"use client";

export interface AdminUser {
  email: string;
  name?: string;
  role?: string;
}

export const getAdminUser = (): AdminUser | null => {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("adminToken");
  const userStr = localStorage.getItem("adminUser");

  if (!token || !userStr) return null;

  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

export const isAdminAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false;
  const token = localStorage.getItem("adminToken");
  return !!token;
};

export const logoutAdmin = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminUser");
  window.location.href = "/admin/login";
};

export const setAdminSession = (token: string, user: AdminUser) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("adminToken", token);
  localStorage.setItem("adminUser", JSON.stringify(user));
};

/**
 * Fake login function for demo purposes.
 * Replace with real API call in production.
 */
export const loginAdmin = (email: string, password: string): boolean => {
  // Hard-coded check (replace with backend validation later)
  if (email === "admin@example.com" && password === "password") {
    const dummyToken = "fake-jwt-token-123"; // can be any string
    const dummyUser: AdminUser = { email, name: "Admin User", role: "superadmin" };
    setAdminSession(dummyToken, dummyUser);
    return true;
  }
  return false;
};
