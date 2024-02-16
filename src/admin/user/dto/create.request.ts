import { User as UserEntity } from '@entities'

export namespace CreateRequest {
  export class User {
    login!: string
    id!: number
    roles!: UserEntity.Role[]
    companyId?: number
    password!: string
  }
}
