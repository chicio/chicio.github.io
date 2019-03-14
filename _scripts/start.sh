#!/usr/bin/env sh

# Clean previous build
rm -Rf _site/

# Run pages-gem with bundler
bundle exec jekyll serve