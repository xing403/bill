import type { Settings } from '#/global'

const globalSettings: Settings.all = {
  app: {
    enablePermission: true,
    enableDynamicTitle: true,
    enableAppSetting: false,
    colorScheme: 'light',
    elementSize: 'default',
    iconifyOfflineUse: true,
    enableProgress: true,
    routeBaseOn: 'frontend',
  },
  layout: {
    enableMobileAdaptation: true,
  },
  menu: {
    enableSubMenuCollapseButton: true,
    enableHotkeys: false,
    baseOn: 'frontend',
    menuMode: 'side',
    switchMainMenuAndPageJump: true,
    subMenuUniqueOpened: true,
    subMenuCollapse: false,
  },
  topbar: {
    mode: 'sticky',
  },
  toolbar: {
    enableFullscreen: true,
    enablePageReload: true,
    enableColorScheme: true,
  },
  copyright: {
    enable: true,
    dates: '',
    company: '',
    website: '',
    beian: '',
  },
  home: {
    enable: true,
    title: '首页',
  },
  breadcrumb: {
    enable: true,
  },
  navSearch: {
    enable: true,
    enableHotkeys: true,
  },
}

export default globalSettings
