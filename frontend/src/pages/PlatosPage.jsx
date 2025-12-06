import { useEffect, useState } from "react";
import { getPlatos } from "../api/platosApi";
import { getCategorias } from "../api/categoriasApi";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PlatosPage() {
  const { user } = useAuth();

  const [platos, setPlatos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

  useEffect(() => {
    async function cargar() {
      const listaPlatos = await getPlatos();
      const listaCategorias = await getCategorias();

      setPlatos(listaPlatos);
      setCategorias(listaCategorias);
    }
    cargar();
  }, []);

  const platosFiltrados =
    categoriaSeleccionada === ""
      ? platos
      : platos.filter((p) => p.categoria_id === Number(categoriaSeleccionada));

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

      {/* LISTA DE PLATOS */}
      {platosFiltrados.length === 0 && <p style={{ textAlign: "center", color: "#888" }}>No hay platos en esta categoría.</p>}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "2.5rem", maxWidth: 1100, margin: "0 auto" }}>
        {platosFiltrados.map((p) => (
          <div
            key={p.id}
            style={{
              background: "#fff",
              borderRadius: 20,
              boxShadow: "0 4px 24px #b3e6f7, 0 1.5px 8px #0001",
              border: "2px solid #b3e6f7",
              padding: "2rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              transition: "transform 0.18s, box-shadow 0.18s",
              cursor: "pointer"
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
            <h3 style={{ color: "#1a3557", marginBottom: 10, fontWeight: 700, fontSize: "1.3rem", letterSpacing: 1 }}>{p.nombre}</h3>
            <p style={{ color: "#555", marginBottom: 10, fontSize: "1.05rem" }}>{p.descripcion}</p>
            <p style={{ fontWeight: 600, color: "#27ae60", marginBottom: 18, fontSize: "1.1rem" }}>Precio: {p.precio} Bs</p>

            <div style={{ marginTop: "auto", display: "flex", gap: "1rem" }}>
              {/* EDITAR SOLO ADMIN */}
              {user.rol === 1 && (
                <Link
                  to={`/platos/editar/${p.id}`}
                  style={{
                    color: "#fff",
                    fontWeight: 600,
                    textDecoration: "none",
                    border: "none",
                    borderRadius: 10,
                    padding: "0.6rem 1.4rem",
                    background: "#1a3557",
                    boxShadow: "0 1px 6px #0001",
                    fontSize: "1rem",
                    transition: "background 0.2s"
                  }}
                >
                  Editar
                </Link>
              )}

              {/* AGREGAR AL CARRITO */}
              {user.rol === 2 && (
                <button
                  style={{
                    background: "#2980b9",
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
                    const stored = localStorage.getItem("carrito");
                    let carrito = stored ? JSON.parse(stored) : [];

                    const existente = carrito.find(
                      (i) => i.plato_id === p.id
                    );

                    if (existente) {
                      existente.cantidad++;
                      existente.subtotal =
                        existente.cantidad * existente.precio;
                    } else {
                      carrito.push({
                        plato_id: p.id,
                        nombre: p.nombre,
                        precio: p.precio,
                        cantidad: 1,
                        subtotal: p.precio,
                      });
                    }

                    localStorage.setItem("carrito", JSON.stringify(carrito));
                    alert("Agregado al carrito");
                  }}
                >
                  Añadir al carrito
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
