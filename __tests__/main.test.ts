import {describe, expect, test} from '@jest/globals'
import {JsonWebKeyInput} from 'crypto'
import * as util from '../src/util'

jest.mock('os')
import os from 'os'

describe('downloadUrl', () => {
  const cases = [
    [
      'linux',
      'x64',
      'https://github.com/goreleaser/nfpm/releases/download/v2.10.0/nfpm_2.10.0_Linux_x86_64.tar.gz'
    ],
    [
      'linux',
      'arm64',
      'https://github.com/goreleaser/nfpm/releases/download/v2.10.0/nfpm_2.10.0_Linux_arm64.tar.gz'
    ],
    [
      'darwin',
      'x64',
      'https://github.com/goreleaser/nfpm/releases/download/v2.10.0/nfpm_2.10.0_Darwin_x86_64.tar.gz'
    ],
    [
      'win32',
      'x64',
      'https://github.com/goreleaser/nfpm/releases/download/v2.10.0/nfpm_2.10.0_Windows_x86_64.zip'
    ]
  ]

  test.each(cases)('URL for %s-%s', (platform, arch, expected) => {
    os.platform = jest.fn().mockImplementation(() => platform)
    os.arch = jest.fn().mockImplementation(() => arch)
    const got = util.downloadUrl('2.10.0')
    expect(got).toBe(expected)
  })
})
