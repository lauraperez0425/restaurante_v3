import { useEffect, useState } from "react";
import { getCategorias, eliminarCategoria } from "../api/categoriasApi";
import { Link } from "react-router-dom";

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState([]);

  async function cargar() {
    const data = await getCategorias();
    setCategorias(data);
  }

  useEffect(() => {
    cargar();
  }, []);

  async function borrar(id) {
    await eliminarCategoria(id);
    cargar();
  }

  return (
    <div className="page">
      <h1>Categorías</h1>

      <Link to="/categorias/crear" className="btn-primary">
        Nueva categoría
      </Link>

      {categorias.map((c) => (
        <div key={c.id} className="card">
          <h3>{c.nombre}</h3>

          <Link to={`/categorias/editar/${c.id}`}>Editar</Link>

          <button
            style={{ marginLeft: "10px", backgroundColor: "red" }}
            onClick={() => borrar(c.id)}
          >
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
}