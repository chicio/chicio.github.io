#!/usr/bin/env zsh

# Generate service worker url for a specific section
section_name=$1

sed -n 's/.*="\(\/assets\/[^"]*\).*/"\1"/p' _includes/dependencies-$section_name.html | \
tr "\n" ", " > _includes/service-worker-$section_name-urls.js
