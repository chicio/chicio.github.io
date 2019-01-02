#!/usr/bin/env sh

# Update include file of packgae.json version
echo -n $npm_package_version > _includes/version.txt

# Add all files modified (not only package.json)
git add .
