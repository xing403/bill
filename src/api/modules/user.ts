import api from '../index'
import type { HTTPResponse } from '@/types/global'

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

  // 修改密码
  passwordEdit: (data: {
    password: string
    newPassword: string
    checkPassword: string
  }) => api.post('user/updatePassword', data, { headers: {} }),
  captcha: () => api.get('user/captcha'),

  // 当前登录用户的信息
  information: (): Promise<HTTPResponse.success<User.IUserType>> => api.get('/user/get', { headers: {} }),

  uploadInformation: (data: any): Promise<HTTPResponse.success<User.IUserType>> => api.post('user/update', data, { headers: {} }),

  deleteUser: (data: any) => api.post('/user/delete', data, { headers: { format: true } }),
  // 用户列表
  getlistByUser: (data: any): Promise<HTTPResponse.success<User.IUserState>> => api.post('user/list', data, { headers: { format: true } }),
  // 其他用户用户信息
  getUser: (data: any): Promise<HTTPResponse.success<User.IUserType>> => api.post('user/getUser', data, { headers: { format: true } }),
}
