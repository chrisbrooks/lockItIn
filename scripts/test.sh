#!/bin/bash -e

DIRNAME=$(dirname $0)

echo "Test: started"

ORIG=$(pwd)

cd DIRNAME
npm i
npm run test:tc
cd $ORIG

echo "Test: finished"
