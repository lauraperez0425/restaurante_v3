/**
 * API Configuration
 * Centraliza todas las URLs usando el API Gateway (API Core)
 * El API Core actúa como punto único de entrada a todos los microservicios
 */

// URL base del API Gateway (API Core)
const API_GATEWAY_URL = import.meta.env.VITE_API_GATEWAY_URL || "http://localhost:3000";

// Todas las rutas pasan a través del API Core con prefijo /api
const API_CONFIG = {
  // Base URL del Gateway
  BASE_URL: API_GATEWAY_URL,
  
  // Autenticación (a través del API Gateway)
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
  },

  // Categorías (a través del API Gateway)
  CATEGORIAS: {
    BASE: "/api/categorias",
    BY_ID: (id) => `/api/categorias/${id}`,
  },

  // Platos (a través del API Gateway)
  PLATOS: {
    BASE: "/api/platos",
    BY_ID: (id) => `/api/platos/${id}`,
    BY_CATEGORIA: (categoriaId) => `/api/platos?categoriaId=${categoriaId}`,
  },

  // Pedidos (a través del API Gateway)
  PEDIDOS: {
    BASE: "/api/pedidos",
    BY_ID: (id) => `/api/pedidos/${id}`,
    BY_USUARIO: (usuarioId) => `/api/pedidos/usuario/${usuarioId}`,
  },

  // Reservas (a través del API Gateway)
  RESERVAS: {
    BASE: "/api/reservas",
    BY_ID: (id) => `/api/reservas/${id}`,
    BY_USUARIO: (usuarioId) => `/api/reservas/usuario/${usuarioId}`,
  },

  // Usuarios (a través del API Gateway)
  USUARIOS: {
    BASE: "/api/usuarios",
    BY_ID: (id) => `/api/usuarios/${id}`,
  },
};

export default API_CONFIG;
