const path = require('node:path')
const fs = require('node:fs')

function getFolder(path) {
  const components = []
  const files = fs.readdirSync(path)
  files.forEach((item) => {
    const stat = fs.lstatSync(`${path}/${item}`)
    if (stat.isDirectory() === true && item !== 'components') {
      components.push(`${path}/${item}`)
      components.push(...getFolder(`${path}/${item}`))
    }
  })
  return components
}

module.exports = {
  description: '创建页面',
  prompts: [
    {
      type: 'list',
      name: 'path',
      message: '请选择页面创建目录',
      choices: getFolder('src/views'),
    },
    {
      type: 'input',
      name: 'name',
      message: '请输入文件名',
      validate: (v) => {
        return (!v || v.trim === '') ? '文件名不能为空' : true
      },
    },
    {
      type: 'input',
      name: 'title',
      message: '请输入页面标题',
      default: '默认标题',
      validate: (v) => {
        return (!v || v.trim === '') ? '页面标题不能为空' : true
      },
    },
    {
      type: 'confirm',
      name: 'isFilesystem',
      message: '是否为基于文件系统的路由页面',
      default: true,
    },
    {
      type: 'confirm',
      name: 'isLayout',
      message: '是否有布局框架页面',
      default: true,
    },
    {
      type: 'confirm',
      name: 'sidebar',
      message: '侧边栏隐藏',
      default: false,

    },
    {
      type: 'confirm',
      name: 'hasIcon',
      message: '侧边栏是否有图标',
      default: false,
      when: data => data.sidebar === false,
    },
    {
      type: 'input',
      name: 'icon',
      message: '请输入侧边栏图标',
      default: 'home',
      when: data => data.hasIcon === false,
    },
  ],
  actions: (data) => {
    const relativePath = path.relative('src/views', data.path)
    const actions = [
      {
        type: 'add',
        path: `${data.path}/{{dotCase name}}.vue`,
        templateFile: 'plop-templates/page/index.hbs',
        data: {
          title: data.title,
          layout: data.isLayout,
          hidden: data.sidebar,
          hasIcon: data.hasIcon,
          icon: data.icon ?? 'home',
          componentName: `${relativePath} ${data.name}`,
        },
      },
    ]
    return actions
  },
}
