#!/bin/bash

set -e

service mysql start
sleep 2
mysql -B \
    -e "CREATE DATABASE scilab CHARACTER SET utf8mb4; \
        CREATE USER 'scilab'@'localhost' IDENTIFIED BY '${DB_PASS}'; \
        GRANT ALL PRIVILEGES ON scilab.* TO 'scilab'@'localhost';"
mysql -B scilab < resources/scilab_tbc.sql
sleep 2
service mysql stop

rm -rf env webapp/combined.js
python3 -m venv env
. env/bin/activate
pip install -U pip setuptools wheel
pip install -r ${BRANCH}/requirements.txt

sed -i \
    -e "s/\\(DB_PASS = \\).*/\\1'${DB_PASS}'/" \
    config.py

make
