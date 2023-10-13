#!/bin/bash

set -e

service mysql start
sleep 2

. env/bin/activate
python ./SendLog.py
