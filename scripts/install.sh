#!/usr/bin/env sh

# Init pages-gem submodule
git submodule update --init

# Install/Update core utils to use docker startup github-pages function
brew install coreutils

# Create github pages docker image
cd pages-gem
make image
