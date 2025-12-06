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

export const getPlatos = async () => {
  try {
    const response = await menuClient.get(API_CONFIG.MENU_SERVICE.PLATOS);
    return response.data;
  } catch (error) {
    console.error("Error al obtener platos:", error.response?.data || error.message);
    throw error;
  }
};

export const getPlatoById = async (id) => {
  try {
    const response = await menuClient.get(`${API_CONFIG.MENU_SERVICE.PLATOS}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener plato:", error.response?.data || error.message);
    throw error;
  }
};

export const crearPlato = async (data) => {
  try {
    const response = await menuClient.post(API_CONFIG.MENU_SERVICE.PLATOS, data);
    return response.data;
  } catch (error) {
    console.error("Error al crear plato:", error.response?.data || error.message);
    throw error;
  }
};

export const editarPlato = async (id, data) => {
  try {
    const response = await menuClient.patch(`${API_CONFIG.MENU_SERVICE.PLATOS}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error al editar plato:", error.response?.data || error.message);
    throw error;
  }
};

export const eliminarPlato = async (id) => {
  try {
    const response = await menuClient.delete(`${API_CONFIG.MENU_SERVICE.PLATOS}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar plato:", error.response?.data || error.message);
    throw error;
  }
};