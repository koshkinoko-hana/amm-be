import { User as UserEntity } from '@entities'

export namespace UpdateRequest {
  export class User {
    roles!: UserEntity.Role[]
    companyId?: number
    password?: string
    status!: UserEntity.Status
  }
}
