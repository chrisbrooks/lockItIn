#!/bin/bash -e

DIRNAME=$(dirname $0)

. "$DIRNAME/../lib"

echo "Install: started"

if [[ -n $DOCKER_BUILD_CONTAINER ]]; then
  echo ">> Executing in Docker build agent container mode"

  if [[ $NODE_ENV == "production" ]]; then
    echo ">> Extracting production modules"
    tar -xf /node_modules_prod.tar
  else
    echo ">> Extracting development modules"
    tar -xf /node_modules_dev.tar
  fi
else
  echo ">> Executing in development environment mode"
  echo ">> Install npm packages"
  npm install

  if [[ $NODE_ENV != "production" ]]; then
    echo ">> Run test setup"
    ./node_modules/selenium-standalone/bin/selenium-standalone install
  fi
fi

echo "Install: finished"
