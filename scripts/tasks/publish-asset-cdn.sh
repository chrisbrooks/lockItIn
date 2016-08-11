#!/bin/bash -e

DIRNAME=$(dirname $0)
AWS_CLI_BIN=$(which aws || true)

function compressAndPushAsset {

  echo ">> Compressing static asset $1 > $1.gz"
  gzip -c9 $1 > $1.gz

  echo ">> Pushing $1.gz to $2"
  $AWS_CLI_BIN s3 cp \
    --region $AWSRegion \
    --cache-control max-age=$ASSET_MAX_AGE_SECONDS \
    --content-encoding gzip \
    $1.gz $2
}

. "$DIRNAME/../config"
. "$DIRNAME/../lib"

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

# do expected static assets exist?
if [[ (! -f "$DIST_DIR/app-write-review.css") || (! -f "$DIST_DIR/app-write-review.js") ]]; then
  exitError "Unable to locate expected build static assets"
fi

environment=$3
if [[ ! $environment ]]; then
  exitError "Application environment is required as third argument"
fi

if [[ $environment = "staging" ]]; then
    staticBuildTargetS3Path="$CDN_S3_BUCKET_NAME/$CDN_STAGING_BUCKET_PATH/$appBuildNumber"
elif [[ $environment = "production" ]]; then
    staticBuildTargetS3Path="$CDN_S3_BUCKET_NAME/$CDN_PRODUCTION_BUCKET_PATH/$appBuildNumber"
else
    exitError "Cannont deploy asset to unknown environment $environment"

echo "Publishing static assets to S3 bucket $staticBuildTargetS3Path"

# compress and publish assets
# compressAndPushAsset "$DIST_DIR/app-write-review.js" "$staticBuildTargetS3Path/app-write-review.js"
# compressAndPushAsset "$DIST_DIR/app-write-review.css" "$staticBuildTargetS3Path/app-write-review.css"
# compressAndPushAsset "$DIST_DIR/favicon.ico" "$staticBuildTargetS3Path/favicon.ico"

# success
exit 0
