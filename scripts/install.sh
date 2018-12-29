#!/usr/bin/env sh

# Install gulp cli and flow typed
npm install --global gulp-cli@2.0.1
npm install --global flow-typed@2.5.1

# Install html proofer for unit tests
gem install html-proofer

# Install/Update core utils to use docker startup github-pages function
brew install coreutils

# Init pages-gem submodule
git submodule update --init

# Clean old docker images
docker images -a | grep "gh-pages" | awk '{print $3}' | xargs docker rmi
docker images -a | grep "ruby" | awk '{print $3}' | xargs docker rmi

# Create github pages docker image
cd pages-gem
make image
