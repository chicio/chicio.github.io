#!/usr/bin/env zsh

# Update include file of packgae.json version
printf $npm_package_version > _includes/version.txt

# Add all files modified (not only package.json)
git add .
