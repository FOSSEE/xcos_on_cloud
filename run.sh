#!/bin/bash

set -e

service mysql start
sleep 2

IPADDR=$( ip addr show | awk -F '[ /]+' '/inet .* eth/ { print $3; }' )
sed -i \
    -e "s/\\(HTTP_SERVER_HOST = \\).*/\\1'${IPADDR}'/" \
    config.py

. env/bin/activate
python ./SendLog.py
