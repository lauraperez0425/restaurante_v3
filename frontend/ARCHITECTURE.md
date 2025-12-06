# 🏗️ ARQUITECTURA: Frontend ↔ Microservicios

## Diagrama de Flujo

```
┌─────────────────────────────────────────────────────────────────┐
│                         SMART RESTAURANT                        │
│                         Frontend (React)                        │
└─────────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────┼─────────┐
                    │         │         │
              ┌─────▼──┐ ┌────▼──┐ ┌──▼─────┐
              │ AUTH   │ │ MENU  │ │ ORDER  │
              │Service │ │Service│ │Service │
              │        │ │       │ │        │
              │:3000   │ │:3001  │ │:3002   │
              └────────┘ └───────┘ └────────┘
                    │         │
                    │         └──┬──────────┐
                    │            │          │
              ┌─────▼──┐ ┌───────▼──┐ ┌────▼──────┐
              │  JWT   │ │PLATOS &  │ │ PEDIDOS & │
              │ Tokens │ │CATEGORIAS│ │RESERVAS   │
              │        │ │          │ │           │
              │ auth_db│ │menu_db   │ │ order_db  │
              └────────┘ └──────────┘ └───────────┘
```

---

## Rutas y Componentes del Frontend

### Rutas Públicas (Sin Autenticación)
```
/login              → LoginPage
/                   → HomePage
```

### Rutas Usuario
```
/platos             → PlatosPage (lista de platos)
/carrito            → CarritoPage (carrito de compras)
/pedidos/crear      → CrearPedidoPage (confirmar pedido)
/mis-pedidos        → MisPedidosPage (historial de pedidos)
/reservas/crear     → CrearReservaPage (hacer reserva)
/mis-reservas       → MisReservasPage (historial de reservas)
```

### Rutas Admin
```
/platos/crear       → CrearPlatoPage
/platos/editar/:id  → EditarPlatoPage
/categorias         → CategoriasPage
/categorias/crear   → CrearCategoriaPage
/categorias/editar/:id → EditarCategoriaPage
/pedidos            → PedidosAdminPage
/pedidos/admin/:id  → CambiarEstadoPedidoPage
/reservas           → ReservasAdminPage
```

---

## Flujo de Datos

### 1. Login
```
User inputs (email, password)
    ↓
authApi.login(email, password)
    ↓
POST /auth/login (Backend)
    ↓
Response: { token, user: { id, nombre, email, rol } }
    ↓
localStorage.setItem("token", token)
localStorage.setItem("user", JSON.stringify(user))
    ↓
AuthContext actualizado
    ↓
Navigate a /platos
```

### 2. Ver Platos
```
Usuario abierto /platos
    ↓
PlatosPage.useEffect()
    ↓
platosApi.getAll()
    ↓
if (USE_MOCK = true)  → mockGetPlatos() [desarrollo]
if (USE_MOCK = false) → fetch GET /platos [producción]
    ↓
Response: [{ id, nombre, precio, categoria: {...} }, ...]
    ↓
setState(platos)
    ↓
Render cards con platos
```

### 3. Crear Pedido
```
Usuario clickea "Confirmar Pedido"
    ↓
CarritoPage → Leer desde localStorage("carrito")
    ↓
CrearPedidoPage → POST /pedidos
    ↓
Body: {
  usuario_id: 1,
  items: [{ plato_id, nombre, cantidad, precio, subtotal }],
  total: 91.00
}
    ↓
Headers: Authorization: Bearer {token}
    ↓
Response: { id: 123, total, estado: "pendiente", detalles: [...] }
    ↓
localStorage.removeItem("carrito")
    ↓
Navigate a /mis-pedidos
```

### 4. Ver Mis Pedidos
```
Usuario abierto /mis-pedidos
    ↓
MisPedidosPage.useEffect()
    ↓
ordersApi.getByUserId(userId)
    ↓
if (USE_MOCK = true)  → mockGetMyOrders()
if (USE_MOCK = false) → fetch GET /pedidos/usuario/:userId
    ↓
Headers: Authorization: Bearer {token}
    ↓
Response: [{ id, total, estado, fecha, detalles: [...] }, ...]
    ↓
setState(orders)
    ↓
Render PedidoCard para cada pedido
```

### 5. Admin: Cambiar Estado de Pedido
```
Admin hace click en pedido
    ↓
Navega a /pedidos/admin/:id
    ↓
CambiarEstadoPedidoPage carga detalles
    ↓
ordersApi.getById(id)
    ↓
Admin selecciona nuevo estado
    ↓
ordersApi.updateStatus(id, estado)
    ↓
PUT /pedidos/:id
Body: { estado: "preparando" }
Headers: Authorization: Bearer {token}
    ↓
Response: { id, estado: "preparando", ... }
    ↓
Navigate a /pedidos
```

---

## Estructura de Archivos API

### Patrón Común (todos los .updated.js)

```javascript
// 1. Imports
import { mockData } from "../mock/mockFile";
import API_CONFIG from "../config/api.config";

// 2. Flag para cambiar entre mock y real
const USE_MOCK = true;  // ← Cambiar a false

// 3. Funciones internas (no exportadas)
const api = {
  getAll: async () => {
    if (USE_MOCK) return mockFunction();
    
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${API_CONFIG.SERVICE.BASE_URL}${API_CONFIG.SERVICE.ENDPOINT}`,
      {
        headers: { "Authorization": `Bearer ${token}` }
      }
    );
    if (!response.ok) throw new Error("...");
    return await response.json();
  },
  // ... más funciones
};

// 4. Exportar con nombres públicos
export const publicFunction = api.getAll;
export const anotherFunction = api.create;
```

---

## Variables de Entorno (.env)

```env
# Menu Service - Platos y Categorías
VITE_MENU_SERVICE_URL=http://localhost:3001

# Order Service - Pedidos
VITE_ORDER_SERVICE_URL=http://localhost:3002

# Reservation Service - Reservas
VITE_RESERVATION_SERVICE_URL=http://localhost:3003

# Auth Service - Login/Registro
VITE_AUTH_SERVICE_URL=http://localhost:3000
```

Accesible en código:
```javascript
const API_CONFIG = {
  MENU_SERVICE: {
    BASE_URL: import.meta.env.VITE_MENU_SERVICE_URL,
    // ...
  }
}
```

---

## Autenticación (JWT + Bearer Token)

### Flujo de Token

```
1. Login
   POST /auth/login → { token, user }
   ↓
2. Guardar Token
   localStorage.setItem("token", token)
   ↓
3. Usar Token en Requests
   Authorization: Bearer {token}
   ↓
4. Backend Valida
   Verifica JWT signature
   Verifica expiración
   ↓
5. Response
   200 OK si válido
   401 Unauthorized si inválido
```

### Headers Automáticos

Cada request (excepto login) incluye:
```javascript
headers: {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${localStorage.getItem("token")}`
}
```

---

## Estados de Pedidos

El frontend espera estos estados exactamente:

```
"pendiente"      → El pedido fue creado, espera confirmación
"preparando"     → La cocina está preparando el pedido
"listo"          → El pedido está listo para retirar
"entregado"      → El pedido fue entregado
"cancelado"      → El pedido fue cancelado
"completado"     → El pedido fue completado
```

Usados en:
- `CambiarEstadoPedidoPage` - Select dropdown con estos valores
- `EstadoPedidoBadge` - Componente que colorea el estado
- `PedidoCard` - Muestra el estado actual

---

## Roles de Usuario

El frontend valida estos roles:

```
"usuario" → Usuario regular, puede:
  - Ver platos
  - Crear pedidos
  - Ver sus pedidos
  - Crear reservas
  - Ver sus reservas

"admin" → Administrador, puede:
  - Hacer todo lo que usuario
  - Crear/editar platos
  - Crear/editar categorías
  - Ver todos los pedidos
  - Cambiar estado de pedidos
  - Ver todas las reservas
```

---

## Flujo de Componentes Context

```
App
  └── BrowserRouter
        └── AuthContext.Provider
              └── AppRouter
                    ├── ProtectedRoute (requiredRole="admin")
                    │     └── AdminPages
                    │
                    ├── ProtectedRoute (requiredRole="usuario")
                    │     └── UserPages
                    │
                    └── Public Pages (LoginPage, HomePage)
```

**AuthContext proporciona:**
- `user` - { id, nombre, email, rol }
- `token` - JWT para autenticación
- `isAuthenticated` - boolean
- `login(email, password)` - Autentica usuario
- `logout()` - Cierra sesión

---

## Carrito (localStorage)

El carrito se guarda en localStorage con estructura:

```json
{
  "carrito": [
    {
      "plato_id": 1,
      "nombre": "Pique Macho",
      "cantidad": 2,
      "precio": 45.50,
      "subtotal": 91.00
    }
  ]
}
```

**Operaciones:**
- Agregar: `JSON.parse(localStorage.getItem("carrito") || "[]")`
- Actualizar: `localStorage.setItem("carrito", JSON.stringify(newCart))`
- Limpiar: `localStorage.removeItem("carrito")`

---

## Error Handling

### En API Files
```javascript
try {
  const response = await fetch(...);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return await response.json();
} catch (error) {
  console.error("Error:", error);
  throw error;  // Propagar para que el componente lo maneje
}
```

### En Componentes
```javascript
useEffect(() => {
  const loadData = async () => {
    try {
      const data = await getPlatos();
      setPlatos(data);
    } catch (error) {
      setError(error.message);
      // Mostrar mensaje al usuario
    }
  };
  loadData();
}, []);
```

---

## Testing Checklist

- [ ] Login funciona y guarda token
- [ ] Ver platos carga lista
- [ ] Agregar al carrito persiste
- [ ] Crear pedido limpia carrito
- [ ] Ver mis pedidos muestra historial
- [ ] Admin puede cambiar estado de pedido
- [ ] Logout borra token
- [ ] Rutas protegidas redirigen a login
- [ ] CORS no causa errores
- [ ] Tokens se envían en headers

---

## Próximas Mejoras (Opcional)

- [ ] Agregar refresh token logic
- [ ] Agregar loading states más visuales
- [ ] Implementar pagination para listas largas
- [ ] Agregar búsqueda/filtros avanzados
- [ ] Agregar upload de imágenes para platos
- [ ] Implementar pagos (Stripe, etc)
- [ ] Agregar notificaciones en tiempo real

---

**Esta arquitectura está diseñada para ser:**
- ✅ Modular - Fácil agregar nuevas rutas/servicios
- ✅ Escalable - Crece sin cambiar componentes
- ✅ Testeable - Cada servicio es independiente
- ✅ Mantenible - Código limpio y documentado
