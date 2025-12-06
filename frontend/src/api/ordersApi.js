import axios from "axios";
import API_CONFIG from "../config/api.config";

// Crear instancia de axios para el servicio de pedidos
const orderClient = axios.create({
  baseURL: API_CONFIG.ORDER_SERVICE.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Agregar token en las solicitudes si existe
orderClient.interceptors.request.use((config) => {
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
    const response = await orderClient.get(`${API_CONFIG.ORDER_SERVICE.PEDIDOS}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener mis pedidos:", error.response?.data || error.message);
    throw error;
  }
};

export const getOrderById = async (id) => {
  try {
    const response = await orderClient.get(`${API_CONFIG.ORDER_SERVICE.PEDIDOS}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener pedido:", error.response?.data || error.message);
    throw error;
  }
};

export const createOrder = async (userId, carrito) => {
  try {
    const response = await orderClient.post(API_CONFIG.ORDER_SERVICE.PEDIDOS, {
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
    const response = await orderClient.get(API_CONFIG.ORDER_SERVICE.PEDIDOS);
    return response.data;
  } catch (error) {
    console.error("Error al obtener todos los pedidos:", error.response?.data || error.message);
    throw error;
  }
};

export const updateOrderStatus = async (id, newStatus) => {
  try {
    const response = await orderClient.patch(`${API_CONFIG.ORDER_SERVICE.PEDIDOS}/${id}`, {
      status: newStatus,
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar estado del pedido:", error.response?.data || error.message);
    throw error;
  }
};