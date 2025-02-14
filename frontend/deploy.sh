#!/bin/bash

# Ir al directorio del script
cd "$(dirname "$0")"
echo 'Inicio'

# varaibles
export DOCKER_CONFIG=$(cat .env | grep '^VITE_IMAGE_DOCKER=' | cut -d'=' -f2)

NAME_CONTAINER="$DOCKER_CONFIG"
NAME_IMAGE="$DOCKER_CONFIG"

export PORT_EXPOSE=$(cat .env | grep '^VITE_PORT_PROD=' | cut -d'=' -f2)
export PORT_EXPOSE_PROD=$(cat .env | grep '^VITE_PORT_EXPOSE_PROD=' | cut -d'=' -f2)

docker build -t "$NAME_IMAGE" .
echo 'Build successfull.'

docker rm -f "$NAME_CONTAINER"

docker run --name "$NAME_CONTAINER" -dp "$PORT_EXPOSE_PROD":$PORT_EXPOSE  \
        "$NAME_IMAGE"

echo 'Successfull service'