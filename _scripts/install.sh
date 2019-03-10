#!/usr/bin/env sh

# Install gulp cli and flow typed
npm install --global gulp-cli@2.0.1
npm install --global flow-typed@2.5.1

# Install rvm
gpg --keyserver hkp://pool.sks-keyservers.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
curl -sSL https://get.rvm.io | bash -s stable --ruby
source /Users/chicio/.rvm/scripts/rvm

# Install gem dependecies
sudo gem install bundler
bundle install --path vendor/bundle
