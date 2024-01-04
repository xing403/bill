import api from '..'
import type { HTTPResponse } from '@/types/global'

export default {
  addition: (data: Bill.IBillType) => api.post('/bill/addition', data, { headers: {} }),
  listByUserIdAndDataTime: (data: { dataTime: string; page: number; pageSize: number }): Promise<HTTPResponse.success<Bill.IBillState>> => api.post('/bill/listByUserIdAndDataTime', data, { headers: { format: true } }),
  getById: (data: { id: number }): Promise<HTTPResponse.success<Bill.IBillType>> => api.post('/bill/getById', data, { headers: { format: true } }),

  update: (data: Bill.IBillType) => api.post('/bill/update', data, { headers: {} }),
  delete: (data: { id: number }) => api.post('/bill/delete', data, { headers: { format: true } }),
  information: () => api.get('/bill/information', { headers: {} }),
}
