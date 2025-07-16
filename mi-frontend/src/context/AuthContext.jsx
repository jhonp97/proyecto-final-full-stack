"use client";

import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // para saber si se está verificando el token

  const fetchUserData= async ()=>{

    
      // al cargar la app intenta recuperar el token delocalStorage
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        setToken(storedToken);
        try{
           const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
          const response = await fetch(`${apiUrl}/auth/me`, {
          headers: { 'Authorization': `Bearer ${storedToken}` }
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data.data);
        } else {
          logout(); //si el token no es valido cierro sesion
        }
        }catch(error){
          console.error("Error al veriificar token: ", error);
          logout()
        }
      }
      setLoading(false);
    }

    useEffect(() => {
      fetchUserData()
    },[]); // Dependencias vacías para que se ejecute una vez al montar el componente

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
    <AuthContext.Provider value={{ user, token, login, logout, loading, fetchUserData, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

//esto es para no estar escribiendo useContex(AuthContext) todo el rato. Solo uso useAuth() y ya con eso tengo acceso al  token, login, logout y eso.
export const useAuth = () => {
  return useContext(AuthContext);
};
