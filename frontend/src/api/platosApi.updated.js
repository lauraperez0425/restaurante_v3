import {
  mockGetPlatos,
  mockCrearPlato,
  mockEditarPlato,
  mockEliminarPlato,
} from "../mock/mockPlatos";
import API_CONFIG from "../config/api.config";

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

  // GET /platos/:id
  getById: async (id) => {
    if (USE_MOCK) {
      const platos = mockGetPlatos();
      return platos.find(p => p.id === Number(id));
    }

    try {
      const response = await fetch(
        `${API_CONFIG.MENU_SERVICE.BASE_URL}${API_CONFIG.MENU_SERVICE.PLATOS}/${id}`
      );
      if (!response.ok) throw new Error("Error fetching plato");
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
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_CONFIG.MENU_SERVICE.BASE_URL}${API_CONFIG.MENU_SERVICE.PLATOS}`,
        {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            nombre: plato.nombre,
            descripcion: plato.descripcion,
            precio: parseFloat(plato.precio),
            disponible: plato.disponible ?? true,
            categoria_id: Number(plato.categoria_id),
          }),
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
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_CONFIG.MENU_SERVICE.BASE_URL}${API_CONFIG.MENU_SERVICE.PLATOS}/${id}`,
        {
          method: "PUT",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            nombre: plato.nombre,
            descripcion: plato.descripcion,
            precio: parseFloat(plato.precio),
            disponible: plato.disponible ?? true,
            categoria_id: Number(plato.categoria_id),
          }),
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
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_CONFIG.MENU_SERVICE.BASE_URL}${API_CONFIG.MENU_SERVICE.PLATOS}/${id}`,
        { 
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
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
export const getPlatoById = platosAPI.getById;
