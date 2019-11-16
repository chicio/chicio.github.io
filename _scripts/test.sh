#!/usr/bin/env zsh

# Use rvm 
source ~/.rvm/scripts/rvm
rvm use 2.6.0

# Build site
npm run build

# Unit test website
bundle exec htmlproofer --check-html \
                        --check-img-http \
                        --check-opengraph \
                        --enforce-https \
                        --assume-extension \
                        --url-ignore "https://www.volagratis.com/,https://www.rumbo.es/,http://www.ivl.disco.unimib.it,http://www.power-sure.com/lumens.htm,http://fuckingclosuresyntax.com,http://devernay.free.fr/cours/opengl/materials.html,http://id3.org/,http://id3.org/d3v2.3.0,http://reactivex.io/,http://codingdojo.org/WhatIsCodingDojo/,http://xip.io/,http://codingdojo.org/kata/Minesweeper/"  \
                        --http-status-ignore "999" \
                        ./_site
                        