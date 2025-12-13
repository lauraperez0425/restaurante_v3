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

// ----------------------------
// USUARIO NORMAL
// ----------------------------

export const getMyOrders = async (userId) => {
  try {
    const response = await apiClient.get(API_CONFIG.PEDIDOS.BY_USUARIO(userId));
    return response.data;
  } catch (error) {
    console.error("Error al obtener mis pedidos:", error.response?.data || error.message);
    throw error;
  }
};

export const getOrderById = async (id) => {
  try {
    const response = await apiClient.get(API_CONFIG.PEDIDOS.BY_ID(id));
    return response.data;
  } catch (error) {
    console.error("Error al obtener pedido:", error.response?.data || error.message);
    throw error;
  }
};

export const createOrder = async (userId, carrito) => {
  try {
    const response = await apiClient.post(API_CONFIG.PEDIDOS.BASE, {
      userId,
      items: carrito,
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear pedido:", error.response?.data || error.message);
    throw error;
  }
};

// ----------------------------
// ADMIN
// ----------------------------

export const getAllOrders = async () => {
  try {
    const response = await apiClient.get(API_CONFIG.PEDIDOS.BASE);
    return response.data;
  } catch (error) {
    console.error("Error al obtener todos los pedidos:", error.response?.data || error.message);
    throw error;
  }
};

export const updateOrderStatus = async (id, newStatus) => {
  try {
    const response = await apiClient.patch(API_CONFIG.PEDIDOS.BY_ID(id), {
      estado: newStatus,
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar estado del pedido:", error.response?.data || error.message);
    throw error;
  }
};