#!/bin/bash -e

DIRNAME=$(dirname $0)

echo "Test: started"

packageTasksDir="$DIRNAME/tasks"

$packageTasksDir/install.sh
$packageTasksDir/test-unit.sh

echo "Test: finished"
