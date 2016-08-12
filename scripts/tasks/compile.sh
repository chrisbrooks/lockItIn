#!/bin/bash -e

DIRNAME=$(dirname $0)

. "$DIRNAME/../lib"

echo "Compile: started"

echo ">> Building UI package"

mkdir -p dist
./node_modules/babel-cli/bin/babel-node.js scripts/buildHtml.js && \
./node_modules/babel-cli/bin/babel-node.js scripts/build.js

#create zipped assets file
tar -zcvf dist.tar.gz dist

echo "Compile: finished"
