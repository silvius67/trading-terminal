#!/bin/sh
# Run ./start.sh to start Trading Terminal.
cd "$(dirname "$0")" && node server.js --open
