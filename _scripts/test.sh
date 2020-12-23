#!/usr/bin/env zsh

# Build site
npm run build

# Unit test website
bundle exec htmlproofer --check-html \
                        --check-img-http \
                        --check-opengraph \
                        --enforce-https \
                        --assume-extension \
                        --url-ignore "https://www.volagratis.com/,https://www.rumbo.es/,http://www.ivl.disco.unimib.it,http://www.power-sure.com/lumens.htm,http://fuckingclosuresyntax.com,http://devernay.free.fr/cours/opengl/materials.html,http://id3.org/,http://id3.org/d3v2.3.0,http://reactivex.io/,http://codingdojo.org/WhatIsCodingDojo/,http://xip.io/,http://codingdojo.org/kata/Minesweeper/,http://id3.org/Implementations,https://developer.android.com/studio/intro/keyboard-shortcuts.html,https://developer.android.com/studio/publish/app-signing#generate-key,https://developer.android.com/studio/publish/upload-bundle,https://www.googletagmanager.com/,https://twitter.com/chicio86,https://twitter.com/dan_abramov/status/1190762799338790913"  \
                        --http-status-ignore "999" \
                        --typhoeus-config "{\"followlocation\": true}" \
                        ./_site
                                                