import { createContext, useContext, useState, useEffect } from "react";

const CarritoContext = createContext(null);

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    console.error("⚠️ useCarrito se está usando fuera del CarritoProvider");
    // Retornar valores por defecto en lugar de lanzar error
    return {
      items: [],
      agregarItem: () => console.warn("agregarItem llamado fuera del provider"),
      eliminarItem: () => console.warn("eliminarItem llamado fuera del provider"),
      actualizarCantidad: () => console.warn("actualizarCantidad llamado fuera del provider"),
      limpiarCarrito: () => console.warn("limpiarCarrito llamado fuera del provider"),
      totalItems: 0,
    };
  }
  return context;
};

export function CarritoProvider({ children }) {
  const [items, setItems] = useState([]);

  // Cargar carrito desde localStorage
  useEffect(() => {
    try {
      const savedCarrito = localStorage.getItem("carrito");
      if (savedCarrito) {
        setItems(JSON.parse(savedCarrito));
      }
    } catch (error) {
      console.error("Error al cargar carrito:", error);
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(items));
  }, [items]);

  const agregarItem = (plato) => {
    setItems((prev) => {
      const existe = prev.find((item) => item.id === plato.id);
      if (existe) {
        return prev.map((item) =>
          item.id === plato.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prev, { ...plato, cantidad: 1 }];
    });
  };

  const eliminarItem = (platoId) => {
    setItems((prev) => prev.filter((item) => item.id !== platoId));
  };

  const actualizarCantidad = (platoId, cantidad) => {
    if (cantidad <= 0) {
      eliminarItem(platoId);
    } else {
      setItems((prev) =>
        prev.map((item) =>
          item.id === platoId ? { ...item, cantidad } : item
        )
      );
    }
  };

  const limpiarCarrito = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.cantidad, 0);

  return (
    <CarritoContext.Provider
      value={{
        items,
        agregarItem,
        eliminarItem,
        actualizarCantidad,
        limpiarCarrito,
        totalItems,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}
