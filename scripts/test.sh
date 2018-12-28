#!/usr/bin/env sh

# build site scrips/css/assets 
npm run build

# Generate website
npm run generate

# Unit test website
htmlproofer  --assume-extension --url_ignore "https://www.volagratis.com/,https://www.rumbo.es/" --http-status-ignore "999" ./_site