#!/usr/bin/env bash

# Runs composer install on target host.
# There is an Ansible module for this,
# however errors occurred when we used this module.
# That is why we use this manual workaround.

cd /var/www/current
composer install
