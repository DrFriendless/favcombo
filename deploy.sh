#!/usr/bin/env bash

rm fav-combo-*.tgz
cd dist/fav-combo
npm pack
cp fav-combo-*.tgz ../..
cd ../..
cp fav-combo-*.tgz ../repo
