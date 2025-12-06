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

export const getCategorias = async () => {
  try {
    const response = await apiClient.get(API_CONFIG.CATEGORIAS.BASE);
    return response.data;
  } catch (error) {
    console.error("Error al obtener categorías:", error.response?.data || error.message);
    throw error;
  }
};

export const crearCategoria = async (nombre) => {
  try {
    const response = await apiClient.post(API_CONFIG.CATEGORIAS.BASE, { nombre });
    return response.data;
  } catch (error) {
    console.error("Error al crear categoría:", error.response?.data || error.message);
    throw error;
  }
};

export const editarCategoria = async (id, nombre) => {
  try {
    const response = await apiClient.patch(
      API_CONFIG.CATEGORIAS.BY_ID(id),
      { nombre }
    );
    return response.data;
  } catch (error) {
    console.error("Error al editar categoría:", error.response?.data || error.message);
    throw error;
  }
};

export const eliminarCategoria = async (id) => {
  try {
    const response = await apiClient.delete(API_CONFIG.CATEGORIAS.BY_ID(id));
    return response.data;
  } catch (error) {
    console.error("Error al eliminar categoría:", error.response?.data || error.message);
    throw error;
  }
};
