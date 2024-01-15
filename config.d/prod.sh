#!/bin/bash

sed -i \
    -e 's/\(SCILAB_INSTANCE_TIMEOUT_INTERVAL =\).*/\1 250/g' \
    -e 's/\(SCILAB_MAX_INSTANCES =\).*/\1 150/g' \
    -e 's/\(SCILAB_MIN_INSTANCES =\).*/\1 25/g' \
    -e 's/\(SCILAB_START_INSTANCES =\).*/\1 40/g' \
    -e 's/\(VERSIONED_CHECK_INTERVAL =\).*/\1 3600/g' \
    config.py
