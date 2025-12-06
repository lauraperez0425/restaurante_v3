import { useEffect, useState } from "react";
import { crearPlato } from "../api/platosApi";
import { getCategorias } from "../api/categoriasApi";
import { useNavigate } from "react-router-dom";

export default function CrearPlatoPage() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    async function cargarCategorias() {
      const data = await getCategorias();
      setCategorias(data);
    }
    cargarCategorias();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    await crearPlato({
      nombre,
      descripcion,
      precio: parseFloat(precio),
      categoria_id: Number(categoriaId),
    });

    navigate("/platos");
  }

  return (
    <div className="page" style={{ minHeight: "100vh", background: "#d6f6fc", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ background: "#fff", borderRadius: 20, boxShadow: "0 4px 24px #b3e6f7, 0 1.5px 8px #0001", border: "2px solid #b3e6f7", padding: "2.5rem", maxWidth: 500, width: "100%" }}>
        <h1 style={{ textAlign: "center", color: "#1a3557", marginBottom: "2rem", fontWeight: 700 }}>Crear Plato</h1>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          <label style={{ fontWeight: 500, color: "#34495e" }}>
            Nombre:
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              style={{ width: "100%", marginTop: 6, padding: "0.6rem", borderRadius: 8, border: "1px solid #ccc", fontSize: "1rem" }}
            />
          </label>

          <label style={{ fontWeight: 500, color: "#34495e" }}>
            Descripción:
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              style={{ width: "100%", marginTop: 6, padding: "0.6rem", borderRadius: 8, border: "1px solid #ccc", fontSize: "1rem", minHeight: 80 }}
            />
          </label>

          <label style={{ fontWeight: 500, color: "#34495e" }}>
            Precio (Bs):
            <input
              type="number"
              step="0.01"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              required
              style={{ width: "100%", marginTop: 6, padding: "0.6rem", borderRadius: 8, border: "1px solid #ccc", fontSize: "1rem" }}
            />
          </label>

          <label style={{ fontWeight: 500, color: "#34495e" }}>
            Categoría:
            <select
              value={categoriaId}
              onChange={(e) => setCategoriaId(e.target.value)}
              required
              style={{ width: "100%", marginTop: 6, padding: "0.6rem", borderRadius: 8, border: "1px solid #ccc", fontSize: "1rem" }}
            >
              <option value="">Seleccione...</option>
              {categorias.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre}
                </option>
              ))}
            </select>
          </label>

          <button style={{ padding: "0.8rem 0", borderRadius: 8, fontWeight: 600, background: "#2980b9", color: "#fff", border: "none", fontSize: "1.1rem", cursor: "pointer", marginTop: "0.5rem", boxShadow: "0 1px 6px #0001" }}>
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}