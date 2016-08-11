#!/usr/bin/env bash
set -e

echo "Environment setup: started"

if [ "$1" = "production" ]; then
echo ">> using production environment settings"
cat << EOF > .env
NODE_ENV=production
EOF

elif [ "$1" = "staging" ]; then
echo ">> using staging environment settings"
cat << EOF > .env
NODE_ENV=production
EOF

else
echo ">> using development environment settings"
cat << EOF > .env
NODE_ENV=development
EOF
fi

echo "Environment setup: finished"
