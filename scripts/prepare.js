import path from 'node:path'
import process from 'node:process'
import fs from 'fs-extra'
import Icon from '@iconify/json'

async function prepare() {
  const iconRootPath = path.resolve(process.cwd(), 'node_modules', '@iconify', 'json', 'json')
  const files = fs.readdirSync(iconRootPath)
  const outputDir = path.resolve(process.cwd(), 'public/icons')
  await fs.ensureDir(outputDir)
  await fs.emptyDir(outputDir)
  files.forEach(async (file) => {
    const icons = fs.readFileSync(path.resolve(iconRootPath, file), 'utf-8')
    await fs.writeJSON(path.resolve(outputDir, file), JSON.parse(icons))
  })
  await fs.writeJSON(path.resolve(outputDir, 'index.json'), {
    list: files,
  })
}

prepare()
