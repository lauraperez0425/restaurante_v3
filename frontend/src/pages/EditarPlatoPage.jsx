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

  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function cargar() {
      const listaPlatos = await getPlatos();
      const plato = listaPlatos.find((p) => p.id === Number(id));

      const listaCategorias = await getCategorias();

      setCategorias(listaCategorias);

      if (plato) {
        setNombre(plato.nombre);
        setDescripcion(plato.descripcion || "");
        setPrecio(plato.precio);
        setCategoriaId(plato.categoria_id);
      }

      setLoading(false);
    }

    cargar();
  }, [id]);

  async function submit(e) {
    e.preventDefault();

    await editarPlato(
      id,
      {
        nombre,
        descripcion,
        precio: parseFloat(precio),
        categoria_id: Number(categoriaId),
      },
      token
    );

    navigate("/platos");
  }

  if (loading) return <p className="page">Cargando datos...</p>;

  return (
    <div className="page">
      <h1>Editar Plato</h1>

      <form className="form" onSubmit={submit}>
        <label>
          Nombre:
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </label>

        <label>
          Descripción:
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </label>

        <label>
          Precio (Bs):
          <input
            type="number"
            step="0.01"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
          />
        </label>

        <label>
          Categoría:
          <select
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
            required
          >
            <option value="">Seleccione...</option>
            {categorias.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>
        </label>

        <button className="btn-primary">Actualizar</button>
      </form>
    </div>
  );
}