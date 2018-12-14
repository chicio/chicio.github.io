#!/usr/bin/env sh

# Enter into js source folder
cd _js 

# Run flow
../node_modules/.bin/flow 

# Remove flow types
../node_modules/.bin/flow-remove-types ../_js/ -d ../_jsbuild/ -i flow-typed/