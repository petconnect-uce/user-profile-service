# Etapa 1: Construcción (instala solo dependencias necesarias)
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY . .

# Etapa 2: Imagen final y liviana
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app /app

# 🔧 Asegúrate de que la carpeta uploads exista
RUN mkdir -p /app/uploads

# Exponer el puerto usado por este microservicio
EXPOSE 3001

CMD ["node", "src/index.js"]
