# Imagen base
FROM node:18

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos
COPY package*.json ./
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto 3001 (o el que uses)
EXPOSE 3001

# Comando por defecto
CMD ["npm", "start"]
