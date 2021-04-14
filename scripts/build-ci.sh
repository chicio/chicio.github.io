#!/usr/bin/env zsh

# Build script for CI
# install gatsbyjs cli and build

npm install -g gatsby-cli
npm install
npm run build
