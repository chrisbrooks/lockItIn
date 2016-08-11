#!/bin/bash -e

DIRNAME=$(dirname $0)


. "$DIRNAME/../lib"

cleanDirectoryPath=$1
if [[ -z $cleanDirectoryPath ]]; then
  exitError "Directory name is required as first argument"
fi

echo "Clean: started"

if [[ -n $DOCKER_BUILD_CONTAINER ]]; then
  # not need to clean inside Docker build container (all writeable paths are mounted "clean")
  echo ">> Skipping clean in Docker build agent: $cleanDirectoryPath/"
else
  echo ">> Recreating: $cleanDirectoryPath/"

  rm -rf $cleanDirectoryPath
  mkdir -p $cleanDirectoryPath
fi

echo "Clean: finished"
