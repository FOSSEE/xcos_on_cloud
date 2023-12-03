#!/bin/bash

set -e

python3 -m venv env
. env/bin/activate
pip install -q -U pip setuptools wheel
pip install -q -r ${BRANCH}/requirements.txt
pip uninstall -q -y pip wheel

sqlite3 scilab.sqlite3 < resources/scilab_tbc.sql

sed -i \
    -e "s/\\(SCILAB_DIR = \\).*/\\1'\/usr\/local'/" \
    -e "s/\\(BRANCH = \\).*/\\1'${BRANCH}'/" \
    config.py

make

find \( -name __pycache__ -o -name \*.exe \) -print0 | xargs -0 rm -r
rm -rf install.sh master-* resources webapp/data_structures Makefile
