/**
 * Platos API - Ejemplo de integración con microservicio real
 * Actualmente usa mock, pero está listo para usar la API real
 */

import API_CONFIG from "../config/api.config";
import {
  mockGetPlatos,
  mockCrearPlato,
  mockEditarPlato,
  mockEliminarPlato,
} from "../mock/mockPlatos";

// Cambiar USE_MOCK a false cuando el backend esté listo
const USE_MOCK = true;

// Funciones para usar cuando el backend esté listo
const platosAPI = {
  // GET /platos
  getAll: async () => {
    if (USE_MOCK) return mockGetPlatos();
    
    try {
      const response = await fetch(
        `${API_CONFIG.MENU_SERVICE.BASE_URL}${API_CONFIG.MENU_SERVICE.PLATOS}`
      );
      if (!response.ok) throw new Error("Error fetching platos");
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  // POST /platos
  create: async (plato) => {
    if (USE_MOCK) return mockCrearPlato(plato);

    try {
      const response = await fetch(
        `${API_CONFIG.MENU_SERVICE.BASE_URL}${API_CONFIG.MENU_SERVICE.PLATOS}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(plato),
        }
      );
      if (!response.ok) throw new Error("Error creating plato");
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  // PUT /platos/:id
  update: async (id, plato) => {
    if (USE_MOCK) return mockEditarPlato(id, plato);

    try {
      const response = await fetch(
        `${API_CONFIG.MENU_SERVICE.BASE_URL}${API_CONFIG.MENU_SERVICE.PLATOS}/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(plato),
        }
      );
      if (!response.ok) throw new Error("Error updating plato");
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  // DELETE /platos/:id
  delete: async (id) => {
    if (USE_MOCK) return mockEliminarPlato(id);

    try {
      const response = await fetch(
        `${API_CONFIG.MENU_SERVICE.BASE_URL}${API_CONFIG.MENU_SERVICE.PLATOS}/${id}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Error deleting plato");
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },
};

// Mantener las funciones antiguas para compatibilidad
export const getPlatos = platosAPI.getAll;
export const crearPlato = platosAPI.create;
export const editarPlato = platosAPI.update;
export const eliminarPlato = platosAPI.delete;
