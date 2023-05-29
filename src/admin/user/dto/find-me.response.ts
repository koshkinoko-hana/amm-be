import { User as UserEntity } from '@entities'

export namespace FindMeResponse {
  export class User {
    readonly id: number
    readonly login: string
    readonly fullName?: string
    readonly roles: UserEntity.Role[]
    readonly companyId?: number
    readonly companyName?: string
    readonly companyDescription?: string

    constructor(props: UserEntity) {
      this.id = props.id
      this.login = props.login
      this.fullName = props.fullName
      this.roles = props.roles
      this.companyId = props.company?.id
      this.companyName = props.company?.name
      this.companyDescription = props.company?.description
    }
  }
}
