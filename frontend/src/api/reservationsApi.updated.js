import {
  mockGetAllReservations,
  mockGetMyReservations,
  mockGetReservationById,
  mockCreateReservation,
  mockUpdateReservation,
  mockDeleteReservation,
} from "../mock/mockReservations";
import API_CONFIG from "../config/api.config";

// Cambiar USE_MOCK a false cuando el backend esté listo
const USE_MOCK = true;

// Funciones para usar cuando el backend esté listo
const reservationsAPI = {
  // GET /reservas - Obtener todas las reservas (solo admin)
  getAll: async () => {
    if (USE_MOCK) return mockGetAllReservations();
    
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_CONFIG.RESERVATION_SERVICE.BASE_URL}${API_CONFIG.RESERVATION_SERVICE.RESERVAS}`,
        {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );
      if (!response.ok) throw new Error("Error fetching reservations");
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  // GET /reservas/usuario/:userId - Obtener reservas del usuario
  getByUserId: async (userId) => {
    if (USE_MOCK) return mockGetMyReservations(userId);
    
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_CONFIG.RESERVATION_SERVICE.BASE_URL}${API_CONFIG.RESERVATION_SERVICE.RESERVAS}/usuario/${userId}`,
        {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );
      if (!response.ok) throw new Error("Error fetching reservations");
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  // GET /reservas/:id
  getById: async (id) => {
    if (USE_MOCK) return mockGetReservationById(id);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_CONFIG.RESERVATION_SERVICE.BASE_URL}${API_CONFIG.RESERVATION_SERVICE.RESERVAS}/${id}`,
        {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );
      if (!response.ok) throw new Error("Error fetching reservation");
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  // POST /reservas - Crear reserva
  create: async (reservaData) => {
    if (USE_MOCK) return mockCreateReservation(reservaData);

    try {
      const token = localStorage.getItem("token");
      const usuario = JSON.parse(localStorage.getItem("user"));
      
      const response = await fetch(
        `${API_CONFIG.RESERVATION_SERVICE.BASE_URL}${API_CONFIG.RESERVATION_SERVICE.RESERVAS}`,
        {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            usuario_id: usuario.id,
            ...reservaData,
          }),
        }
      );
      if (!response.ok) throw new Error("Error creating reservation");
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  // PUT /reservas/:id - Actualizar reserva
  update: async (id, reservaData) => {
    if (USE_MOCK) return mockUpdateReservation(id, reservaData);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_CONFIG.RESERVATION_SERVICE.BASE_URL}${API_CONFIG.RESERVATION_SERVICE.RESERVAS}/${id}`,
        {
          method: "PUT",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(reservaData),
        }
      );
      if (!response.ok) throw new Error("Error updating reservation");
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  // DELETE /reservas/:id
  delete: async (id) => {
    if (USE_MOCK) return mockDeleteReservation(id);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_CONFIG.RESERVATION_SERVICE.BASE_URL}${API_CONFIG.RESERVATION_SERVICE.RESERVAS}/${id}`,
        { 
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );
      if (!response.ok) throw new Error("Error deleting reservation");
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },
};

// Mantener las funciones antiguas para compatibilidad
export const getMyReservations = (userId) => reservationsAPI.getByUserId(userId);
export const getAllReservations = reservationsAPI.getAll;
export const getReservationById = reservationsAPI.getById;
export const createReservation = reservationsAPI.create;
export const updateReservation = reservationsAPI.update;
export const deleteReservation = reservationsAPI.delete;
