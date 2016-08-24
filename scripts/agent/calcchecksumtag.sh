#!/bin/bash -e

# use md5sum or md5 to calculate checksum (based on OS type)
MD5Bin="md5"
if command -v md5sum 2>&1>/dev/null; then
  MD5Bin="md5sum"
fi

if [[
	(! -f package.json) ||
	(! -f agent/scripts/Dockerfile)
]]; then
  # unable to locate files to generate checksum
  echo -n ""
  exit 0
fi

# create MD5 checksum based on the contents all all files that detemine the Docker build agent makeup
cat package.json agent/scripts/Dockerfile | \
  $MD5Bin | \
  grep -Eo "^.{32}"
