import os from 'os'
import {jest} from '@jest/globals'

export const platform = jest.fn<typeof os.platform>()
export const arch = jest.fn<typeof os.arch>()
