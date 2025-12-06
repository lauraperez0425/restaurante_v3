import axios from "axios";
import API_CONFIG from "../config/api.config";

// Crear instancia de axios para el API Gateway
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Agregar token en las solicitudes si existe
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getPlatos = async () => {
  try {
    const response = await apiClient.get(API_CONFIG.PLATOS.BASE);
    return response.data;
  } catch (error) {
    console.error("Error al obtener platos:", error.response?.data || error.message);
    throw error;
  }
};

export const getPlatoById = async (id) => {
  try {
    const response = await apiClient.get(API_CONFIG.PLATOS.BY_ID(id));
    return response.data;
  } catch (error) {
    console.error("Error al obtener plato:", error.response?.data || error.message);
    throw error;
  }
};

export const crearPlato = async (data) => {
  try {
    const response = await apiClient.post(API_CONFIG.PLATOS.BASE, data);
    return response.data;
  } catch (error) {
    console.error("Error al crear plato:", error.response?.data || error.message);
    throw error;
  }
};

export const editarPlato = async (id, data) => {
  try {
    const response = await apiClient.patch(API_CONFIG.PLATOS.BY_ID(id), data);
    return response.data;
  } catch (error) {
    console.error("Error al editar plato:", error.response?.data || error.message);
    throw error;
  }
};

export const eliminarPlato = async (id) => {
  try {
    const response = await apiClient.delete(API_CONFIG.PLATOS.BY_ID(id));
    return response.data;
  } catch (error) {
    console.error("Error al eliminar plato:", error.response?.data || error.message);
    throw error;
  }
};