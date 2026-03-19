# Setup nFPM

This GitHub Action downloads and installs the [nFPM] tool so that you can use it
with your workflows.

[nFPM]: https://nfpm.goreleaser.com/


# Usage

Basic:

```yaml
steps:
  - uses: actions/checkout@v6
  - uses: secondlife/setup-nfpm@v5
    with:
      version: 2.33.1  # Optional version
  - run: |
      nfpm pkg --packager deb --target dist/
```

For additional information on how to use nFPM see https://nfpm.goreleaser.com/ .
