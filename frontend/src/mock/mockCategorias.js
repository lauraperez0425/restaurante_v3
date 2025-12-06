// Datos iniciales basados en tu SQL
let categorias = [
  { id: 1, nombre: "Comidas Típicas" },
  { id: 2, nombre: "Bebidas" },
  { id: 3, nombre: "Postres" },
  { id: 4, nombre: "Comidas Rápidas" },
];

// Obtener categorías
export async function mockGetCategorias() {
  return categorias;
}

// Crear categoría
export async function mockCrearCategoria(nombre) {
  const nueva = {
    id: Date.now(),
    nombre,
  };
  categorias.push(nueva);
  return nueva;
}

// Editar
export async function mockEditarCategoria(id, nombre) {
  categorias = categorias.map((c) =>
    c.id === Number(id) ? { ...c, nombre } : c
  );
  return { success: true };
}

// Eliminar
export async function mockEliminarCategoria(id) {
  categorias = categorias.filter((c) => c.id !== Number(id));
  return { success: true };
}