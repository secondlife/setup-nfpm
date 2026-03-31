#!/usr/bin/env bash

set -euxo pipefail

NFPM_VERSION="${1?nfpm version argument required}"
shift

# GitHub provides the @actions/tool-cache JavaScript library so folks can build
# Actions that install tools that self-hosted runner images can cache in a
# special "tool cache". The tool cache is the directory at $RUNNER_TOOL_CACHE.
# GitHub-hosted runners provide their third-party tools here, and `setup-*`
# actions using the @actions/tool-cache library will install tools there too.
# (The "tool cache" is totally separate from the job cache operated with the
# actions/cache Action.)
# <https://docs.github.com/en/actions/how-tos/create-and-publish-actions/create-a-cli-action>
# <https://github.com/actions/toolkit/tree/main/packages/tool-cache#readme>
# <https://devopsdirective.com/posts/2025/07/github-actions-tool-cache/>
# <https://docs.github.com/en/actions/reference/workflows-and-actions/variables#default-environment-variables>
#
# @actions/tool-cache installs tools to `$RUNNER_TOOL_CACHE` in the subdirectory
# `$name/$version/$architecture/`. Once a tool is installed, the Action will
# touch the file `$name/$version/$architecture.complete` to indicate that
# version is installed & ready to use. The action then adds that directory to
# the job's path so that subsequent steps will find the new tool binaries.
# <https://github.com/actions/toolkit/blob/0df75b91f/packages/tool-cache/src/tool-cache.ts#L520-L529>
#
# Because each job on a GitHub-hosted runner is isolated (the runners are
# "ephemeral"), the tool cache is reset between each run. Self-hosted runners
# may run a custom image where that version of the tool is preinstalled, or may
# be "stateful" and leave these tools installed for subsequent runs (if they
# exercise extreme caution over whose Actions they use in their workflows).
# Ultimately 99% of job runs is a "tool cache miss" where we'll download the
# tool from GitHub & install it on an ephemeral runner for just this job.

tool_cache_path="$RUNNER_TOOL_CACHE/nfpm/$NFPM_VERSION/$RUNNER_ARCH"
mkdir -p "$tool_cache_path"
echo "tool-cache-path=$tool_cache_path" >> "$GITHUB_OUTPUT"

if [[ -f "${tool_cache_path}.complete" ]]
then
    echo "tool-cache-hit=true" >> "$GITHUB_OUTPUT"
    echo "$tool_cache_path" >> "$GITHUB_PATH"
fi
