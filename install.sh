#!/bin/bash

set -e

python3 -m venv env
. env/bin/activate
pip install -q -U pip setuptools wheel
pip install -q -r ${BRANCH}/requirements.txt

sqlite3 scilab.sqlite3 < resources/scilab_tbc.sql

sed -i \
    -e "s/\\(SCILAB_DIR = \\).*/\\1'\/usr\/local'/" \
    config.py

make
