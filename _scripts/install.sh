#!/usr/bin/env sh

# Install gulp cli and flow typed
npm install --global gulp-cli@2.0.1
npm install --global flow-typed@2.5.1

# Set rvm to use ruby 2.6.0
rvm install 2.6.0
rvm use 2.6.0

# Install gem dependecies
gem install bundler
bundle install --path vendor/bundle
