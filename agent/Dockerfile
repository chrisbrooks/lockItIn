FROM mhart/alpine-node:4.4.7

# alpine does not come with bash :(
RUN apk add --no-cache bash

# cache required application npm modules for both production and development builds
ADD ../package.json .

ENV NODE_ENV production
RUN npm install --loglevel warn && \
  echo "production node module versions:" && \
  npm list || true && \
  tar -czf /node_modules_prod.tar node_modules && \
  rm -rf node_modules

ENV NODE_ENV development
RUN npm install --loglevel warn && \
  echo "development node module versions:" && \
  npm list || true && \
  tar -czf /node_modules_dev.tar node_modules && \
  rm -rf node_modules

# environment variable allowing scripts to detect running inside a Docker build agent container
ENV DOCKER_BUILD_CONTAINER true

CMD ["bash"]
