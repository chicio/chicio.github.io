#!/usr/bin/env sh

# Install gulp cli and flow typed
npm install --global gulp-cli@2.0.1
npm install --global flow-typed@2.5.1

# Install gem dependecies
sudo gem install bundler -n /usr/local/bin
bundle install --path vendor/bundle
