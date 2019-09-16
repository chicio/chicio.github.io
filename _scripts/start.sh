#!/usr/bin/env sh

# Clean previous build
rm -Rf _site/

# Run pages-gem with bundler
bundle exec jekyll serve --host=0.0.0.0