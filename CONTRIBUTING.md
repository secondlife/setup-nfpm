# Contributing

Thanks for your interest in contributing!

## Maintainer Instructions

A `.github/release.yml` configuration file is provided to drive automatic
generation of release notes. More information about this tool can be found
[here][automatic-releases].

While reviewing pull requests several labels are used in order to collect
release notes line items:

- `breaking-change` - Breaking changes
- `enhancement` - Enhancement/feature
- `ignore-for-release` - Exclude from release notes
- `semver-major` - Breaking changes, significant release
- `semver-minor` - Enhancement/feature

Be sure to add these to PRs order to autopopulate release notes!

[automatic-releases]: https://docs.github.com/en/repositories/releasing-projects-on-github/automatically-generated-release-notes
