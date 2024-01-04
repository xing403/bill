import axios from 'axios'

import qs from 'qs'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/user'

const api = axios.create({
  baseURL: (import.meta.env.DEV && import.meta.env.VITE_OPEN_PROXY === 'true') ? '/proxy/' : import.meta.env.VITE_APP_API_BASEURL,
  timeout: 1000 * 60,
  responseType: 'json',
})

api.interceptors.request.use(
  (request) => {
    const userStore = useUserStore()

    if (userStore.isLogin && request.headers) {
      request.headers.Authorization = userStore.token
    }
    // 是否将 POST 请求参数进行字符串化处理
    if (request.headers.format && request.method === 'post') {
      request.data = qs.stringify(request.data, {
        arrayFormat: 'brackets',
      })
    }
    return request
  },
)

api.interceptors.response.use(
  (response) => {
    return new Promise((resolve, reject) => {
      const code = response.data.code ?? 0
      if (code === 0) {
        return resolve(response.data)
      }
      else if (code === 40100) {
        useUserStore().logout()
        ElMessage.error(response.data.message)
        return reject(response.data)
      }
      else {
        ElMessage.error(response.data.message)
        return reject(response.data)
      }
    })
  },
  (error) => {
    let message = error.message
    if (message === 'Network Error') {
      message = '后端网络故障'
    }
    else if (message.includes('timeout')) {
      message = '接口请求超时'
    }
    else if (message.includes('Request failed with status code')) {
      message = `接口${message.substr(message.length - 3)}异常`
    }
    ElMessage({
      message,
      type: 'error',
    })
    return Promise.reject(error)
  },
)

export default api
