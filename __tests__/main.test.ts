/**
 * Unit tests for the action's main functionality, src/main.ts
 *
 * To mock dependencies in ESM, you can create fixtures that export mock
 * functions and objects. For example, the core module is mocked in this test,
 * so that the actual '@actions/core' module is not imported.
 */
import {describe, expect, jest, test} from '@jest/globals'
import * as os from '../__fixtures__/os.js'

// Mocks should be declared before the module being tested is imported.
jest.unstable_mockModule('os', () => os)

// The module being tested should be imported dynamically. This ensures that the
// mocks are used in place of any actual dependencies.
const {downloadUrl} = await import('../src/util')

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
    os.platform.mockImplementation(() => platform)
    os.arch.mockImplementation(() => arch)
    const got = downloadUrl('2.10.0')
    expect(got).toBe(expected)
  })
})
