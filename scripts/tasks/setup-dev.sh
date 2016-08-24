#!/bin/bash -e

DIRNAME=$(dirname $0)

. "$DIRNAME/config"
. "$DIRNAME/lib"



echo "Dev setup: started"

$DIRNAME/dns-dev.sh
$DIRNAME/install.sh

echo "Dev setup: finished"
