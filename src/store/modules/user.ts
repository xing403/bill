import useRouteStore from './route'
import useMenuStore from './menu'
import router from '@/router'
import apiUser from '@/api/modules/user'

const useUserStore = defineStore(
  // 唯一ID
  'user',
  () => {
    const routeStore = useRouteStore()
    const menuStore = useMenuStore()

    const account = ref(localStorage.username ?? '')
    const token = ref(localStorage.token ?? '')
    const failure_time = ref(localStorage.failure_time ?? '')
    const permissions = ref<string[]>([])
    const information = ref<User.IUserType>()
    const isLogin = computed(() => {
      let status = false
      if (token.value) {
        if (new Date().getTime() < Number.parseInt(failure_time.value) * 1000) {
          status = true
        }
      }
      return status
    })

    // 登录
    async function login(data: {
      username: string
      password: string
      code: string
      uuid: string
    }) {
      const res = await apiUser.login(data)
      localStorage.setItem('username', data.username)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('failure_time', res.data.failure_time)
      account.value = res.data.account
      token.value = res.data.token
      failure_time.value = res.data.failure_time
    }
    // 登出
    async function logout(redirect = router.currentRoute.value.fullPath) {
      localStorage.removeItem('username')
      localStorage.removeItem('token')
      localStorage.removeItem('failure_time')
      account.value = ''
      token.value = ''
      failure_time.value = ''
      routeStore.removeRoutes()
      menuStore.setActived(0)
      router.push({
        name: 'login',
        query: {
          ...(router.currentRoute.value.path !== '/' && router.currentRoute.value.name !== 'login' && { redirect }),
        },
      })
    }
    // 获取我的权限
    async function getPermissions() {
      const res = await apiUser.information()
      information.value = res.data
      permissions.value = [res.data.auth]
      return permissions.value
    }
    // 修改密码
    async function editPassword(data: {
      password: string
      newPassword: string
      checkPassword: string
    }) {
      return await apiUser.passwordEdit(data)
    }

    return {
      account,
      token,
      permissions,
      information,
      isLogin,
      login,
      logout,
      getPermissions,
      editPassword,
    }
  },
)

export default useUserStore
