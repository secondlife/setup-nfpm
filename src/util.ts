import * as os from 'os'

export function cliName(): string {
  return onWindows() ? 'nfpm.exe' : 'nfpm'
}

export function onWindows(): boolean {
  return os.platform().startsWith('win')
}

export function downloadUrl(version: string): string {
  const platform = cliPlatform()
  const arch = cliArch()
  const ext = onWindows() ? 'zip' : 'tar.gz'
  return `https://github.com/goreleaser/nfpm/releases/download/v${version}/nfpm_${version}_${platform}_${arch}.${ext}`
}

function cliArch(): string {
  return os.arch().startsWith('arm') ? 'arm64' : 'x86_64'
}

function cliPlatform(): string {
  if (onWindows()) {
    return 'Windows'
  } else if (os.platform().includes('darwin')) {
    return 'Darwin'
  }
  return 'Linux'
}
