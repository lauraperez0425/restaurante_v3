#!/bin/bash

# Script para levantar todos los microservicios localmente
# Abre 5 tabs de iTerm2 automáticamente

# Verificar que estamos en el directorio correcto
if [ ! -d "auth-service" ] || [ ! -d "api-core" ] || [ ! -d "order-service" ] || [ ! -d "menu-service" ]; then
    echo "❌ Por favor ejecuta este script desde la raíz del proyecto"
    exit 1
fi

echo "🚀 Levantando microservicios..."
echo ""

# Crear script temporal para cada servicio
mkdir -p /tmp/restaurante_scripts

# Auth Service
cat > /tmp/restaurante_scripts/auth.sh << 'EOF'
#!/bin/bash
cd /Users/laura/Developer/restaurante_v3/auth-service
npm run start:dev
EOF
chmod +x /tmp/restaurante_scripts/auth.sh

# API Core
cat > /tmp/restaurante_scripts/api-core.sh << 'EOF'
#!/bin/bash
cd /Users/laura/Developer/restaurante_v3/api-core
npm run start:dev
EOF
chmod +x /tmp/restaurante_scripts/api-core.sh

# Order Service
cat > /tmp/restaurante_scripts/order.sh << 'EOF'
#!/bin/bash
cd /Users/laura/Developer/restaurante_v3/order-service
npm run start:dev
EOF
chmod +x /tmp/restaurante_scripts/order.sh

# Menu Service
cat > /tmp/restaurante_scripts/menu.sh << 'EOF'
#!/bin/bash
cd /Users/laura/Developer/restaurante_v3/menu-service
npm run start:dev
EOF
chmod +x /tmp/restaurante_scripts/menu.sh

# Frontend
cat > /tmp/restaurante_scripts/frontend.sh << 'EOF'
#!/bin/bash
cd /Users/laura/Developer/restaurante_v3/frontend
npm run dev
EOF
chmod +x /tmp/restaurante_scripts/frontend.sh

echo "✅ Scripts creados"
echo ""
echo "📝 Para levantar los servicios, abre 5 terminales y ejecuta:"
echo ""
echo "Terminal 1 - Auth Service (puerto 3001):"
echo "  /tmp/restaurante_scripts/auth.sh"
echo ""
echo "Terminal 2 - API Core (puerto 3000):"
echo "  /tmp/restaurante_scripts/api-core.sh"
echo ""
echo "Terminal 3 - Order Service (puerto 3002):"
echo "  /tmp/restaurante_scripts/order.sh"
echo ""
echo "Terminal 4 - Menu Service (puerto 3003):"
echo "  /tmp/restaurante_scripts/menu.sh"
echo ""
echo "Terminal 5 - Frontend (puerto 5173):"
echo "  /tmp/restaurante_scripts/frontend.sh"
echo ""
echo "O ejecuta directamente:"
echo ""
echo "  /tmp/restaurante_scripts/auth.sh &"
echo "  /tmp/restaurante_scripts/api-core.sh &"
echo "  /tmp/restaurante_scripts/order.sh &"
echo "  /tmp/restaurante_scripts/menu.sh &"
echo "  /tmp/restaurante_scripts/frontend.sh"
