import { Routes, Route } from "react-router-dom";

import Navbar from "../components/Navbar";
import ProtectedRoute from "../components/ProtectedRoute";

// Auth & Public
import HomePage from "../pages/auth/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import RegistroPage from "../pages/auth/RegistroPage";

// Cliente - Platos
import PlatosPage from "../pages/cliente/platos/PlatosPage";

// Cliente - Pedidos
import CarritoPage from "../pages/cliente/pedidos/CarritoPage";
import CrearPedidoPage from "../pages/cliente/pedidos/CrearPedidoPage";
import MisPedidosPage from "../pages/cliente/pedidos/MisPedidosPage";
import PedidoDetallePage from "../pages/cliente/pedidos/PedidoDetallePage";

// Cliente - Reservas
import CrearReservaPage from "../pages/cliente/reservas/CrearReservaPage";
import MisReservasPage from "../pages/cliente/reservas/MisReservasPage";

// Admin - Platos
import CrearPlatoPage from "../pages/admin/platos/CrearPlatoPage";
import EditarPlatoPage from "../pages/admin/platos/EditarPlatoPage";

// Admin - Categorías
import CategoriasPage from "../pages/admin/categorias/CategoriasPage";
import CrearCategoriaPage from "../pages/admin/categorias/CrearCategoriaPage";
import EditarCategoriaPage from "../pages/admin/categorias/EditarCategoriaPage";

// Admin - Pedidos
import PedidosAdminPage from "../pages/admin/pedidos/PedidosAdminPage";
import CambiarEstadoPedidoPage from "../pages/admin/pedidos/CambiarEstadoPedidoPage";

// Admin - Reservas
import ReservasAdminPage from "../pages/admin/reservas/ReservasAdminPage";
import ReservaDetallePage from "../pages/admin/reservas/ReservaDetallePage";

export default function AppRouter() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegistroPage />} />

        <Route
          path="/platos"
          element={
            <ProtectedRoute>
              <PlatosPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/platos/crear"
          element={
            <ProtectedRoute requiredRole="admin">
              <CrearPlatoPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/platos/editar/:id"
          element={
            <ProtectedRoute requiredRole="admin">
              <EditarPlatoPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/categorias"
          element={
            <ProtectedRoute requiredRole="admin">
              <CategoriasPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/categorias/crear"
          element={
            <ProtectedRoute requiredRole="admin">
              <CrearCategoriaPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/categorias/editar/:id"
          element={
            <ProtectedRoute requiredRole="admin">
              <EditarCategoriaPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/carrito"
          element={
            <ProtectedRoute>
              <CarritoPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mis-pedidos"
          element={
            <ProtectedRoute>
              <MisPedidosPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pedidos/crear"
          element={
            <ProtectedRoute>
              <CrearPedidoPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pedidos"
          element={
            <ProtectedRoute requiredRole="admin">
              <PedidosAdminPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pedidos/admin/:id"
          element={
            <ProtectedRoute requiredRole="admin">
              <CambiarEstadoPedidoPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pedidos/:id"
          element={
            <ProtectedRoute requiredRole="admin">
              <PedidoDetallePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reservas/crear"
          element={
            <ProtectedRoute>
              <CrearReservaPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mis-reservas"
          element={
            <ProtectedRoute>
              <MisReservasPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reservas"
          element={
            <ProtectedRoute requiredRole="admin">
              <ReservasAdminPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reservas/:id"
          element={
            <ProtectedRoute requiredRole="admin">
              <ReservaDetallePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}