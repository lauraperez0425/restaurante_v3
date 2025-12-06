import { Routes, Route } from "react-router-dom";

import Navbar from "../components/Navbar";
import ProtectedRoute from "../components/ProtectedRoute";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";

import PlatosPage from "../pages/PlatosPage";
import CrearPlatoPage from "../pages/CrearPlatoPage";
import EditarPlatoPage from "../pages/EditarPlatoPage";

import CategoriasPage from "../pages/CategoriasPage";
import CrearCategoriaPage from "../pages/CrearCategoriaPage";
import EditarCategoriaPage from "../pages/EditarCategoriaPage";

import CarritoPage from "../pages/CarritoPage";
import CrearPedidoPage from "../pages/CrearPedidoPage";
import MisPedidosPage from "../pages/MisPedidosPage";
import PedidosAdminPage from "../pages/PedidosAdminPage";
import PedidoDetallePage from "../pages/PedidoDetallePage";
import CambiarEstadoPedidoPage from "../pages/CambiarEstadoPedidoPage";

import CrearReservaPage from "../pages/CrearReservaPage";
import MisReservasPage from "../pages/MisReservasPage";
import ReservasAdminPage from "../pages/ReservasAdminPage";

export default function AppRouter() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

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
      </Routes>
    </>
  );
}