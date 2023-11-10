#!/bin/bash

set -e

rm -f scilab.sqlite3
sqlite3 scilab.sqlite3 < resources/scilab_tbc.sql

sed -i \
    -e "s/\\(SCILAB_DIR = \\).*/\\1'\/usr\/local'/" \
    config.py

rm -f webapp/combined.js
make
