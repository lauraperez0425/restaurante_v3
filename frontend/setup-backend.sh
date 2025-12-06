#!/bin/bash

# ============================================================================
# SETUP-BACKEND.SH - Script para activar backend en 1 comando
# ============================================================================
# 
# Uso: bash setup-backend.sh
# 
# Este script automáticamente:
# 1. Copia archivos .updated.js → .js
# 2. Cambia USE_MOCK = false en todos los archivos API
# 3. Crea el archivo .env con las URLs
# 4. Muestra instrucciones de próximos pasos
#
# ============================================================================

set -e  # Exit if any command fails

echo ""
echo "🚀 =========================================="
echo "   SETUP BACKEND - Smart Restaurant"
echo "=========================================="
echo ""

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: No estamos en la carpeta raíz del proyecto${NC}"
    echo "   Ejecuta este script desde /Users/laura/Developer/frontend/"
    exit 1
fi

# Paso 1: Copiar archivos
echo -e "${BLUE}📋 PASO 1: Copiando archivos .updated.js${NC}"
cd src/api/

files=("ordersApi" "reservationsApi" "authApi" "platosApi" "categoriasApi")
for file in "${files[@]}"; do
    if [ -f "${file}.updated.js" ]; then
        cp "${file}.updated.js" "${file}.js"
        echo -e "  ${GREEN}✅${NC} ${file}.js"
    else
        echo -e "  ${RED}⚠️${NC}  ${file}.updated.js no encontrado (esperado)"
    fi
done

# Paso 2: Cambiar USE_MOCK a false
echo ""
echo -e "${BLUE}🔧 PASO 2: Cambiando USE_MOCK = false${NC}"

for file in ordersApi.js reservationsApi.js authApi.js platosApi.js categoriasApi.js; do
    if [ -f "$file" ]; then
        # Usar sed con compatibilidad macOS
        sed -i '' 's/const USE_MOCK = true/const USE_MOCK = false/g' "$file"
        echo -e "  ${GREEN}✅${NC} $file"
    fi
done

cd ../..

# Paso 3: Crear .env
echo ""
echo -e "${BLUE}⚙️  PASO 3: Creando archivo .env${NC}"

cat > .env << 'EOF'
# ========================================
# MICROSERVICES URLS
# ========================================
# Actualiza estos valores con tus URLs reales

VITE_MENU_SERVICE_URL=http://localhost:3001
VITE_ORDER_SERVICE_URL=http://localhost:3002
VITE_RESERVATION_SERVICE_URL=http://localhost:3003
VITE_AUTH_SERVICE_URL=http://localhost:3000

# ========================================
# NOTA: Usa estas URLs en desarrollo
# En producción, actualiza con tus dominios reales
# ========================================
EOF

echo -e "  ${GREEN}✅${NC} .env creado"

# Paso 4: Verificaciones
echo ""
echo -e "${BLUE}✓  VERIFICACIONES${NC}"

# Verificar que USE_MOCK está en false
check_use_mock() {
    local file=$1
    if grep -q "const USE_MOCK = false" "src/api/$file"; then
        echo -e "  ${GREEN}✅${NC} $file: USE_MOCK = false"
        return 0
    else
        echo -e "  ${RED}❌${NC} $file: USE_MOCK NO está en false"
        return 1
    fi
}

check_use_mock "ordersApi.js"
check_use_mock "reservationsApi.js"
check_use_mock "authApi.js"
check_use_mock "platosApi.js"
check_use_mock "categoriasApi.js"

# Verificar .env
if [ -f ".env" ]; then
    echo -e "  ${GREEN}✅${NC} .env configurado"
else
    echo -e "  ${RED}❌${NC} .env NO creado"
fi

# ========================================
# INSTRUCCIONES FINALES
# ========================================

echo ""
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo -e "${GREEN}      🎉 BACKEND ACTIVADO ${NC}"
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo ""

echo -e "${YELLOW}📋 PRÓXIMOS PASOS:${NC}"
echo ""
echo "1️⃣  Verifica que tus microservicios estén corriendo:"
echo -e "   ${BLUE}curl http://localhost:3001/platos${NC}"
echo -e "   ${BLUE}curl http://localhost:3002/pedidos${NC}"
echo -e "   ${BLUE}curl http://localhost:3003/reservas${NC}"
echo -e "   ${BLUE}curl http://localhost:3000/auth/login${NC}"
echo ""

echo "2️⃣  Actualiza .env si tus servicios están en puertos diferentes:"
echo -e "   ${BLUE}nano .env${NC}"
echo ""

echo "3️⃣  Inicia el frontend:"
echo -e "   ${BLUE}npm run dev${NC}"
echo ""

echo "4️⃣  Prueba login con:"
echo "   Email: admin@test.com"
echo "   Password: 123456"
echo ""

echo -e "${YELLOW}📚 DOCUMENTACIÓN:${NC}"
echo "   • READY_FOR_BACKEND.md - Resumen ejecutivo"
echo "   • BACKEND_INTEGRATION_CHECKLIST.md - Checklist detallado"
echo "   • src/INTEGRACION_MICROSERVICIOS.md - Guía técnica"
echo ""

echo -e "${YELLOW}⚠️  IMPORTANTE:${NC}"
echo "   • Asegúrate que CORS esté habilitado en tu backend"
echo "   • Verifica que los JWT se generen correctamente"
echo "   • Confirma que los endpoints devuelven las estructuras esperadas"
echo ""

echo -e "${YELLOW}❓ ¿NECESITAS AYUDA?${NC}"
echo "   1. Abre DevTools (F12) → Network"
echo "   2. Intenta un login"
echo "   3. Inspecciona el request/response"
echo "   4. Compara con src/INTEGRACION_MICROSERVICIOS.md"
echo ""

echo -e "${GREEN}✨ ¡Estás listo para conectar con tu backend! 🚀${NC}"
echo ""
