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

export const getMyReservations = async (userId) => {
  try {
    const response = await apiClient.get(API_CONFIG.RESERVAS.BY_USUARIO(userId));
    return response.data;
  } catch (error) {
    console.error("Error al obtener mis reservas:", error.response?.data || error.message);
    throw error;
  }
};

export const createReservation = async (userId, fecha, hora) => {
  try {
    const response = await apiClient.post(API_CONFIG.RESERVAS.BASE, {
      userId,
      fecha,
      hora,
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear reserva:", error.response?.data || error.message);
    throw error;
  }
};

// ----------------------------
// ADMIN
// ----------------------------

export const getAllReservations = async () => {
  try {
    const response = await apiClient.get(API_CONFIG.RESERVAS.BASE);
    return response.data;
  } catch (error) {
    console.error("Error al obtener todas las reservas:", error.response?.data || error.message);
    throw error;
  }
};

export const updateReservationStatus = async (id, newStatus) => {
  try {
    const response = await apiClient.patch(
      API_CONFIG.RESERVAS.BY_ID(id),
      { status: newStatus }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error al actualizar estado de reserva:",
      error.response?.data || error.message
    );
    throw error;
  }
};