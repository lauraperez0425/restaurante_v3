import axios from "axios";
import API_CONFIG from "../config/api.config";

// Crear instancia de axios para el servicio de menú
const menuClient = axios.create({
  baseURL: API_CONFIG.MENU_SERVICE.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Agregar token en las solicitudes si existe
menuClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getCategorias = async () => {
  try {
    const response = await menuClient.get(API_CONFIG.MENU_SERVICE.CATEGORIAS);
    return response.data;
  } catch (error) {
    console.error("Error al obtener categorías:", error.response?.data || error.message);
    throw error;
  }
};

export const crearCategoria = async (nombre) => {
  try {
    const response = await menuClient.post(API_CONFIG.MENU_SERVICE.CATEGORIAS, { nombre });
    return response.data;
  } catch (error) {
    console.error("Error al crear categoría:", error.response?.data || error.message);
    throw error;
  }
};

export const editarCategoria = async (id, nombre) => {
  try {
    const response = await menuClient.patch(
      `${API_CONFIG.MENU_SERVICE.CATEGORIAS}/${id}`,
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
    const response = await menuClient.delete(`${API_CONFIG.MENU_SERVICE.CATEGORIAS}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar categoría:", error.response?.data || error.message);
    throw error;
  }
};
