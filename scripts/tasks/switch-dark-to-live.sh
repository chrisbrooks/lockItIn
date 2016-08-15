#!/usr/bin/env bash
set -e

DIRNAME=$(dirname $0)
AWS_CLI_BIN=$(which aws || true)

. "$DIRNAME/../config"
. "$DIRNAME/../lib"

# We need to use max-age to do cachebusting on the static assets
ASSET_MAX_AGE_SECONDS="30" # 30 secs

function pushAsset {
  echo ">> Pushing assets from $1 to $2"
  aws s3 cp \
    --region "$AWSRegion" \
    --cache-control max-age=$ASSET_MAX_AGE_SECONDS \
    "$1" "$2"
}

# fetch command line arguments
AWSRegion=$1
if [[ ! $AWSRegion =~ ^[a-z]{2}-[a-z]+-[0-9]$ ]]; then
  exitError "AWS target region in correct format required as first argument"
fi

appBuildNumber=$2
if [[ ! $appBuildNumber =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  exitError "Application build number in correct format required as second argument"
fi

# check for required binaries
if [[ ! -x $AWS_CLI_BIN ]]; then
  exitError "AWS CLI tools not installed"
fi

# validate AWS access key credentials are defined as environment variables
if [[ (-z $AWS_ACCESS_KEY_ID) || (-z $AWS_SECRET_ACCESS_KEY) ]]; then
  exitError "Missing AWS access key / secret access key credentials"
fi

if [[ $AWS_ENVIRONMENT_NAME = "staging" ]]; then
    staticBuildTargetS3Path="s3://$S3_BUCKET_NAME/$STAGING_BUCKET_PATH"
elif [[ $AWS_ENVIRONMENT_NAME = "production" ]]; then
    staticBuildTargetS3Path="s3://$S3_BUCKET_NAME/$PRODUCTION_BUCKET_PATH"
else
    exitError "Cannont deploy asset to unknown environment $AWS_ENVIRONMENT_NAME"
fi

echo "Publishing static assets to S3 bucket $staticBuildTargetS3Path"

# compress and publish assets
pushAsset "$staticBuildTargetS3Path/index-$appBuildNumber.html" "$staticBuildTargetS3Path/index.html"

# success
exit 0
