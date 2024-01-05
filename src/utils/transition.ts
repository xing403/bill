import { GENDER_DICT, IDENTITY_DICT, STATUS_DICT, YES_NO_DICT } from '@/utils/dictionary'
import dayjs from '@/utils/dayjs'

export function formatTime(date: string, format = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(date).format(format)
}
export function formatMoney(money: number) {
  if (money < 10000) {
    return money.toFixed(2)
  }
  else if (money < 1000000) {
    return `${(money / 10000).toFixed(2)}万`
  }
  else {
    return `${(money / 1000000).toFixed(2)}亿`
  }
}
export function formatMonth(month: number) {
  if (month <= 0 || month > 12) {
    return 'NAN 月'
  }
  else if (month < 10) {
    return `0${month}月`
  }
  else {
    return `${month}月`
  }
}
export function formatGender(key: number | string) {
  return GENDER_DICT[key]
}
export function formatIdentity(key: number | string) {
  return IDENTITY_DICT[key]
}

export function formatYesOrNo(key: number | string) {
  return YES_NO_DICT[key]
}
export function formatUserStatus(key: number | string) {
  return STATUS_DICT[key]
}
