#!/usr/bin/env zsh

for file in $(find ./node_modules/three/src -name "*.d.ts" -type f); do
    flowgen ${file} -o ${file/.d.ts/.flow.js}; 
done;

for file in $(find ./node_modules/three/examples/jsm -name "*.d.ts" -type f); do
    flowgen ${file} -o ${file/.d.ts/.flow.js}; 
done;