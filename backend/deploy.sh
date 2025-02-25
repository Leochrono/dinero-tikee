#!/bin/bash

# Ir al directorio del script
cd "$(dirname "$0")"
echo 'Inicio'

# Variables
NAME_CONTAINER="api-dinero"
NAME_IMAGE="api-dinero-al-vuelo"
PORT_EXPOSE=8430
ENV_FILE="/CONFIG/VARIABLES_ENTORNO/dinero/.env"
NETWORK="database"
VOLUME="/CONFIG/FILES/dinero/uploads:/app/uploads"

docker build --target production -t "$NAME_IMAGE" -f Dockerfile .

echo 'Compilado correctamente'

docker rm -f "$NAME_CONTAINER"

docker run -d \
  --restart=always \
  --name "$NAME_CONTAINER" \
  --env-file "$ENV_FILE" \
  --network "$NETWORK" \
  -v "$VOLUME" \
  -p "$PORT_EXPOSE":3000 \
  "$NAME_IMAGE"

echo 'Successfull service'
