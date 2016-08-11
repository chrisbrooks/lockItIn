#!/bin/bash -e

DIRNAME=$(dirname $0)

. "$DIRNAME/../lib"

echo "Compile: started"

echo ">> Building UI package"

./node_modules/babel-cli/bin/babel-node.js scripts/buildHtml.js
./node_modules/babel-cli/bin/babel-node.js scripts/build.js

echo "Compile: finished"
