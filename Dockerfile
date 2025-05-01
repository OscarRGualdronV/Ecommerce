# Usa una imagen base ligera de Node.js
FROM node:23-slim

# Instala pnpm globalmente
RUN npm install -g pnpm

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios para la instalación
COPY package.json pnpm-lock.yaml ./

# Instala dependencias
RUN pnpm install --frozen-lockfile

# Copia el resto del código
COPY . .

# Expone el puerto de la app NestJS
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["pnpm", "start"]
