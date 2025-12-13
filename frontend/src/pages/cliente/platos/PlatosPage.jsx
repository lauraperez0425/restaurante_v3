import { useEffect, useState } from "react";
import { getPlatos, eliminarPlato } from "../../../api/platosApi";
import { getCategorias } from "../../../api/categoriasApi";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useCarrito } from "../../../context/CarritoContext";
import { showToast } from "../../../components/Toast";

export default function PlatosPage() {
  const { user } = useAuth();
  const { agregarItem } = useCarrito();

  const [platos, setPlatos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

  useEffect(() => {
    cargar();
  }, []);

  async function cargar() {
    const listaPlatos = await getPlatos();
    const listaCategorias = await getCategorias();

    setPlatos(listaPlatos);
    setCategorias(listaCategorias);
  }

  async function borrarPlato(id, nombre) {
    if (!window.confirm(`¿Estás seguro de eliminar el plato "${nombre}"?`)) return;
    
    try {
      await eliminarPlato(id);
      alert("Plato eliminado correctamente");
      cargar(); // Recargar la lista
    } catch (error) {
      console.error("Error al eliminar plato:", error);
      const mensajeError = error.response?.data?.message || 
                          error.response?.data?.error ||
                          "Error al eliminar el plato";
      alert(mensajeError);
    }
  }

  const platosFiltrados =
    categoriaSeleccionada === ""
      ? platos
      : platos.filter((p) => {
          // Verificar si categoria es un objeto o un ID
          const categoriaId = typeof p.categoria === 'object' ? p.categoria?.id : p.categoria_id;
          return categoriaId === Number(categoriaSeleccionada);
        });

  // Separar platos disponibles y no disponibles
  const platosDisponibles = platosFiltrados.filter(p => p.disponible !== false);
  const platosNoDisponibles = platosFiltrados.filter(p => p.disponible === false);

  // Para clientes, solo mostrar disponibles
  const mostrarNoDisponibles = user.rol === 1 && platosNoDisponibles.length > 0;

  const renderPlato = (p) => (
    <div
      key={p.id}
      style={{
        background: "#fff",
        borderRadius: 20,
        boxShadow: "0 4px 24px #b3e6f7, 0 1.5px 8px #0001",
        border: `2px solid ${p.disponible === false ? "#ffcccc" : "#b3e6f7"}`,
        padding: "2rem 1.5rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        transition: "transform 0.18s, box-shadow 0.18s",
        cursor: "pointer",
        opacity: p.disponible === false ? 0.7 : 1,
        position: "relative"
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-6px) scale(1.03)";
        e.currentTarget.style.boxShadow = "0 8px 32px #b3e6f7, 0 2px 12px #0002";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = "0 4px 24px #b3e6f7, 0 1.5px 8px #0001";
      }}
    >
      {/* Badge de no disponible solo para admin */}
      {user.rol === 1 && p.disponible === false && (
        <div style={{
          position: "absolute",
          top: 10,
          right: 10,
          background: "#e74c3c",
          color: "#fff",
          padding: "0.3rem 0.7rem",
          borderRadius: 6,
          fontSize: "0.75rem",
          fontWeight: 600
        }}>
          NO DISPONIBLE
        </div>
      )}

      <h3 style={{ color: "#1a3557", marginBottom: 10, fontWeight: 700, fontSize: "1.3rem", letterSpacing: 1 }}>{p.nombre}</h3>
      <p style={{ color: "#555", marginBottom: 10, fontSize: "1.05rem" }}>{p.descripcion}</p>
      <p style={{ fontWeight: 600, color: "#27ae60", marginBottom: 18, fontSize: "1.1rem" }}>Precio: {p.precio} Bs</p>

      <div style={{ marginTop: "auto", display: "flex", gap: "0.5rem", width: "100%", flexWrap: "wrap", justifyContent: "center" }}>
        {/* BOTONES ADMIN */}
        {user.rol === 1 && (
          <>
            <Link
              to={`/platos/editar/${p.id}`}
              style={{
                flex: "1 1 auto",
                textAlign: "center",
                color: "#fff",
                fontWeight: 600,
                textDecoration: "none",
                border: "none",
                borderRadius: 10,
                padding: "0.6rem 1rem",
                background: "#2980b9",
                boxShadow: "0 1px 6px #0001",
                fontSize: "0.9rem",
                transition: "background 0.2s"
              }}
            >
              Editar
            </Link>

            <button
              onClick={() => borrarPlato(p.id, p.nombre)}
              style={{
                flex: "1 1 auto",
                color: "#fff",
                fontWeight: 600,
                border: "none",
                borderRadius: 10,
                padding: "0.6rem 1rem",
                background: "#e74c3c",
                boxShadow: "0 1px 6px #0001",
                fontSize: "0.9rem",
                cursor: "pointer",
                transition: "background 0.2s"
              }}
            >
              Eliminar
            </button>
          </>
        )}

        {/* AGREGAR AL CARRITO - SOLO PARA CLIENTES Y PLATOS DISPONIBLES */}
        {user.rol === 2 && p.disponible !== false && (
          <button
            style={{
              width: "100%",
              background: "#27ae60",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: "0.6rem 1.4rem",
              fontWeight: 600,
              fontSize: "1rem",
              boxShadow: "0 1px 6px #0001",
              cursor: "pointer",
              transition: "background 0.2s"
            }}
            onClick={() => {
              agregarItem({
                id: p.id,
                nombre: p.nombre,
                precio: parseFloat(p.precio),
              });
              showToast(`"${p.nombre}" agregado al carrito`);
            }}
          >
            Añadir al carrito
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="page" style={{ minHeight: "100vh", background: "#f6f8fa", padding: "2rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem", color: "#2c3e50" }}>Platos</h1>

      {/* BOTÓN CREAR PLATO PARA ADMIN */}
      {user.rol === 1 && (
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <Link
            to="/platos/crear"
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
            ➕ Crear Nuevo Plato
          </Link>
        </div>
      )}

      {/* FILTRO */}
      <div style={{ margin: "0 auto 2rem auto", maxWidth: 400, textAlign: "center" }}>
        <label style={{ fontWeight: 500, color: "#34495e" }}>
          Filtrar por categoría:&nbsp;
          <select
            value={categoriaSeleccionada}
            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
            style={{ padding: "0.4rem", borderRadius: 6, border: "1px solid #ccc" }}
          >
            <option value="">Todas</option>
            {categorias.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* SECCIÓN DE PLATOS DISPONIBLES */}
      {platosDisponibles.length === 0 && !mostrarNoDisponibles && (
        <p style={{ textAlign: "center", color: "#888", marginTop: "3rem" }}>
          No hay platos {categoriaSeleccionada ? "en esta categoría" : "disponibles"}.
        </p>
      )}

      {platosDisponibles.length > 0 && (
        <>
          <h2 style={{ 
            textAlign: "center", 
            color: "#27ae60", 
            marginBottom: "1.5rem",
            fontSize: "1.5rem",
            fontWeight: 600
          }}>
            ✅ Platos Disponibles
          </h2>
          
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", 
            gap: "2.5rem", 
            maxWidth: 1100, 
            margin: "0 auto 3rem auto" 
          }}>
            {platosDisponibles.map(renderPlato)}
          </div>
        </>
      )}

      {/* SECCIÓN DE PLATOS NO DISPONIBLES - SOLO PARA ADMIN */}
      {mostrarNoDisponibles && (
        <>
          <div style={{
            borderTop: "2px dashed #ccc",
            margin: "3rem auto",
            maxWidth: 1100
          }}></div>

          <h2 style={{ 
            textAlign: "center", 
            color: "#e74c3c", 
            marginBottom: "1.5rem",
            fontSize: "1.5rem",
            fontWeight: 600
          }}>
            ❌ Platos No Disponibles
          </h2>
          
          <p style={{
            textAlign: "center",
            color: "#888",
            marginBottom: "2rem",
            fontSize: "0.95rem"
          }}>
            Estos platos solo son visibles para administradores
          </p>

          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", 
            gap: "2.5rem", 
            maxWidth: 1100, 
            margin: "0 auto" 
          }}>
            {platosNoDisponibles.map(renderPlato)}
          </div>
        </>
      )}
    </div>
  );
}
