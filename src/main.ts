import * as core from '@actions/core'
import * as path from 'path'
import * as tc from '@actions/tool-cache'
import * as util from './util'

const TOOL = 'nfpm'

function cachedCli(version: string): string {
  const cachedDir = tc.find(TOOL, version)
  if (cachedDir) {
    return path.join(cachedDir, util.cliName())
  }
  return ''
}

async function downloadCli(version: string): Promise<string> {
  const url = util.downloadUrl(version)
  core.debug(`Downloading ${url}`)
  const archive = await tc.downloadTool(url)
  const extract = util.onWindows() ? tc.extractZip : tc.extractTar
  core.debug(`Extracting ${archive}`)
  const toolDir = await extract(archive, `${TOOL}-${version}`)
  const cachedDir = await tc.cacheDir(toolDir, TOOL, version)
  return path.join(cachedDir, util.cliName())
}

async function setupCli(version: string): Promise<string> {
  const cachedPath = cachedCli(version)
  if (cachedPath) {
    core.addPath(path.dirname(cachedPath))
    return cachedPath
  }
  const downloadedPath = await downloadCli(version)
  core.addPath(path.dirname(downloadedPath))
  return downloadedPath
}

async function run(): Promise<void> {
  try {
    core.startGroup('Setup nFPM CLI')
    const version = core.getInput('version')
    await setupCli(version)
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message)
    } else {
      throw error
    }
  } finally {
    core.endGroup()
  }
}

run()
