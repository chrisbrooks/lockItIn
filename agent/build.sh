#!/bin/bash -e

DIRNAME=$(dirname $0)


. "$DIRNAME/config"
. "$DIRNAME/lib"

# determine app source base directory - check for expected directories to confirm this
appSourceBaseDir=$(pwd -P)
if [[ (! -d "$appSourceBaseDir/agent") || (! -d "$appSourceBaseDir/dist") ]]; then
  exitError "Script $(basename $0) must be run from the root of the project as agent/$(basename $0)"
fi

echo ">> Using docker version"
docker version

echo ">> Calculating Docker agent image checksum tag"
dockerImageTag=$($DIRNAME/calcchecksumtag.sh)
if [[ -z $dockerImageTag ]]; then
  exitError "Unable to determine Docker agent image checksum tag"
fi

echo "Agent build: started"

echo ">> Expected image checksum $dockerImageTag"
echo ">> Pulling image $DOCKER_IMAGE_NAME:$dockerImageTag"

dockerCatchError pull $DOCKER_IMAGE_NAME:$dockerImageTag

# check if requested Docker build image version tag exists in our Docker hub
if [[ $dockerExitStatus -ne 0 ]]; then
  # Docker build agent image for calculated checksum does not yet exist - build it now
  echo ">> Unable to locate image checksum $dockerImageTag - creating new Docker build image"

  echo ">> Pulling latest image for $DOCKER_IMAGE_NAME for layer caching"
  dockerCatchError pull $DOCKER_IMAGE_NAME:latest

  cp package.json $DIRNAME

  docker build --tag $DOCKER_IMAGE_NAME:$dockerImageTag $DIRNAME
  docker tag $DOCKER_IMAGE_NAME:$dockerImageTag $DOCKER_IMAGE_NAME:latest

  echo ">> Push build agent to Docker registry"
  docker push $DOCKER_IMAGE_NAME:$dockerImageTag
  docker push $DOCKER_IMAGE_NAME:latest

  echo ">> Remove package.json from agent path"
  rm -f $DIRNAME/package.json
else
  echo ">> Docker build agent version $dockerImageTag exists - skipping create process"
fi

echo "Agent build: finished"
