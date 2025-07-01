import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (access) => {
    localStorage.setItem("access token", access);
    const decoded = jwtDecode(access);
    setUser(decoded);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("access token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (err) {
        logout();
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
