let platos = [
  { id: 1, nombre: "Hamburguesa", descripcion: "Carne y queso", precio: 25 },
  { id: 2, nombre: "Pizza", descripcion: "Mozzarella", precio: 30 },
  { id: 3, nombre: "Tacos", descripcion: "Pollo picante", precio: 18 },
];

export async function mockGetPlatos() {
  return platos;
}

export async function mockCrearPlato(data) {
  const nuevo = { id: Date.now(), ...data };
  platos.push(nuevo);
  return nuevo;
}

export async function mockEditarPlato(id, data) {
  platos = platos.map((p) => (p.id === Number(id) ? { ...p, ...data } : p));
  return { success: true };
}

export async function mockEliminarPlato(id) {
  platos = platos.filter((p) => p.id !== Number(id));
  return { success: true };
}