/**
 * API Configuration
 * Centraliza todas las URLs de los microservicios
 * Permite cambiar fácilmente las URLs sin modificar los componentes
 */

// URLs de los microservicios
const API_CONFIG = {
  // Microservicio de Menú (menu-service en puerto 3003)
  MENU_SERVICE: {
    BASE_URL: import.meta.env.VITE_MENU_SERVICE_URL || "http://localhost:3003",
    PLATOS: "/platos",
    CATEGORIAS: "/categorias",
  },

  // Microservicio de Pedidos (order-service en puerto 3002)
  ORDER_SERVICE: {
    BASE_URL: import.meta.env.VITE_ORDER_SERVICE_URL || "http://localhost:3002",
    PEDIDOS: "/pedidos",
    PAGOS: "/pagos",
  },

  // Microservicio de Reservas (order-service en puerto 3002)
  RESERVATION_SERVICE: {
    BASE_URL: import.meta.env.VITE_ORDER_SERVICE_URL || "http://localhost:3002",
    RESERVAS: "/reservas",
  },

  // Microservicio de Autenticación (auth-service en puerto 3001)
  AUTH_SERVICE: {
    BASE_URL: import.meta.env.VITE_AUTH_SERVICE_URL || "http://localhost:3001",
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
  },

  // API Core (para funciones generales si es necesario)
  API_CORE: {
    BASE_URL: import.meta.env.VITE_API_CORE_URL || "http://localhost:3000",
  },
};

export default API_CONFIG;
