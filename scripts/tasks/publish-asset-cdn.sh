#!/bin/bash -e

DIRNAME=$(dirname $0)
AWS_CLI_BIN=$(which aws || true)

. "$DIRNAME/config"
. "$DIRNAME/lib"

# CDN Assets get cachebusted by versioning - keep for as long as possible
ASSET_MAX_AGE_SECONDS="2419200" # 28 days

# fetch command line arguments
AWSRegion=$1
if [[ ! $AWSRegion =~ ^[a-z]{2}-[a-z]+-[0-9]$ ]]; then
  exitError "AWS target region in correct format required as first argument"
fi

appBuildNumber=$2
if [[ ! $appBuildNumber =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  exitError "Application build number in correct format required as second argument"
fi

# validate AWS access key credentials are defined as environment variables
if [[ (-z $AWS_ACCESS_KEY_ID) || (-z $AWS_SECRET_ACCESS_KEY) ]]; then
  exitError "Missing AWS access key / secret access key credentials"
fi

# do expected static assets exist?
if [[ (! -f "$DIST_DIR/style.css") || (! -f "$DIST_DIR/bundle.js") ]]; then
  exitError "Unable to locate expected build static assets"
fi

if [[ $AWS_ENVIRONMENT_NAME = "staging" ]]; then
    staticBuildTargetS3Path="s3://$CDN_S3_BUCKET_NAME/$CDN_STAGING_BUCKET_PATH/$appBuildNumber"
elif [[ $AWS_ENVIRONMENT_NAME = "production" ]]; then
    staticBuildTargetS3Path="s3://$CDN_S3_BUCKET_NAME/$CDN_PRODUCTION_BUCKET_PATH/$appBuildNumber"
else
    exitError "Cannont deploy asset to unknown environment $AWS_ENVIRONMENT_NAME"
fi

echo "Publishing CDN assets to S3 bucket $staticBuildTargetS3Path"

# compress and publish assets
for f in $(find $DIST_DIR -type f)
do
    compressAndPushAsset "$f" "$staticBuildTargetS3Path/${f#*/}"
done

# success
exit 0
