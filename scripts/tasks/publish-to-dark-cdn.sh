#!/bin/bash -e

DIRNAME=$(dirname $0)

. "$DIRNAME/config"
. "$DIRNAME/lib"

echo "Publish: started"

# fetch command line arguments
AWSRegion=$1
if [[ ! $AWSRegion =~ ^[a-z]{2}-[a-z]+-[0-9]$ ]]; then
  exitError "AWS target region in correct format required as first argument"
fi

appBuildNumber=$2
if [[ ! $appBuildNumber =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  exitError "Application build number in correct format required as second argument"
fi

echo "Publishing to environment: $AWS_ENVIRONMENT_NAME"

packageTasksDir="$DIRNAME/tasks"


$packageTasksDir/install.sh
$packageTasksDir/compile.sh

$packageTasksDir/publish-asset-cdn.sh $AWSRegion $appBuildNumber

echo "Publish: finished"
