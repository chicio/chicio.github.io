#!/usr/bin/env zsh

# Install gulp cli and flow typed
npm install --global n@6.1.2
npm install --global gulp-cli@2.2.0
npm install --global flow-typed@2.6.2
npm install --global flowgen@1.10.0  

# Set rvm to use ruby 2.6.0 (load rvm through source file)
source ~/.rvm/scripts/rvm
rvm install 2.6.0
rvm use 2.6.0

# Install gem dependecies
gem install bundler
bundle install --path vendor/bundle

# Install npm dependecies
npm install
