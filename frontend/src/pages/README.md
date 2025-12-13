# Estructura de Páginas del Frontend

## 📁 Organización

### `/auth` - Autenticación y Páginas Públicas
- `HomePage.jsx` - Página de inicio
- `LoginPage.jsx` - Inicio de sesión
- `RegistroPage.jsx` - Registro de usuarios

### `/cliente` - Páginas del Cliente

#### `/cliente/platos`
- `PlatosPage.jsx` - Ver menú de platos disponibles

#### `/cliente/pedidos`
- `CarritoPage.jsx` - Carrito de compras
- `CrearPedidoPage.jsx` - Confirmar y crear pedido
- `MisPedidosPage.jsx` - Ver mis pedidos
- `PedidoDetallePage.jsx` - Ver detalle de un pedido específico

#### `/cliente/reservas`
- `CrearReservaPage.jsx` - Crear nueva reserva
- `MisReservasPage.jsx` - Ver mis reservas

### `/admin` - Páginas del Administrador

#### `/admin/categorias`
- `CategoriasPage.jsx` - Gestión de categorías
- `CrearCategoriaPage.jsx` - Crear nueva categoría
- `EditarCategoriaPage.jsx` - Editar categoría existente

#### `/admin/platos`
- `CrearPlatoPage.jsx` - Crear nuevo plato
- `EditarPlatoPage.jsx` - Editar plato existente

#### `/admin/pedidos`
- `PedidosAdminPage.jsx` - Gestión de todos los pedidos
- `CambiarEstadoPedidoPage.jsx` - Cambiar estado de pedido

#### `/admin/reservas`
- `ReservasAdminPage.jsx` - Gestión de todas las reservas
- `ReservaDetallePage.jsx` - Ver detalle y cambiar estado de reserva

## 🔒 Protección de Rutas

- **Rutas Públicas**: `/`, `/login`, `/registro`
- **Rutas de Cliente**: Requieren autenticación
- **Rutas de Admin**: Requieren autenticación + rol de administrador
