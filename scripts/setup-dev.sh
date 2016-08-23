#!/bin/bash -e

DIRNAME=$(dirname $0)

. "$DIRNAME/config"
. "$DIRNAME/lib"

packageTasksDir="$DIRNAME/tasks"

echo "Dev setup: started"
$packageTasksDir/dns-dev.sh
$packageTasksDir/install.sh

echo "Dev setup: finished"
