#!/bin/sh
cd /app

yarn install

rm -rf /tmp/nitro/worker-*

yarn dev -o