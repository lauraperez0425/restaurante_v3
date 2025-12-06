import axios from "axios";
import API_CONFIG from "../config/api.config";

// Crear instancia de axios con la configuración del API Gateway
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginRequest = async (email, password) => {
  try {
    const response = await apiClient.post(API_CONFIG.AUTH.LOGIN, {
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
    const response = await apiClient.post(API_CONFIG.AUTH.REGISTER, userData);
    return response.data;
  } catch (error) {
    console.error("Error en registro:", error.response?.data || error.message);
    throw error;
  }
};