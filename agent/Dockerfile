FROM node:4.4.7

# install libc6 to support docker (boot2docker works without this)
# RUN echo "deb http://ftp.debian.org/debian sid main" >> /etc/apt/sources.list
RUN apt-get update

# install system dependencies
RUN apt-get -y install git zip
# RUN apt-get -y install build-essential curl dnsutils git google-chrome-stable oracle-java8-installer xvfb zip

# Copy ssh key for auth to github
RUN mkdir -p /root/.ssh/ && \
  ssh-keyscan github.com >> /root/.ssh/known_hosts

ARG sshkeybase64

# cache required application npm modules for both production and development builds
ADD package.json .

ENV NODE_ENV production
RUN echo $sshkeybase64 | base64 --decode > /root/.ssh/id_rsa && \
  chmod 600 /root/.ssh/id_rsa && \
  npm install --loglevel warn && \
  echo "production node module versions:" && \
  npm list || true && \
  tar -czf /node_modules_prod.tar node_modules && \
  rm -rf node_modules && \
  rm /root/.ssh/id_rsa

ENV NODE_ENV development
RUN echo $sshkeybase64 | base64 --decode > /root/.ssh/id_rsa && \
  chmod 600 /root/.ssh/id_rsa && \
  npm install --loglevel warn && \
  echo "development node module versions:" && \
  npm list || true && \
  tar -czf /node_modules_dev.tar node_modules && \
  rm -rf node_modules && \
  rm /root/.ssh/id_rsa

# environment variable allowing scripts to detect running inside a Docker build agent container
ENV DOCKER_BUILD_CONTAINER true

CMD ["bash"]
