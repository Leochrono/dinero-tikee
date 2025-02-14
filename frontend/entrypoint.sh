#!/bin/sh

# Leer el valor del PUERTO desde .env y establecerlo como variable de entorno
export PUERTO=$(cat .env | grep '^VITE_PORT_PROD=' | cut -d'=' -f2)
echo "PUERTO: $PUERTO"

# Ejecutar el servidor con el puerto definido
serve -s dist -l tcp://0.0.0.0:${PUERTO}