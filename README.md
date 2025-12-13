# 🍽️ Restaurante V3 - Sistema de Gestión de Restaurante

Sistema completo de gestión de restaurante desarrollado con arquitectura de microservicios, utilizando NestJS para el backend y React + Vite para el frontend.

## 📋 Descripción del Proyecto

Restaurante V3 es una aplicación web completa que permite la gestión integral de un restaurante, incluyendo:

- 👥 **Gestión de Usuarios**: Autenticación y autorización con JWT
- 🍕 **Gestión de Menú**: CRUD de platos y categorías
- 🛒 **Gestión de Pedidos**: Sistema completo de pedidos con estados
- 📅 **Gestión de Reservas**: Sistema de reservas para clientes
- 🏢 **API Gateway**: Orquestación centralizada de microservicios

## 🏗️ Arquitectura

El sistema está construido con una arquitectura de microservicios:

```
restaurante_v3/
├── frontend/           # Aplicación React + Vite (Puerto 5173)
├── api-core/          # API Gateway (Puerto 3000)
├── auth-service/      # Servicio de Autenticación (Puerto 3001)
├── menu-service/      # Servicio de Menú (Puerto 3003)
├── order-service/     # Servicio de Pedidos (Puerto 3002)
└── docker-compose.yml # Configuración de contenedores
```

### Microservicios

1. **API Core** (Puerto 3000)
   - Gateway principal que orquesta todos los servicios
   - Maneja usuarios, direcciones y reservas
   - Coordina peticiones entre microservicios

2. **Auth Service** (Puerto 3001)
   - Autenticación con JWT
   - Registro de usuarios
   - Validación de tokens

3. **Menu Service** (Puerto 3003)
   - Gestión de platos
   - Gestión de categorías
   - CRUD completo de menú

4. **Order Service** (Puerto 3002)
   - Gestión de pedidos
   - Estados de pedidos (pendiente, preparando, listo, entregado, etc.)
   - Histórico de pedidos por usuario

5. **Frontend** (Puerto 5173)
   - Interfaz de usuario React
   - Vite para desarrollo rápido
   - Integración completa con backend

## 🚀 Tecnologías Utilizadas

### Backend
- **Framework**: NestJS
- **Base de Datos**: MySQL 8.0
- **ORM**: TypeORM
- **Autenticación**: JWT (JSON Web Tokens)
- **Documentación API**: Swagger
- **Contenedores**: Docker & Docker Compose

### Frontend
- **Framework**: React 19.2.0
- **Build Tool**: Vite
- **Gestión de Estado**: React Hooks
- **HTTP Client**: Fetch API
- **Estilos**: CSS Modules

## 📦 Requisitos Previos

- Node.js >= 18.x
- Docker & Docker Compose
- npm o yarn
- MySQL 8.0 (si no usas Docker)

## 🛠️ Instalación

### Opción 1: Con Docker (Recomendado)

```bash
# Clonar el repositorio
git clone https://github.com/lauraperez0425/restaurante_v3.git
cd restaurante_v3

# Iniciar todos los servicios con Docker
docker-compose up -d

# Ver logs
docker-compose logs -f
```

### Opción 2: Instalación Manual

```bash
# Instalar dependencias de cada servicio
cd api-core && npm install && cd ..
cd auth-service && npm install && cd ..
cd menu-service && npm install && cd ..
cd order-service && npm install && cd ..
cd frontend && npm install && cd ..

# Iniciar todos los servicios (usar el script)
chmod +x start-all-services.sh
./start-all-services.sh
```

## 🎯 Uso del Sistema

### Iniciar Todos los Servicios

```bash
# Usando el script proporcionado
./start-all-services.sh
```

El script iniciará automáticamente:
- Auth Service en http://localhost:3001
- Menu Service en http://localhost:3003
- Order Service en http://localhost:3002
- API Core en http://localhost:3000
- Frontend en http://localhost:5173

### Acceder a la Aplicación

- **Frontend**: http://localhost:5173
- **API Core**: http://localhost:3000/api
- **Auth Service**: http://localhost:3001/api
- **Menu Service**: http://localhost:3003/api
- **Order Service**: http://localhost:3002/api

### Documentación API (Swagger)

Cada servicio expone su documentación Swagger:
- http://localhost:3000/api (API Core)
- http://localhost:3001/api (Auth Service)
- http://localhost:3003/api (Menu Service)
- http://localhost:3002/api (Order Service)

## 👤 Usuarios de Prueba

```javascript
// Administrador
{
  email: "admin@test.com",
  password: "123456"
}

// Usuario Regular
{
  email: "user@test.com",
  password: "123456"
}
```

## 🗄️ Base de Datos

El sistema utiliza 4 bases de datos MySQL separadas:

- `core_db` (Puerto 3307): Usuarios, direcciones, reservas
- `auth_db` (Puerto 3308): Autenticación
- `menu_db` (Puerto 3310): Platos y categorías
- `orders_db` (Puerto 3309): Pedidos

## 📚 Estructura de Servicios

### API Core
```
api-core/src/
├── auth/           # Módulo de autenticación
├── usuarios/       # Gestión de usuarios
├── direcciones/    # Gestión de direcciones
├── reservas/       # Gestión de reservas
├── pedidos/        # Orquestación de pedidos
├── platos/         # Orquestación de platos
├── categorias/     # Orquestación de categorías
└── microservices/  # Clientes de microservicios
```

### Menu Service
```
menu-service/src/
├── platos/         # CRUD de platos
├── categorias/     # CRUD de categorías
└── auth/           # Middleware de autenticación
```

### Order Service
```
order-service/src/
├── pedidos/        # Gestión de pedidos
├── estados/        # Estados de pedidos
└── auth/           # Middleware de autenticación
```

### Auth Service
```
auth-service/src/
├── auth/           # Login, registro, validación
├── usuarios/       # Gestión de usuarios
└── jwt/            # Estrategia JWT
```

## 🔧 Scripts Disponibles

### Backend (cada servicio)
```bash
npm run start       # Iniciar en producción
npm run start:dev   # Iniciar en desarrollo (watch mode)
npm run build       # Compilar proyecto
npm run test        # Ejecutar tests
```

### Frontend
```bash
npm run dev         # Iniciar servidor de desarrollo
npm run build       # Build para producción
npm run preview     # Preview del build
```

### Docker
```bash
docker-compose up -d              # Iniciar servicios
docker-compose down               # Detener servicios
docker-compose logs -f [service]  # Ver logs
docker-compose restart [service]  # Reiniciar servicio
```

## 🌐 Variables de Entorno

### API Core
```env
DB_HOST=mysql-core
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=core_db
AUTH_URL=http://auth-service:3001
ORDER_URL=http://order-service:3002
MENU_URL=http://menu-service:3003
JWT_SECRET=supersecretkey
```

### Frontend
```env
VITE_API_URL=http://localhost:3000
VITE_AUTH_URL=http://localhost:3001
VITE_MENU_URL=http://localhost:3003
VITE_ORDER_URL=http://localhost:3002
```

## 🔐 Seguridad

- Autenticación basada en JWT
- Tokens almacenados en localStorage
- Middleware de autenticación en todos los servicios
- Roles de usuario (admin, usuario)
- Validación de tokens en cada petición

## 📝 Características Principales

### ✨ Gestión de Menú
- CRUD completo de platos
- Categorización de platos
- Imágenes de platos
- Precios y descripciones
- Disponibilidad de platos

### 🛒 Sistema de Pedidos
- Carrito de compras
- Estados de pedidos:
  - Pendiente
  - Confirmado
  - Preparando
  - Listo
  - En camino
  - Entregado
  - Cancelado
- Histórico de pedidos
- Filtrado por usuario

### 📅 Sistema de Reservas
- Crear reservas
- Gestión de fecha y hora
- Número de personas
- Estado de reserva
- Histórico de reservas

### 👥 Gestión de Usuarios
- Registro de usuarios
- Login/Logout
- Perfiles de usuario
- Direcciones de envío
- Roles y permisos

## 🐛 Troubleshooting

### Los servicios no inician
```bash
# Verificar puertos ocupados
lsof -i :3000
lsof -i :3001
lsof -i :3002
lsof -i :3003
lsof -i :5173

# Matar procesos si es necesario
kill -9 <PID>
```

### Error de conexión a MySQL
```bash
# Verificar que MySQL esté corriendo
docker-compose ps

# Reiniciar contenedores de MySQL
docker-compose restart mysql-core mysql-auth mysql-menu mysql-orders
```

### CORS Errors
Verificar que CORS esté habilitado en cada servicio backend:
```typescript
app.enableCors({
  origin: 'http://localhost:5173',
  credentials: true
});
```

## 📖 Documentación Adicional

Para más información sobre la integración del frontend con el backend, consultar:
- `frontend/README_INTEGRATION.md` - Guía de integración completa
- `frontend/READY_FOR_BACKEND.md` - Guía rápida para backend
- `frontend/ARCHITECTURE.md` - Arquitectura del sistema
- `frontend/BACKEND_INTEGRATION_CHECKLIST.md` - Checklist de integración

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es para fines educativos y de demostración.

## 👨‍💻 Autor

Laura Pérez - [@lauraperez0425](https://github.com/lauraperez0425)

## 🙏 Agradecimientos

- NestJS por el excelente framework
- React y Vite por el desarrollo frontend
- MySQL por la base de datos
- Docker por la containerización

---

⭐️ Si este proyecto te fue útil, no olvides darle una estrella en GitHub!
