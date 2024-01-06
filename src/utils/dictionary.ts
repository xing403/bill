type TagType = '' | 'success' | 'warning' | 'info' | 'danger'

export const GENDERS_DICT = [
  { label: '男', value: '1' },
  { label: '女', value: '0' },
]
export const BILL_TYPE_DICT = [
  { label: '收入', value: 1 },
  { label: '支出', value: 2 },
]

// 性别字典
export const GENDER_DICT: {
  [key: number | string]: string
} = {
  0: '女',
  1: '男',
  2: '未知',
}
// 身份字典
export const IDENTITY_DICT: {
  [key: number | string]: string
} = {
  root: '超级管理员',
  admin: '管理员',
  user: '普通用户',
}
export const IDENTITY_ARR_DICT = ['user', 'admin', 'root']
export const IDENTITY_ARR_TAG_DICT: TagType[] = ['', 'warning', 'danger']
export const YES_NO_DICT: {
  [key: number | string]: string
} = {
  0: '否',
  1: '是',
}
export const STATUS_DICT: {
  [key: number | string]: string
} = {
  0: '正常',
  1: '停止',
}
