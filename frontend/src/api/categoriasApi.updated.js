import {
  mockGetCategorias,
  mockCrearCategoria,
  mockEditarCategoria,
  mockEliminarCategoria,
} from "../mock/mockCategorias";
import API_CONFIG from "../config/api.config";

// Cambiar USE_MOCK a false cuando el backend esté listo
const USE_MOCK = true;

// Funciones para usar cuando el backend esté listo
const categoriasAPI = {
  // GET /categorias
  getAll: async () => {
    if (USE_MOCK) return mockGetCategorias();
    
    try {
      const response = await fetch(
        `${API_CONFIG.MENU_SERVICE.BASE_URL}${API_CONFIG.MENU_SERVICE.CATEGORIAS}`
      );
      if (!response.ok) throw new Error("Error fetching categorias");
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  // GET /categorias/:id
  getById: async (id) => {
    if (USE_MOCK) {
      const categorias = mockGetCategorias();
      return categorias.find(c => c.id === Number(id));
    }

    try {
      const response = await fetch(
        `${API_CONFIG.MENU_SERVICE.BASE_URL}${API_CONFIG.MENU_SERVICE.CATEGORIAS}/${id}`
      );
      if (!response.ok) throw new Error("Error fetching categoria");
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  // POST /categorias
  create: async (nombre) => {
    if (USE_MOCK) return mockCrearCategoria(nombre);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_CONFIG.MENU_SERVICE.BASE_URL}${API_CONFIG.MENU_SERVICE.CATEGORIAS}`,
        {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ nombre }),
        }
      );
      if (!response.ok) throw new Error("Error creating categoria");
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  // PUT /categorias/:id
  update: async (id, nombre) => {
    if (USE_MOCK) return mockEditarCategoria(id, nombre);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_CONFIG.MENU_SERVICE.BASE_URL}${API_CONFIG.MENU_SERVICE.CATEGORIAS}/${id}`,
        {
          method: "PUT",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ nombre }),
        }
      );
      if (!response.ok) throw new Error("Error updating categoria");
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  // DELETE /categorias/:id
  delete: async (id) => {
    if (USE_MOCK) return mockEliminarCategoria(id);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_CONFIG.MENU_SERVICE.BASE_URL}${API_CONFIG.MENU_SERVICE.CATEGORIAS}/${id}`,
        { 
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );
      if (!response.ok) throw new Error("Error deleting categoria");
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },
};

// Mantener las funciones antiguas para compatibilidad
export const getCategorias = categoriasAPI.getAll;
export const crearCategoria = categoriasAPI.create;
export const editarCategoria = categoriasAPI.update;
export const eliminarCategoria = categoriasAPI.delete;
export const getCategoriaById = categoriasAPI.getById;
