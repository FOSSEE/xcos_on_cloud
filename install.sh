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

sed -i \
    -e "s/\\(SCILAB_DIR = \\).*/\\1'\/usr\/local'/" \
    -e "s/\\(DB_PASS = \\).*/\\1'${DB_PASS}'/" \
    config.py

rm -f webapp/combined.js
make
