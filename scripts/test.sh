#!/usr/bin/env sh

# build site scrips/css/assets 
npm run build

# Generate website
npm run generate

# Unit test website
htmlproofer --http-status-ignore "999" ./_site 