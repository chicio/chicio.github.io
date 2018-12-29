#!/usr/bin/env sh

# Get container name
container_name="$(docker ps --format "{{.Names}}" --filter "ancestor=gh-pages")"

# Launch shell session
docker exec -it $container_name sh
