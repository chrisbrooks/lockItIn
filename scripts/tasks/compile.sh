#!/bin/bash -e

DIRNAME=$(dirname $0)

. "$DIRNAME/../lib"

echo "Compile: started"

echo ">> Building UI package"

npm run build

echo "Compile: finished"
