import api from '@/api/index'

export default {
  share: (data: any) => api.post('/share/add', data, { headers: {} }),
  get: (data: { key: string }) => api.post('/share/get', data, { headers: { format: true } }),
}
