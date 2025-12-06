import { useEffect, useState } from "react";
import { getCategorias, editarCategoria } from "../api/categoriasApi";
import { useNavigate, useParams } from "react-router-dom";

export default function EditarCategoriaPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");

  useEffect(() => {
    async function cargar() {
      const data = await getCategorias();
      const cat = data.find((c) => c.id === Number(id));
      setNombre(cat?.nombre || "");
    }
    cargar();
  }, [id]);

  async function enviar(e) {
    e.preventDefault();
    await editarCategoria(id, nombre);
    navigate("/categorias");
  }

  return (
    <div className="page">
      <h1>Editar Categoría</h1>

      <form onSubmit={enviar}>
        <label>
          Nombre:
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </label>

        <button className="btn-primary">Actualizar</button>
      </form>
    </div>
  );
}
