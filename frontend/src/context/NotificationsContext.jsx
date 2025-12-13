import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const NotificationsContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error("useNotifications debe usarse dentro de NotificationsProvider");
  }
  return context;
};

export const NotificationsProvider = ({ children }) => {
  const { user } = useAuth();
  const [pendingReservations, setPendingReservations] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [lastCheck, setLastCheck] = useState(Date.now());

  const checkNotifications = async () => {
    if (!user || user.rol !== 1) return; // Solo para admins (rol 1)

    try {
      // Importar dinámicamente solo cuando sea necesario
      const { getAllReservations } = await import("../api/reservationsApi");
      const { getAllOrders } = await import("../api/ordersApi");
      
      // Verificar reservas pendientes
      const reservations = await getAllReservations();
      const pending = reservations.filter(r => r.estado === "pendiente").length;
      setPendingReservations(pending);

      // Verificar SOLO pedidos pendientes (no incluir "preparando")
      const orders = await getAllOrders();
      const pendingOrdersCount = orders.filter(
        o => o.estado === "Pendiente"
      ).length;
      setPendingOrders(pendingOrdersCount);

      setLastCheck(Date.now());
    } catch (error) {
      console.error("Error al verificar notificaciones:", error);
    }
  };

  // Verificar notificaciones cada 30 segundos si es admin
  useEffect(() => {
    if (user && user.rol === 1) { // Solo para admins
      checkNotifications();
      const interval = setInterval(checkNotifications, 30000); // 30 segundos
      return () => clearInterval(interval);
    } else {
      // Limpiar estados si no es admin
      setPendingReservations(0);
      setPendingOrders(0);
    }
  }, [user]);

  const value = {
    pendingReservations,
    pendingOrders,
    totalNotifications: pendingReservations + pendingOrders,
    checkNotifications,
    lastCheck
  };

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
};
