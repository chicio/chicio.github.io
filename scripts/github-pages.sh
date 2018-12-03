#!/usr/bin/env sh

# Run docker image using github pages function
cd pages-gem
expose SITE=../
make server
