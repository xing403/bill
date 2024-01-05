import api from '../index'

export default {
  // 登录
  login: (data: {
    username: string
    password: string
    code: string
    uuid: string
  }) => api.post('user/login', data),

  register: (data: {
    username: string
    password: string
    code: string
    uuid: string
  }) => api.post('user/register', data),

  information: () => api.get('/user/get', { headers: {} }),

  // 修改密码
  passwordEdit: (data: {
    password: string
    newPassword: string
    checkPassword: string
  }) => api.post('user/updatePassword', data, { headers: {} }),
  captcha: () => api.get('user/captcha'),

  uploadInformation: (data: any) => {
    return api.post('user/update', data, { headers: {} })
  },

  deleteUser: (data: any) => api.post('/api/user/delete', data, { headers: {} }),
  getlistByUser: (data: any) => api.post('user/list', data, { headers: { format: true } }),
}
