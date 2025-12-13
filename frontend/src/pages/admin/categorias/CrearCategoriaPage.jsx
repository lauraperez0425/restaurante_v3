import { useState } from "react";
import { crearCategoria } from "../../../api/categoriasApi";
import { useNavigate } from "react-router-dom";

export default function CrearCategoriaPage() {
  const [nombre, setNombre] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function enviar(e) {
    e.preventDefault();
    setError("");
    
    try {
      await crearCategoria(nombre);
      alert("Categoría creada exitosamente");
      navigate("/categorias");
    } catch (err) {
      console.error("Error al crear categoría:", err);
      setError(err.response?.data?.message || "Error al crear la categoría");
    }
  }

  return (
    <div className="page" style={{ minHeight: "100vh", background: "#d6f6fc", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ background: "#fff", borderRadius: 20, boxShadow: "0 4px 24px #b3e6f7", border: "2px solid #b3e6f7", padding: "2.5rem", maxWidth: 500, width: "100%" }}>
        <h1 style={{ textAlign: "center", color: "#1a3557", marginBottom: "2rem", fontWeight: 700 }}>Nueva Categoría</h1>

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

        <form onSubmit={enviar} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <label style={{ fontWeight: 500, color: "#34495e" }}>
            Nombre de la categoría:
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              placeholder="Ej: Bebidas, Platos principales, Postres..."
              style={{ width: "100%", marginTop: 6, padding: "0.6rem", borderRadius: 8, border: "1px solid #ccc", fontSize: "1rem" }}
            />
          </label>

          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              type="button"
              onClick={() => navigate("/categorias")}
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
                border: "none",
                background: "#27ae60",
                color: "#fff",
                fontWeight: 600,
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