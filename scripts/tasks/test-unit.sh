#!/bin/bash -e

DIRNAME=$(dirname $0)

. "$DIRNAME/../config"
. "$DIRNAME/../lib"

echo "Test unit: started"

packageTasksDir="$DIRNAME"

echo ">> running tests"
if [[ -n $DOCKER_BUILD_CONTAINER ]]; then
    npm run test:tc
else
    npm run test
fi

echo "Test unit: finished"
