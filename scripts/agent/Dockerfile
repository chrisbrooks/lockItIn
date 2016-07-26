FROM node:5.11.1

# Install system dependencies
RUN apt-get -q update && \
    apt-get install -y curl zip python wget

# Install AWS CLI
RUN cd /tmp && \
    curl "https://s3.amazonaws.com/aws-cli/awscli-bundle.zip" -o "awscli-bundle.zip" && \
    unzip awscli-bundle.zip && \
    ./awscli-bundle/install -i /usr/local/aws -b /usr/local/bin/aws

# Install Sauce Connect in container
RUN mkdir -p /var/tmp/sc \
  && cd /var/tmp/sc \
  && wget http://saucelabs.com/downloads/sc-4.3.11-linux.tar.gz \
  && cd /usr/local/lib \
  && tar -zxvf /var/tmp/sc/sc-4.3.11-linux.tar.gz \
  && cp /usr/local/lib/sc-4.3.11-linux/bin/sc /usr/local/bin/sc

# cache required application npm modules for development builds
ADD package.json .
ENV NODE_ENV development
RUN npm install --loglevel warn && \
    echo "development node module versions:" && \
    npm list || true && \
    tar -czf /node_modules_dev.tar node_modules && \
    rm -rf node_modules

# environment variable allowing scripts to detect running inside a Docker build agent container
ENV DOCKER_BUILD_CONTAINER true

CMD ["bash"]
