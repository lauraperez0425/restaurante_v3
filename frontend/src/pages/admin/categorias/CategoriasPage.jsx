import { useEffect, useState } from "react";
import { getCategorias, eliminarCategoria } from "../../../api/categoriasApi";
import { Link } from "react-router-dom";

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState([]);

  async function cargar() {
    try {
      const data = await getCategorias();
      setCategorias(data);
    } catch (error) {
      console.error("Error al cargar categorías:", error);
      alert("Error al cargar categorías");
    }
  }

  useEffect(() => {
    cargar();
  }, []);

  async function borrar(id) {
    if (!window.confirm("¿Estás seguro de eliminar esta categoría?")) return;
    
    try {
      await eliminarCategoria(id);
      alert("Categoría eliminada correctamente");
      cargar();
    } catch (error) {
      console.error("Error al eliminar:", error);
      
      // Extraer el mensaje de error del backend
      const mensajeError = error.response?.data?.message || 
                          error.response?.data?.error ||
                          "Error al eliminar la categoría";
      
      alert(mensajeError);
    }
  }

  return (
    <div className="page" style={{ minHeight: "100vh", background: "#f6f8fa", padding: "2rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem", color: "#2c3e50" }}>Categorías</h1>

      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Link 
          to="/categorias/crear" 
          style={{
            display: "inline-block",
            padding: "0.8rem 2rem",
            borderRadius: 10,
            background: "#27ae60",
            color: "#fff",
            fontWeight: 600,
            textDecoration: "none",
            fontSize: "1rem",
            boxShadow: "0 2px 8px rgba(39, 174, 96, 0.3)",
            transition: "all 0.2s"
          }}
        >
          ➕ Nueva Categoría
        </Link>
      </div>

      {categorias.length === 0 && (
        <p style={{ textAlign: "center", color: "#888", marginTop: "3rem" }}>
          No hay categorías. Crea una nueva categoría.
        </p>
      )}

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", 
        gap: "1.5rem", 
        maxWidth: 1100, 
        margin: "0 auto" 
      }}>
        {categorias.map((c) => (
          <div
            key={c.id}
            style={{
              background: "#fff",
              borderRadius: 16,
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              border: "1px solid #e1e8ed",
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem"
            }}
          >
            <h3 style={{ 
              color: "#1a3557", 
              marginBottom: "0.5rem", 
              fontWeight: 600, 
              fontSize: "1.2rem" 
            }}>
              {c.nombre}
            </h3>

            <div style={{ display: "flex", gap: "0.5rem", marginTop: "auto" }}>
              <Link
                to={`/categorias/editar/${c.id}`}
                style={{
                  flex: 1,
                  textAlign: "center",
                  padding: "0.5rem 1rem",
                  borderRadius: 8,
                  background: "#2980b9",
                  color: "#fff",
                  fontWeight: 600,
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  transition: "background 0.2s"
                }}
              >
                Editar
              </Link>

              <button
                onClick={() => borrar(c.id)}
                style={{
                  flex: 1,
                  padding: "0.5rem 1rem",
                  borderRadius: 8,
                  background: "#e74c3c",
                  color: "#fff",
                  fontWeight: 600,
                  border: "none",
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  transition: "background 0.2s"
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}