import { addCollection } from '@iconify/vue'

export async function downloadAndInstall() {
  const icons = Object.freeze(await fetch('./icons/index.json').then(r => r.json()))
  const list: Array<any> = []
  icons.list.forEach(async (icon: string) => {
    const data = Object.freeze(await fetch(`./icons/${icon}`).then(r => r.json()))
    list.push({
      prefix: data.prefix,
      info: data.info,
    })
    addCollection(data)
  })
  return list
}
