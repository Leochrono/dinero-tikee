FROM node:20-alpine

# Crear el directorio de la aplicación
RUN mkdir /app
WORKDIR /app

# Copiar los archivos de la aplicación
COPY .env .env
COPY package.json .
RUN npm install --force
COPY . .

# # Construir la aplicación
RUN npm run build

# # Instalar serve globalmente
RUN npm install -g serve

# Copiar el script de inicio
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
# Copiar el script de inicio

# CMD para ejecutar el script de inicio
CMD ["/entrypoint.sh"]
