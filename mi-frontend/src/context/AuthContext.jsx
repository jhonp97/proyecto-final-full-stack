"use client";

import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // para saber si se está verificando el token

  useEffect(() => {
    // al cargar la app intenta recuperar el token delocalStorage
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      // aqui tengo que hacer el llamado a mi api del back y obtener los datos del usuario, ahora lo simulo (recordatorio para cuando haga el back)

      setToken(storedToken);
      setUser({
        /* datos del usuario del back */
      });
    }
    setLoading(false);
  }, []);

  const login = (userData, userToken) => {
    localStorage.setItem("authToken", userToken);
    setUser(userData);
    setToken(userToken);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

//esto es para no estar escribiendo useContex(AuthContext) todo el rato. Solo uso useAuth() y ya con eso tengo acceso al  token, login, logout y eso.
export const useAuth = () => {
  return useContext(AuthContext);
};
