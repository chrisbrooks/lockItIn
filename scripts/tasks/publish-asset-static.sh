#!/bin/bash -e

DIRNAME=$(dirname $0)

. "$DIRNAME/../config"
. "$DIRNAME/../lib"

# We need to use max-age to do cachebusting on the static assets
ASSET_MAX_AGE_SECONDS="30" # 30 secs

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

environment=$3
if [[ ! $environment ]]; then
  exitError "Application environment is required as third argument"
fi

if [[ $environment = "staging" ]]; then
    staticBuildTargetS3Path="s3://$S3_BUCKET_NAME/$STAGING_BUCKET_PATH"
    cdnHTTPPath="https://seekcdn.com/$CDN_STAGING_BUCKET_PATH/${appBuildNumber}"
elif [[ $environment = "production" ]]; then
    staticBuildTargetS3Path="s3://$S3_BUCKET_NAME/$PRODUCTION_BUCKET_PATH"
    cdnHTTPPath="https://seekcdn.com/$CDN_PRODUCTION_BUCKET_PATH/${appBuildNumber}"
else
    exitError "Cannont deploy asset to unknown environment $environment"
fi

echo "Publishing static assets to S3 bucket $staticBuildTargetS3Path"

#Fiddle with index.html to point to CDN assets
sed -i "s@bundle.js@$cdnHTTPPath/bundle.js@" $DIST_DIR/index.html
sed -i "s@style.css@$cdnHTTPPath/style.css@" $DIST_DIR/index.html

# compress and publish assets

compressAndPushAsset "$DIST_DIR/index.html" "$staticBuildTargetS3Path/index-${appBuildNumber}.html"

# success
exit 0
