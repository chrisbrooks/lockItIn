#!/bin/bash -e

DIRNAME=$(dirname $0)


. "$DIRNAME/config"
. "$DIRNAME/lib"

# determine app source base directory - check for expected directories to confirm this
appSourceBaseDir=$(pwd -P)
if [[ (! -d "$appSourceBaseDir/agent") ]]; then
  exitError "Script $(basename $0) must be run from the root of the project as agent/$(basename $0)"
fi

scriptExecPath=$1
if [[ -z $scriptExecPath ]]; then
  exitError "Script path is required as first argument. e.g. $(basename $0) script/build.sh"
fi

shift 1

echo "Agent run: started"

echo ">> Using docker version"
docker version

echo ">> Calculating Docker agent image checksum tag"
dockerImageTag=$($DIRNAME/calcchecksumtag.sh)
if [[ -z dockerImageTag ]]; then
  exitError "Unable to determine Docker agent image checksum tag"
fi

echo ">> Pulling image $DOCKER_IMAGE_NAME:$dockerImageTag"
dockerCatchError pull $DOCKER_IMAGE_NAME:$dockerImageTag

if [[ $dockerExitStatus -ne 0 ]]; then
  exitError "Unable to locate Docker image $DOCKER_IMAGE_NAME:$dockerImageTag"
fi

echo ">> Creating Docker build agent data volume container"
dockerDataVolumeContainerGUID=$(
  docker create \
    --volume $DOCKER_BUILD_AGENT_WORKING_DIR/dist \
    --volume $DOCKER_BUILD_AGENT_WORKING_DIR/logs \
    --volume $DOCKER_BUILD_AGENT_WORKING_DIR/node_modules \
    $DOCKER_IMAGE_NAME:$dockerImageTag \
    /dev/null
)

# create empty directories for any Docker data volume container mount points that do not exist
# otherwise Docker itself will create directory as part of the [--volumes-from] directive with owner as root - not what we want
volumeList="dist,logs,node_modules"

IFS=","
for volumeItem in $volumeList; do
  [[ -d "$appSourceBaseDir/$volumeItem" ]] || mkdir $appSourceBaseDir/$volumeItem
done

unset IFS


#echo ">> Preparing app environment variables list for Docker"
#./script/tasks/environment-setup.sh keys
#  --env-file .env \


# Docker run explained:
# --add-host: allows adcentre-invoice-payment-ui.dev hostname resolution to 127.0.0.1 inside container
# --rm: Remove Docker container from host system upon exit
# --volume: Mount current path $sourceBaseDir under $DOCKER_BUILD_AGENT_WORKING_DIR inside Docker container
# --volumes-from: Mount all volumes presented from the build data volume container
# --workdir: Sets working directory to be $DOCKER_BUILD_AGENT_WORKING_DIR
echo ">> Running '$scriptExecPath' within Docker image: $DOCKER_IMAGE_NAME:$dockerImageTag"


dockerCatchError run \
  --add-host $DOCKER_BUILD_AGENT_LOCAL_HOSTNAME:127.0.0.1 \
  --rm \
  --env SEEK_DTM_PROD \
  --env SEEK_API_ENV \
  --env SEEK_VERSION \
  --env SEEK_STATIC_RESOURCE_PATH \
  --env NODE_ENV \
  --env AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
  --env AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
  --volume $appSourceBaseDir:$DOCKER_BUILD_AGENT_WORKING_DIR \
  --volumes-from $dockerDataVolumeContainerGUID \
  --workdir $DOCKER_BUILD_AGENT_WORKING_DIR \
  $DOCKER_IMAGE_NAME:$dockerImageTag \
  $scriptExecPath "$@"

if [[ $dockerExitStatus -ne 0 ]]; then
  # build agent script failed - cleanup and exit with Docker build agent script status
  echo ">> Docker build agent script failed - remove data volume container and exit" >&2

  docker rm $dockerDataVolumeContainerGUID || true
  exit $dockerExitStatus
fi

echo ">> Extract Docker build agent data volume container dist/ contents to host filesystem"
rm -rf $appSourceBaseDir/dist
docker cp $dockerDataVolumeContainerGUID:$DOCKER_BUILD_AGENT_WORKING_DIR/dist $appSourceBaseDir/dist

echo ">> Remove Docker build agent data volume container"
docker rm $dockerDataVolumeContainerGUID || true

echo "Agent run: finished"
