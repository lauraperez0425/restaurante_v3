#!/bin/bash

# Script para iniciar todos los servicios del restaurante

echo "🚀 Iniciando todos los servicios..."

# Matar procesos anteriores
pkill -f "nest start" 2>/dev/null
pkill -f "npx vite" 2>/dev/null
sleep 2

# Directorio base
BASE_DIR="/Users/laura/restaurante_v3"

# Iniciar Auth Service
echo "📦 Iniciando Auth Service (puerto 3001)..."
cd "$BASE_DIR/auth-service" && npm run start:dev > /tmp/auth-service.log 2>&1 &

sleep 3

# Iniciar Menu Service
echo "📦 Iniciando Menu Service (puerto 3003)..."
cd "$BASE_DIR/menu-service" && npm run start:dev > /tmp/menu-service.log 2>&1 &

sleep 3

# Iniciar Order Service
echo "📦 Iniciando Order Service (puerto 3002)..."
cd "$BASE_DIR/order-service" && npm run start:dev > /tmp/order-service.log 2>&1 &

sleep 3

# Iniciar API Core
echo "📦 Iniciando API Core (puerto 3000)..."
cd "$BASE_DIR/api-core" && npm run start:dev > /tmp/api-core.log 2>&1 &

sleep 5

# Iniciar Frontend
echo "📦 Iniciando Frontend (puerto 5173)..."
cd "$BASE_DIR/frontend" && npx vite > /tmp/frontend.log 2>&1 &

sleep 3

echo ""
echo "✅ Todos los servicios iniciados!"
echo ""
echo "📋 Estado de servicios:"
lsof -ti:3001 > /dev/null && echo "  ✅ Auth Service: http://localhost:3001/api" || echo "  ❌ Auth Service: NO está corriendo"
lsof -ti:3003 > /dev/null && echo "  ✅ Menu Service: http://localhost:3003/api" || echo "  ❌ Menu Service: NO está corriendo"
lsof -ti:3002 > /dev/null && echo "  ✅ Order Service: http://localhost:3002/api" || echo "  ❌ Order Service: NO está corriendo"
lsof -ti:3000 > /dev/null && echo "  ✅ API Core: http://localhost:3000/api" || echo "  ❌ API Core: NO está corriendo"
lsof -ti:5173 > /dev/null && echo "  ✅ Frontend: http://localhost:5173/" || echo "  ❌ Frontend: NO está corriendo"
echo ""
echo "📝 Logs disponibles en /tmp/*-service.log y /tmp/frontend.log"
echo ""
