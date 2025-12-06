# Imagen base
FROM node:18

# Carpeta de trabajo en el contenedor
WORKDIR /app

# Copiar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Compilar NestJS
RUN npm run build

# Exponer el puerto del microservicio (AJUSTA SI USAS OTRO)
EXPOSE 3003

# Ejecutar en modo producción
CMD ["npm", "run", "start:prod"]
