declare namespace Bill {
  export interface IBillType {
    id?: number
    title: string
    amount: number
    type: number
    tags: string | string[]
    detail: string
    dataTime: string
    userId?: number
    createTime?: string
    updateTime?: string
    isDelete?: boolean
  }

  export interface IBillState {
    list: IBillType[]
    total: number
    page: number
    pageSize: number
  }

}
