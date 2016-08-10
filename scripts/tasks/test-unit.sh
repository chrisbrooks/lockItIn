#!/bin/bash -e

DIRNAME=$(dirname $0)

. "$DIRNAME/../config"
. "$DIRNAME/../lib"

echo "Test unit: started"

packageTasksDir="$DIRNAME"

# echo ">> cleaning compiled unit tests directory"
# $packageTasksDir/clean.sh Tests/unit/compiled

# echo ">> compiling tests & dependencies"
# ./node_modules/webpack/bin/webpack.js --config Tests/unit/webpack.testUnit.config.js

echo ">> running tests"
if [[ -n $DOCKER_BUILD_CONTAINER ]]; then
    npm run test:tc
else
    npm run test
fi

echo "Test unit: finished"
