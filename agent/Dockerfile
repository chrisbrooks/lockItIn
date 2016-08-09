FROM mhart/alpine-node:4.4.7

# alpine does not come with bash :(
RUN apk add --no-cache bash

# environment variable allowing scripts to detect running inside a Docker build agent container
ENV DOCKER_BUILD_CONTAINER true

CMD ["bash"]
