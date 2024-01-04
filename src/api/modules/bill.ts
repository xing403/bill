import api from '..'
import type { HTTPResponse } from '@/types/global'

export default {
  addition: (data: Bill.IBillType) => api.post('/bill/addition', data, { headers: {} }),
  listByUserIdAndDataTime: (data: { dataTime: string; page: number; pageSize: number }): Promise<HTTPResponse.success<Bill.IBillState>> => api.post('/bill/listByUserIdAndDataTime', data, { headers: { format: true } }),
}
