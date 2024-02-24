#!/bin/bash
SNAPSHOT_PATH=$(node -p "require('path').resolve('cypress/snapshots')")
docker run --rm --name test-run -v "$SNAPSHOT_PATH:/app/cypress/snapshots" critical-pass-app:latest
