#!/usr/bin/env bash

set -euxo pipefail

echo "${NFPM_VERSION?no NFPM_VERSION defined}"


case "$RUNNER_OS" in
  Windows|Linux)
    platform="$RUNNER_OS"
    ;;
  macOS)
    platform=Darwin
    ;;
  *)
    echo "Unsupported RUNNER_OS: $RUNNER_OS" >&2
    echo "::error title=Unsupported RUNNER_OS::Unsupported RUNNER_OS '$RUNNER_OS'. Please run on a Linux, macOS or Windows runner."
    exit 1
    ;;
esac

case "$RUNNER_ARCH" in
  arm*)
    arch=arm64
    ;;
  *)
    arch=x86_64
    ;;
esac

case "$platform" in
  Windows)
    ext=zip
    ;;
  *)
    ext=tar.gz
    ;;
esac

filename="nfpm_${NFPM_VERSION}_${platform}_${arch}.${ext}"
url="$GITHUB_SERVER_URL/goreleaser/nfpm/releases/download/v$NFPM_VERSION/$filename"

echo "filename=$filename" >> "$GITHUB_OUTPUT"
echo "download-url=$url" >> "$GITHUB_OUTPUT"
