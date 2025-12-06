# Guía de Integración: Frontend ↔ Microservicios

> **Estado:** ✅ Frontend completamente preparado para integración con microservicios TypeORM/NestJS
>
> **Archivos Listos:**
> - ✅ platosApi.updated.js
> - ✅ categoriasApi.updated.js  
> - ✅ ordersApi.updated.js
> - ✅ reservationsApi.updated.js
> - ✅ authApi.updated.js

---

## 🚀 Cambiar a Backend en 3 Pasos

### Paso 1: Copiar archivos actualizados

En la carpeta `/src/api/`, reemplaza los archivos existentes:

```bash
cp ordersApi.updated.js ordersApi.js
cp reservationsApi.updated.js reservationsApi.js
cp authApi.updated.js authApi.js
cp platosApi.updated.js platosApi.js
cp categoriasApi.updated.js categoriasApi.js
```

### Paso 2: Cambiar USE_MOCK a false

En cada archivo de `/src/api/`, busca esta línea y cámbiala:

```javascript
// ANTES:
const USE_MOCK = true;

// DESPUÉS:
const USE_MOCK = false;
```

Archivos a actualizar:
- ordersApi.js (línea ~7)
- reservationsApi.js (línea ~7)
- authApi.js (línea ~7)
- platosApi.js (línea ~7)
- categoriasApi.js (línea ~7)

### Paso 3: Configurar URLs en .env

Crea o actualiza `.env` en la raíz del proyecto:

```env
VITE_MENU_SERVICE_URL=http://localhost:3001
VITE_ORDER_SERVICE_URL=http://localhost:3002
VITE_RESERVATION_SERVICE_URL=http://localhost:3003
VITE_AUTH_SERVICE_URL=http://localhost:3000
```

---

## 📋 Estructura de Microservicios Esperada

### 1. Menu Service (menu_db)

**Endpoints:**

```
GET    /platos              - Obtener todos los platos
GET    /platos/:id          - Obtener un plato específico
POST   /platos              - Crear un nuevo plato
PUT    /platos/:id          - Actualizar un plato
DELETE /platos/:id          - Eliminar un plato

GET    /categorias          - Obtener todas las categorías
GET    /categorias/:id      - Obtener una categoría
POST   /categorias          - Crear una categoría
PUT    /categorias/:id      - Actualizar una categoría
DELETE /categorias/:id      - Eliminar una categoría
```

**Formatos de Respuesta:**

GET /platos:
```json
[
  {
    "id": 1,
    "nombre": "Pique Macho",
    "descripcion": "Plato típico boliviano",
    "precio": 45.50,
    "disponible": true,
    "categoria": {
      "id": 1,
      "nombre": "Comidas Típicas"
    }
  }
]
```

POST /platos (crear):
```json
{
  "nombre": "Nuevo Plato",
  "descripcion": "Descripción",
  "precio": 25.50,
  "categoria_id": 1
}
```

GET /categorias:
```json
[
  {
    "id": 1,
    "nombre": "Comidas Típicas",
    "platos": [
      {
        "id": 1,
        "nombre": "Pique Macho",
        "precio": 45.50,
        "descripcion": "...",
        "disponible": true
      }
    ]
  }
]
```

---

### 2. Order Service (order_db)

**Endpoints:**

```
GET    /pedidos             - Obtener todos los pedidos (admin)
GET    /pedidos/:id         - Obtener detalle de un pedido
POST   /pedidos             - Crear un nuevo pedido
PUT    /pedidos/:id         - Actualizar estado del pedido
DELETE /pedidos/:id         - Eliminar un pedido

GET    /pedidos/usuario/:userId  - Obtener pedidos del usuario
```

**Formatos de Respuesta:**

POST /pedidos (crear):
```json
{
  "usuario_id": 1,
  "items": [
    {
      "plato_id": 1,
      "nombre": "Pique Macho",
      "cantidad": 2,
      "precio": 45.50,
      "subtotal": 91.00
    }
  ],
  "total": 91.00
}
```

Respuesta:
```json
{
  "id": 123,
  "usuario_id": 1,
  "total": 91.00,
  "estado": "pendiente",
  "fecha": "2025-12-05T10:30:00Z",
  "detalles": [
    {
      "nombre": "Pique Macho",
      "cantidad": 2,
      "subtotal": 91.00
    }
  ]
}
```

PUT /pedidos/:id (actualizar estado):
```json
{
  "estado": "entregado"
}
```

---

### 3. Reservation Service (reservation_db)

**Endpoints:**

```
GET    /reservas            - Obtener todas las reservas (admin)
GET    /reservas/:id        - Obtener detalle de una reserva
POST   /reservas            - Crear una nueva reserva
PUT    /reservas/:id        - Actualizar una reserva
DELETE /reservas/:id        - Eliminar una reserva

GET    /reservas/usuario/:userId - Obtener reservas del usuario
```

**Formatos de Respuesta:**

POST /reservas (crear):
```json
{
  "usuario_id": 1,
  "fecha": "2025-12-10",
  "hora": "19:00",
  "cantidad_personas": 4,
  "notas": "Cumpleaños"
}
```

Respuesta:
```json
{
  "id": 1,
  "usuario_id": 1,
  "fecha": "2025-12-10",
  "hora": "19:00",
  "cantidad_personas": 4,
  "notas": "Cumpleaños",
  "estado": "pendiente",
  "creado_en": "2025-12-05T10:30:00Z"
}
```

---

### 4. Auth Service

**Endpoints:**

```
POST   /auth/login          - Login (retorna user y token)
POST   /auth/register       - Registro de nuevo usuario
POST   /auth/logout         - Logout
POST   /auth/validate       - Validar token
```

**Formatos de Respuesta:**

POST /auth/login:
```json
{
  "email": "user@example.com",
  "password": "123456"
}
```

Respuesta:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "nombre": "Juan",
    "email": "user@example.com",
    "rol": "usuario"
  }
}
```

---

## 🔐 Autenticación con Bearer Token

Todos los endpoints (excepto login/register) requieren autenticación con Bearer token.

**Header requerido:**

```
Authorization: Bearer <token>
```

Los archivos API ya incluyen esto automáticamente:

```javascript
headers: {
  "Authorization": `Bearer ${token}`,
  "Content-Type": "application/json"
}
```

El token se obtiene de localStorage después del login.

---

## 🐛 Testing sin Backend

Mientras desarrollas el backend, el frontend seguirá funcionando con datos mock.

**Para usar datos mock:**
```javascript
const USE_MOCK = true;  // Frontend usa mockData
```

**Para usar backend real:**
```javascript
const USE_MOCK = false; // Frontend usa fetch a URLs en .env
```

No necesitas cambiar ningún código en los componentes. Los datos mock y reales tienen la **misma estructura**, así que los componentes funcionan idénticamente.

---

## ⚠️ Validaciones Importantes

### Headers CORS
Tu backend debe permitir CORS desde:
- `http://localhost:5173` (desarrollo local)
- `http://localhost:3000` (si usas puerto 3000)
- Tu dominio de producción

**Ejemplo Express/NestJS:**
```javascript
const cors = require('cors');
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
```

### Validación de Tokens
El frontend envía tokens en el header Authorization. Asegúrate que tu backend:
1. Valida el token JWT
2. Verifica que no esté expirado
3. Retorna 401 si el token es inválido

### Estados de Pedidos
El frontend espera estos estados para pedidos:
- `"pendiente"`
- `"preparando"`
- `"listo"`
- `"entregado"`
- `"cancelado"`
- `"completado"`

### Roles de Usuario
El frontend espera roles:
- `"usuario"` - Cliente regular
- `"admin"` - Administrador

---

## 📝 Ejemplo: Completar la Integración

### 1. Verificar configuración .env

```bash
cat .env
# Debe mostrar:
# VITE_MENU_SERVICE_URL=http://localhost:3001
# VITE_ORDER_SERVICE_URL=http://localhost:3002
# etc.
```

### 2. Copiar archivos .updated.js

```bash
cd src/api/
for file in *.updated.js; do
  cp "$file" "${file%.updated.js}.js"
done
```

### 3. Cambiar USE_MOCK

```bash
# En cada archivo, cambiar true → false
sed -i 's/const USE_MOCK = true/const USE_MOCK = false/g' *.js
```

### 4. Verificar que el backend esté corriendo

```bash
# Desde terminal, verificar que los servicios estén activos
curl -s http://localhost:3001/platos | jq .
curl -s http://localhost:3002/pedidos | jq .
curl -s http://localhost:3003/reservas | jq .
```

### 5. Iniciar frontend

```bash
npm run dev
# Debe iniciar en http://localhost:5173
```

---

## 🎯 Próximos Pasos

1. **Implementar los microservicios** con las rutas y respuestas documentadas
2. **Habilitar CORS** en tu backend
3. **Crear usuarios de prueba** en auth service (admin@test.com, user@test.com)
4. **Configurar JWT** (secret key, expiración, etc.)
5. **Copiar archivos .updated.js** reemplazando los originales
6. **Cambiar USE_MOCK = false** en todos los archivos API
7. **Actualizar .env** con URLs reales
8. **Testear flujos completos**: login → crear pedido → ver pedidos, etc.

---

## 💡 Tips de Debugging

Si algo no funciona:

1. **Abre Developer Tools** (F12) en el navegador
2. **Ve a la pestaña Network**
3. **Realiza una acción** (login, crear plato, etc.)
4. **Inspecciona los requests:**
   - ¿El método HTTP es correcto? (GET, POST, PUT, DELETE)
   - ¿La URL es correcta?
   - ¿Los headers Authorization están presentes?
   - ¿La respuesta tiene status 200/201?
5. **Si ves errores CORS**, revisa la configuración CORS del backend
6. **Si ves 401 Unauthorized**, el token es inválido o expiró

---

## 📞 Soporte

Si encuentras problemas:
- Revisa que la respuesta del backend tenga la **estructura exacta** documentada
- Verifica que los estados de pedidos sean exactamente: `"pendiente"`, `"preparando"`, `"listo"`, etc.
- Asegúrate que los roles sean: `"usuario"` o `"admin"`
- Comprueba que los headers CORS estén configurados correctamente

¡El frontend está 100% listo para integración! 🎉

## Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```
REACT_APP_MENU_SERVICE_URL=http://localhost:3001
REACT_APP_ORDER_SERVICE_URL=http://localhost:3002
REACT_APP_RESERVATION_SERVICE_URL=http://localhost:3002
REACT_APP_AUTH_SERVICE_URL=http://localhost:3000
```

Luego reinicia el servidor Vite para que lea las variables.

## Troubleshooting

**Problema:** "Cannot GET /platos"
**Solución:** Verifica que la URL y el puerto del microservicio sean correctos

**Problema:** "CORS error"
**Solución:** Habilita CORS en tu backend

**Problema:** "TypeError: Cannot read property 'map' of undefined"
**Solución:** Verifica que tu API retorna un array/objeto con la estructura esperada

## Preguntas o Dudas

Cuando tengas el backend listo, comparte los endpoints exactos y los formatos de respuesta para asegurar que todo funcione perfectamente.
