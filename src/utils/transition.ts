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
