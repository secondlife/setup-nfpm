#!/usr/bin/env bash

set -euxo pipefail

download_url="${1?url argument required}"
shift
tool_cache_path="${1?tool cache path argument required}"
shift

filename="$(basename "$download_url")"

curl -sLO "$download_url"

case "$filename" in
  *.zip)
    unzip "$filename" -d "$tool_cache_path"
    ;;
  *.tar.gz)
    tar -C "$tool_cache_path" -xf "$filename"
    ;;
esac

touch "${tool_cache_path}.complete"
echo "$tool_cache_path" >> "$GITHUB_PATH"
