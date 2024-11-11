#!/bin/bash
set -e

# Remove a potentially pre-existing server.pid for Rails.
rm -f /myApp/tmp/pids/server.pid

bundle install

bundle exec rake db:create
bundle exec rake db:migrate
bundle exec rake db:seed

# Then exec the container's main process (what's set as CMD in the Dockerfile).
exec "$@"