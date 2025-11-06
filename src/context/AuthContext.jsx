import { createContext, useContext, useEffect, useState } from "react";
import { getUserFromToken } from "../utils/jwt";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Uygulama açılırken localStorage'daki token'ı al
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);

  // Token değişince kullanıcı bilgisini yeniden çöz
  useEffect(() => {
    if (!token) { setUser(null); return; }
    setUser(getUserFromToken(token));
  }, [token]);

  // Giriş yapan kullanıcı için çağırılır
  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  // Çıkış için çağırılır
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
