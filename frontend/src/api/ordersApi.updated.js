import {
  mockGetAllOrders,
  mockGetMyOrders,
  mockGetOrderById,
  mockCreateOrder,
  mockUpdateOrderStatus,
} from "../mock/mockOrders";
import API_CONFIG from "../config/api.config";

// Cambiar USE_MOCK a false cuando el backend esté listo
const USE_MOCK = true;

// Funciones para usar cuando el backend esté listo
const ordersAPI = {
  // GET /pedidos - Obtener todos los pedidos (solo admin)
  getAll: async () => {
    if (USE_MOCK) return mockGetAllOrders();
    
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_CONFIG.ORDER_SERVICE.BASE_URL}${API_CONFIG.ORDER_SERVICE.PEDIDOS}`,
        {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );
      if (!response.ok) throw new Error("Error fetching orders");
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  // GET /pedidos/usuario/:userId - Obtener pedidos del usuario
  getByUserId: async (userId) => {
    if (USE_MOCK) return mockGetMyOrders(userId);
    
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_CONFIG.ORDER_SERVICE.BASE_URL}${API_CONFIG.ORDER_SERVICE.PEDIDOS}/usuario/${userId}`,
        {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );
      if (!response.ok) throw new Error("Error fetching orders");
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  // GET /pedidos/:id
  getById: async (id) => {
    if (USE_MOCK) return mockGetOrderById(id);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_CONFIG.ORDER_SERVICE.BASE_URL}${API_CONFIG.ORDER_SERVICE.PEDIDOS}/${id}`,
        {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );
      if (!response.ok) throw new Error("Error fetching order");
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  // POST /pedidos - Crear pedido
  create: async (carrito) => {
    if (USE_MOCK) return mockCreateOrder(carrito);

    try {
      const token = localStorage.getItem("token");
      const usuario_id = JSON.parse(localStorage.getItem("user")).id;
      
      const response = await fetch(
        `${API_CONFIG.ORDER_SERVICE.BASE_URL}${API_CONFIG.ORDER_SERVICE.PEDIDOS}`,
        {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            usuario_id,
            items: carrito.map(item => ({
              plato_id: item.plato_id,
              nombre: item.nombre,
              cantidad: item.cantidad,
              precio: item.precio,
              subtotal: item.subtotal,
            })),
            total: carrito.reduce((sum, item) => sum + item.subtotal, 0),
          }),
        }
      );
      if (!response.ok) throw new Error("Error creating order");
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  // PUT /pedidos/:id - Actualizar estado del pedido
  updateStatus: async (id, estado) => {
    if (USE_MOCK) return mockUpdateOrderStatus(id, estado);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_CONFIG.ORDER_SERVICE.BASE_URL}${API_CONFIG.ORDER_SERVICE.PEDIDOS}/${id}`,
        {
          method: "PUT",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ estado }),
        }
      );
      if (!response.ok) throw new Error("Error updating order status");
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  // DELETE /pedidos/:id
  delete: async (id) => {
    if (USE_MOCK) return null;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_CONFIG.ORDER_SERVICE.BASE_URL}${API_CONFIG.ORDER_SERVICE.PEDIDOS}/${id}`,
        { 
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );
      if (!response.ok) throw new Error("Error deleting order");
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },
};

// Mantener las funciones antiguas para compatibilidad
export const getMyOrders = (userId) => ordersAPI.getByUserId(userId);
export const getAllOrders = ordersAPI.getAll;
export const getOrderById = ordersAPI.getById;
export const createOrder = ordersAPI.create;
export const updateOrderStatus = ordersAPI.updateStatus;
