#!/bin/bash

# Ir al directorio del script
cd "$(dirname "$0")"
echo 'Inicio' 

# varaibles
CONFIG="/microservicios/config/"
NAME_CONTAINER="api_authentication"
NAME_IMAGE="api-dinero-al-vuelo"
PORT_EXPOSE=3000

docker build -t "$NAME_IMAGE" .
echo 'Compilado correctamente'

docker rm -f "$NAME_CONTAINER"

docker run --restart=always --name "$NAME_CONTAINER" \
        -dp "$PORT_EXPOSE":3000 "$NAME_IMAGE"
echo 'Successfull service'