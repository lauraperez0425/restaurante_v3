import axios from "axios";
import API_CONFIG from "../config/api.config";

// Crear instancia de axios con la configuración del servicio de autenticación
const authClient = axios.create({
  baseURL: API_CONFIG.AUTH_SERVICE.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginRequest = async (email, password) => {
  try {
    const response = await authClient.post(API_CONFIG.AUTH_SERVICE.LOGIN, {
      email,
      password,
    });
    return response.data; // { user, token }
  } catch (error) {
    console.error("Error en login:", error.response?.data || error.message);
    throw error;
  }
};

export const registerRequest = async (userData) => {
  try {
    const response = await authClient.post(API_CONFIG.AUTH_SERVICE.REGISTER, userData);
    return response.data;
  } catch (error) {
    console.error("Error en registro:", error.response?.data || error.message);
    throw error;
  }
};