# Etapa 1: Construcción (instala solo dependencias necesarias)
FROM node:20-alpine AS builder

WORKDIR /app

# Copia package.json y package-lock.json
COPY package*.json ./

# Instala solo dependencias de producción
RUN npm install --only=production

# Copia el resto del código fuente
COPY . .

# Etapa 2: Imagen final y liviana
FROM node:20-alpine

WORKDIR /app

# Copia los archivos instalados desde la imagen builder
COPY --from=builder /app /app

# Expone el puerto usado por este microservicio
EXPOSE 3001

# Comando de inicio
CMD ["node", "src/index.js"]
