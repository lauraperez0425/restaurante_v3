# 🔗 Integración Frontend con API Gateway

## ✅ Cambios Realizados

### 1. Configuración del API Gateway
El frontend ahora se conecta **únicamente al API Core (puerto 3000)** que funciona como **API Gateway** para todos los microservicios.

### 2. Estructura de la Integración

#### Antes (Conexión Directa a Microservicios):
```
Frontend (5173)
    ├── → Auth Service (3001)
    ├── → Order Service (3002)
    └── → Menu Service (3003)
```

#### Ahora (Conexión a través del API Gateway):
```
Frontend (5173)
    └── → API Core/Gateway (3000)
            ├── → Auth Service (3001)
            ├── → Order Service (3002)
            └── → Menu Service (3003)
```

### 3. Archivos Modificados

#### `frontend/src/config/api.config.js`
- ✅ Configuración centralizada para usar API Gateway
- ✅ Base URL única: `http://localhost:3000`
- ✅ Todas las rutas con prefijo `/api`

#### APIs actualizadas:
- ✅ `authApi.js` - Login y registro
- ✅ `categoriasApi.js` - Gestión de categorías
- ✅ `platosApi.js` - Gestión de platos
- ✅ `ordersApi.js` - Gestión de pedidos
- ✅ `reservationsApi.js` - Gestión de reservas

### 4. Rutas del API Gateway

Todas las peticiones usan el prefijo `/api`:

#### Autenticación
- `POST /api/auth/login`
- `POST /api/auth/register`

#### Categorías
- `GET /api/categorias`
- `POST /api/categorias`
- `PATCH /api/categorias/:id`
- `DELETE /api/categorias/:id`

#### Platos
- `GET /api/platos`
- `GET /api/platos/:id`
- `POST /api/platos`
- `PATCH /api/platos/:id`
- `DELETE /api/platos/:id`

#### Pedidos
- `GET /api/pedidos`
- `GET /api/pedidos/:id`
- `GET /api/pedidos/usuario/:usuarioId`
- `POST /api/pedidos`
- `PATCH /api/pedidos/:id`

#### Reservas
- `GET /api/reservas`
- `GET /api/reservas/:id`
- `GET /api/reservas/usuario/:usuarioId`
- `POST /api/reservas`
- `PATCH /api/reservas/:id`

### 5. Variable de Entorno

Archivo `.env`:
```env
VITE_API_GATEWAY_URL=http://localhost:3000
```

## 🚀 Cómo Ejecutar

### 1. Iniciar servicios con Docker
```bash
docker-compose up -d
```

Esto inicia:
- API Core (Gateway) en `http://localhost:3000`
- Auth Service en `http://localhost:3001`
- Order Service en `http://localhost:3002`
- Menu Service en `http://localhost:3003`
- Bases de datos MySQL

### 2. Iniciar Frontend
```bash
cd frontend
npm install
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

## 🔍 Ventajas del API Gateway

1. **Punto único de entrada**: El frontend solo necesita conocer una URL
2. **Seguridad centralizada**: CORS y autenticación gestionados en un solo lugar
3. **Versionado de API**: Fácil implementar versionado global
4. **Monitoreo simplificado**: Todas las peticiones pasan por un punto
5. **Mantenimiento**: Cambios en microservicios no afectan al frontend
6. **Load Balancing**: Posibilidad de distribuir carga desde el gateway

## 📝 Notas Importantes

- El API Core tiene configurado CORS para `http://localhost:5173`
- Todas las rutas requieren el prefijo `/api`
- El token JWT se envía en el header `Authorization: Bearer <token>`
- Los microservicios internos solo se comunican con el API Core

## 🧪 Pruebas

Para verificar que todo funciona:

1. Accede a `http://localhost:3000/api` - Debería mostrar un mensaje de bienvenida
2. Swagger UI: `http://localhost:3000/api-docs`
3. Intenta hacer login desde el frontend
4. Verifica que las peticiones van a `localhost:3000` en las DevTools del navegador

## 🔧 Troubleshooting

Si algo no funciona:

1. Verifica que todos los servicios estén corriendo:
   ```bash
   docker-compose ps
   ```

2. Revisa los logs del API Core:
   ```bash
   docker-compose logs api-core
   ```

3. Asegúrate de que el archivo `.env` existe en la carpeta `frontend`

4. Limpia la caché del navegador y el localStorage
