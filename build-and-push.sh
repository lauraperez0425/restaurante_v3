#!/bin/bash

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

DOCKER_USERNAME="applepie252"

echo -e "${BLUE}🚀 Iniciando build y push de imágenes Docker...${NC}\n"

# Array de servicios
services=("auth-service" "menu-service" "order-service" "api-core" "frontend")

# Construir y subir cada servicio
for service in "${services[@]}"; do
    echo -e "\n${GREEN}📦 Construyendo $service...${NC}"
    
    # Construir imagen
    docker build -t $DOCKER_USERNAME/$service:latest ./$service
    
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Error construyendo $service${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ $service construido exitosamente${NC}"
    
    # Subir a Docker Hub
    echo -e "${BLUE}⬆️  Subiendo $service a Docker Hub...${NC}"
    docker push $DOCKER_USERNAME/$service:latest
    
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Error subiendo $service${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ $service subido exitosamente a Docker Hub${NC}"
done

echo -e "\n${GREEN}🎉 ¡Todas las imágenes fueron construidas y subidas exitosamente!${NC}\n"
echo -e "${BLUE}📋 Imágenes disponibles en Docker Hub:${NC}"
for service in "${services[@]}"; do
    echo -e "  - $DOCKER_USERNAME/$service:latest"
done

echo -e "\n${BLUE}💡 Para usar estas imágenes en otro servidor:${NC}"
echo -e "  1. Copia el archivo docker-compose.yml"
echo -e "  2. Ejecuta: docker-compose up -d"
echo ""
