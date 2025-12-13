import { createContext, useContext, useState, useEffect } from "react";
import { loginRequest } from "../api/authApi";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [showWelcome, setShowWelcome] = useState(false);

  // Cargar sesión desde localStorage
  useEffect(() => {
    try {
      const savedToken = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");
      if (savedToken && savedUser && savedUser !== "undefined") {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("Error al cargar sesión:", error);
      // Limpiar localStorage si hay datos corruptos
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, []);

  const login = async (email, password) => {
    console.log("AuthContext: Llamando a loginRequest...");
    const data = await loginRequest(email, password);
    console.log("AuthContext: Respuesta recibida:", data);
    
    // El backend devuelve { ok, mensaje, token, usuario }
    const token = data.token;
    const user = data.usuario || data.user; // Soportar ambos formatos
    
    if (!token) {
      throw new Error("Respuesta del servidor inválida: falta token");
    }
    
    setUser(user);
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    console.log("AuthContext: Login completado, usuario guardado");
    
    // Mostrar animación de bienvenida solo para clientes (rol 2)
    if (user.rol === 2) {
      setShowWelcome(true);
      setTimeout(() => setShowWelcome(false), 3100);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, showWelcome }}>
      {children}
    </AuthContext.Provider>
  );
}