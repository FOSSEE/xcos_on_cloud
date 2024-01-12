#!/bin/bash

set -e

IPADDR=$( ip addr show | awk -F '[ /]+' '/inet .* eth/ { print $3; }' )
sed -i \
    -e "s/\\(HTTP_SERVER_HOST = \\).*/\\1'${IPADDR}'/" \
    config.py

for f in config.d/*; do
    test -f "$f" -a -x "$f" || continue
    "$f"
done

. env/bin/activate
python3 ./SendLog.py
