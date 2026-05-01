import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export interface UserInfo {
  id:       number;
  name:     string;
  email:    string;
  phone:    string;
  address:  string;
  isAdmin:  boolean;
  isSeller: boolean;
  isBuyer:  boolean;
  status:   string;
} 

interface AuthContextType {
  user:       UserInfo | null;
  token:      string | null;
  login:      (token: string, user: UserInfo) => void;
  logout:     () => void;
  isAdmin:    boolean;
  isSeller:   boolean;
  isBuyer:    boolean;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user,  setUser]  = useState<UserInfo | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Restore session from localStorage on app load
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("token");
      const storedUser  = localStorage.getItem("user");
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, []);

  const login = (newToken: string, newUser: UserInfo) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem("token", newToken);
    localStorage.setItem("user",  JSON.stringify(newUser));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      login,
      logout,
      isAdmin:    user?.isAdmin  ?? false,
      isSeller:   user?.isSeller ?? false,
      isBuyer:    user?.isBuyer  ?? false,
      isLoggedIn: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}