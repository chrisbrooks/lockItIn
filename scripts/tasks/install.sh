#!/bin/bash -e

DIRNAME=$(dirname $0)

. "$DIRNAME/../lib"

echo "Install: started"

if [[ -n $DOCKER_BUILD_CONTAINER ]]; then
  echo ">> Executing in Docker build agent container mode"
    tar -xfv /node_modules_dev.tar
else
  echo ">> Executing in development environment mode"
  echo ">> Install npm packages"
  npm install
fi

echo "Install: finished"
