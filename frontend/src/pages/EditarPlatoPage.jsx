import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editarPlato, getPlatos } from "../api/platosApi";
import { getCategorias } from "../api/categoriasApi";
import { useAuth } from "../context/AuthContext";

export default function EditarPlatoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [disponible, setDisponible] = useState(true);

  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargar() {
      try {
        const listaPlatos = await getPlatos();
        const plato = listaPlatos.find((p) => p.id === Number(id));

        const listaCategorias = await getCategorias();

        setCategorias(listaCategorias);

        if (plato) {
          setNombre(plato.nombre);
          setDescripcion(plato.descripcion || "");
          setPrecio(plato.precio);
          setDisponible(plato.disponible !== false); // Por defecto true
          
          // El backend devuelve categoria como objeto con eager loading
          const catId = typeof plato.categoria === 'object' ? plato.categoria?.id : plato.categoria_id;
          setCategoriaId(catId || "");
        } else {
          setError("Plato no encontrado");
        }
      } catch (err) {
        console.error("Error al cargar plato:", err);
        setError("Error al cargar los datos del plato");
      } finally {
        setLoading(false);
      }
    }

    cargar();
  }, [id]);

  async function submit(e) {
    e.preventDefault();
    setError("");

    try {
      await editarPlato(
        id,
        {
          nombre,
          descripcion,
          precio: parseFloat(precio),
          categoria_id: Number(categoriaId),
          disponible,
        },
        token
      );

      alert("Plato actualizado correctamente");
      navigate("/platos");
    } catch (err) {
      console.error("Error al actualizar plato:", err);
      setError(err.response?.data?.message || "Error al actualizar el plato");
    }
  }

  if (loading) {
    return (
      <div className="page" style={{ minHeight: "100vh", background: "#d6f6fc", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontSize: "1.2rem", color: "#555" }}>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="page" style={{ minHeight: "100vh", background: "#d6f6fc", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ background: "#fff", borderRadius: 20, boxShadow: "0 4px 24px #b3e6f7", border: "2px solid #b3e6f7", padding: "2.5rem", maxWidth: 600, width: "100%" }}>
        <h1 style={{ textAlign: "center", color: "#1a3557", marginBottom: "2rem", fontWeight: 700 }}>Editar Plato</h1>

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

        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          <label style={{ fontWeight: 500, color: "#34495e" }}>
            Nombre del plato:
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              placeholder="Ej: Pizza Margarita"
              style={{ width: "100%", marginTop: 6, padding: "0.6rem", borderRadius: 8, border: "1px solid #ccc", fontSize: "1rem" }}
            />
          </label>

          <label style={{ fontWeight: 500, color: "#34495e" }}>
            Descripción:
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Descripción del plato..."
              rows={3}
              style={{ width: "100%", marginTop: 6, padding: "0.6rem", borderRadius: 8, border: "1px solid #ccc", fontSize: "1rem", fontFamily: "inherit", resize: "vertical" }}
            />
          </label>

          <label style={{ fontWeight: 500, color: "#34495e" }}>
            Precio (Bs):
            <input
              type="number"
              step="0.01"
              min="0"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              required
              placeholder="35.00"
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
              <option value="">Seleccione una categoría...</option>
              {categorias.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre}
                </option>
              ))}
            </select>
          </label>

          {/* Toggle de disponibilidad */}
          <div style={{ 
            background: disponible ? "#d4edda" : "#f8d7da", 
            border: disponible ? "1px solid #c3e6cb" : "1px solid #f5c6cb",
            borderRadius: 10, 
            padding: "1rem 1.2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <div>
              <label style={{ fontWeight: 600, color: disponible ? "#155724" : "#721c24", fontSize: "1rem", cursor: "pointer" }}>
                <span style={{ marginRight: "0.5rem" }}>{disponible ? "✅" : "❌"}</span>
                Estado del plato
              </label>
              <p style={{ margin: "0.3rem 0 0 0", fontSize: "0.85rem", color: disponible ? "#155724" : "#721c24", opacity: 0.8 }}>
                {disponible ? "Visible para clientes" : "Oculto para clientes (solo admin puede ver)"}
              </p>
            </div>
            <label style={{ position: "relative", display: "inline-block", width: 60, height: 30, cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={disponible}
                onChange={(e) => setDisponible(e.target.checked)}
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: disponible ? "#28a745" : "#dc3545",
                borderRadius: 30,
                transition: "0.3s",
                cursor: "pointer"
              }}>
                <span style={{
                  position: "absolute",
                  content: '""',
                  height: 22,
                  width: 22,
                  left: disponible ? 34 : 4,
                  bottom: 4,
                  backgroundColor: "white",
                  borderRadius: "50%",
                  transition: "0.3s",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                }}></span>
              </span>
            </label>
          </div>

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
                background: "#2980b9", 
                color: "#fff", 
                border: "none", 
                fontSize: "1rem", 
                cursor: "pointer", 
                boxShadow: "0 2px 8px rgba(41, 128, 185, 0.3)",
                transition: "all 0.2s"
              }}
            >
              Actualizar Plato
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}