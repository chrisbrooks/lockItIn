#!/bin/bash -e

DIRNAME=$(dirname $0)

echo "Test: started"

$DIRNAME/install.sh
$DIRNAME/test-unit.sh

echo "Test: finished"
