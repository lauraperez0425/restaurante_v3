import { mockLogin, mockRegister } from "../mock/mockAuth";
import API_CONFIG from "../config/api.config";

// Cambiar USE_MOCK a false cuando el backend esté listo
const USE_MOCK = true;

// Funciones para usar cuando el backend esté listo
const authAPI = {
  // POST /auth/login
  login: async (email, password) => {
    if (USE_MOCK) return mockLogin(email, password);

    try {
      const response = await fetch(
        `${API_CONFIG.AUTH_SERVICE.BASE_URL}${API_CONFIG.AUTH_SERVICE.LOGIN}`,
        {
          method: "POST",
          headers: { 
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, password }),
        }
      );
      if (!response.ok) throw new Error("Invalid credentials");
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  // POST /auth/register
  register: async (userData) => {
    if (USE_MOCK) return mockRegister(userData);

    try {
      const response = await fetch(
        `${API_CONFIG.AUTH_SERVICE.BASE_URL}${API_CONFIG.AUTH_SERVICE.REGISTER}`,
        {
          method: "POST",
          headers: { 
            "Content-Type": "application/json"
          },
          body: JSON.stringify(userData),
        }
      );
      if (!response.ok) throw new Error("Registration failed");
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  // POST /auth/validate - Validar token
  validateToken: async (token) => {
    if (USE_MOCK) return { valid: true };

    try {
      const response = await fetch(
        `${API_CONFIG.AUTH_SERVICE.BASE_URL}${API_CONFIG.AUTH_SERVICE.VALIDATE}`,
        {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        }
      );
      if (!response.ok) throw new Error("Invalid token");
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  // POST /auth/logout
  logout: async () => {
    if (USE_MOCK) return { message: "Logout successful" };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_CONFIG.AUTH_SERVICE.BASE_URL}${API_CONFIG.AUTH_SERVICE.LOGOUT}`,
        {
          method: "POST",
          headers: { 
            "Authorization": `Bearer ${token}`
          }
        }
      );
      if (!response.ok) throw new Error("Logout failed");
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },
};

// Exportar las funciones
export const login = authAPI.login;
export const register = authAPI.register;
export const validateToken = authAPI.validateToken;
export const logout = authAPI.logout;
