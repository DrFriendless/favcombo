#!/usr/bin/env bash

rm -rf dist/*
npm run build fav-combo --prod
cd dist/fav-combo
npm publish
