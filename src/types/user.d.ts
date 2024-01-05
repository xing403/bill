declare namespace User {
  export interface IUserType {
    id?: number
    username: string
    password: string
    avatar: string
    email: string
    phone: string
    gender: number
    auth: string
    status: number
    createTime?: string
    updateTime?: string
    isDelete?: boolean
  }

  export interface IUserState {
    list: IUserType[]
    total: number
    page: number
    pageSize: number
  }

}
