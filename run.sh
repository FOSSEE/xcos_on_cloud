#!/bin/bash

set -e

IPADDR=$( ip addr show | awk -F '[ /]+' '/inet .* eth/ { print $3; }' )
sed -i \
    -e "s/\\(HTTP_SERVER_HOST = \\).*/\\1'${IPADDR}'/" \
    config.py

. env/bin/activate
python3 ./SendLog.py
