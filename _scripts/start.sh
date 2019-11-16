#!/usr/bin/env zsh

# Use rvm 
source ~/.rvm/scripts/rvm
rvm use 2.6.0

# Clean previous build
rm -Rf _site/

# Run pages-gem with bundler
bundle exec jekyll serve --host=0.0.0.0