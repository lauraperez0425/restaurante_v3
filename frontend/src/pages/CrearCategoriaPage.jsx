import { useState } from "react";
import { crearCategoria } from "../api/categoriasApi";
import { useNavigate } from "react-router-dom";

export default function CrearCategoriaPage() {
  const [nombre, setNombre] = useState("");
  const navigate = useNavigate();

  async function enviar(e) {
    e.preventDefault();
    await crearCategoria(nombre);
    navigate("/categorias");
  }

  return (
    <div className="page">
      <h1>Nueva Categoría</h1>

      <form onSubmit={enviar}>
        <label>
          Nombre:
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </label>

        <button className="btn-primary">Guardar</button>
      </form>
    </div>
  );
}