#!/usr/bin/env zsh

# Build site
npm run build

# Add all files modified (not only package.json)
git add .
