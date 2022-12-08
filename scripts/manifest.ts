import fs from 'fs-extra'
import { log, r } from './utils'
import { getManifest } from '~/manifest'

export async function writeManifest() {
  await fs.writeJSON(r('extension/manifest.json'), await getManifest(), { spaces: 2 })
  log('PRE', 'write manifest.json')
}

writeManifest()
