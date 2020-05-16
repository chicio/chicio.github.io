#!/usr/bin/env zsh

# Install npm global dependecies
npm install --global n@6.5.1
npm install --global gulp-cli@2.2.0

# Install gem dependecies
gem install bundler
bundle install --path vendor/bundle

# Install npm dependecies
npm install
