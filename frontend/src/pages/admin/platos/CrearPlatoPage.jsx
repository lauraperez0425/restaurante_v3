import { useEffect, useState } from "react";
import { crearPlato } from "../../../api/platosApi";
import { getCategorias } from "../../../api/categoriasApi";
import { useNavigate } from "react-router-dom";

export default function CrearPlatoPage() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargarCategorias() {
      try {
        const data = await getCategorias();
        setCategorias(data);
      } catch (err) {
        console.error("Error al cargar categorías:", err);
        setError("Error al cargar categorías");
      }
    }
    cargarCategorias();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // Validaciones del lado del cliente
    if (nombre.trim().length < 3) {
      setError("El nombre debe tener al menos 3 caracteres");
      return;
    }

    if (nombre.trim().length > 100) {
      setError("El nombre no puede exceder 100 caracteres");
      return;
    }

    const precioNum = parseFloat(precio);
    if (isNaN(precioNum) || precioNum <= 0) {
      setError("El precio debe ser mayor a 0");
      return;
    }

    if (precioNum > 10000) {
      setError("El precio no puede exceder 10,000 Bs");
      return;
    }

    if (!categoriaId || categoriaId === "") {
      setError("Debe seleccionar una categoría");
      return;
    }

    if (descripcion && descripcion.length > 500) {
      setError("La descripción no puede exceder 500 caracteres");
      return;
    }

    try {
      await crearPlato({
        nombre: nombre.trim(),
        descripcion: descripcion.trim(),
        precio: precioNum,
        categoria_id: Number(categoriaId),
      });

      alert("Plato creado exitosamente");
      navigate("/platos");
    } catch (err) {
      console.error("Error al crear plato:", err);
      const mensajeError = err.response?.data?.message || 
                          (Array.isArray(err.response?.data?.message) 
                            ? err.response.data.message.join(', ') 
                            : "Error al crear el plato");
      setError(mensajeError);
    }
  }

  return (
    <div className="page" style={{ minHeight: "100vh", background: "#d6f6fc", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ background: "#fff", borderRadius: 20, boxShadow: "0 4px 24px #b3e6f7, 0 1.5px 8px #0001", border: "2px solid #b3e6f7", padding: "2.5rem", maxWidth: 500, width: "100%" }}>
        <h1 style={{ textAlign: "center", color: "#1a3557", marginBottom: "2rem", fontWeight: 700 }}>Crear Plato</h1>

        {error && (
          <div style={{ 
            background: "#fee", 
            border: "1px solid #fcc", 
            borderRadius: 8, 
            padding: "1rem", 
            marginBottom: "1rem", 
            color: "#c33" 
          }}>
            {error}
          </div>
        )}

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

          <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
            <button
              type="button"
              onClick={() => navigate("/platos")}
              style={{
                flex: 1,
                padding: "0.7rem",
                borderRadius: 8,
                border: "1px solid #ccc",
                background: "#fff",
                color: "#555",
                fontWeight: 600,
                fontSize: "1rem",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              Cancelar
            </button>

            <button 
              type="submit"
              style={{ 
                flex: 1,
                padding: "0.7rem", 
                borderRadius: 8, 
                fontWeight: 600, 
                background: "#27ae60", 
                color: "#fff", 
                border: "none", 
                fontSize: "1rem", 
                cursor: "pointer", 
                boxShadow: "0 2px 8px rgba(39, 174, 96, 0.3)",
                transition: "all 0.2s"
              }}
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}