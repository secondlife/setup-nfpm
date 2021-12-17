<p align="center">
  <a href="https://github.com/secondlife/setup-nvpm/actions"><img alt="typescript-action status" src="https://github.com/secondlife/setup-nfpm/workflows/build-test/badge.svg"></a>
</p>

# Setup nFPM CLI 

This GitHub Action downloads and installs the [nFPM][] CLI so that you can use it
with your workflows.

# Usage

Basic:

```yaml
steps:
  - uses: actions/checkout@v2
  - uses: secondlife/setup-nfpm@v1
    with:
      version: 2.10.0 # Optional version
  - run: |
      nfpm pkg --packager deb --target dist/
```

For additional information on how to use nFPM see [https://nfpm.goreleaser.com/]()

[nFPM]: https://github.com/goreleaser/nfpm
