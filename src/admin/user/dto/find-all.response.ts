import { User as UserEntity } from '@entities'

export namespace FindAllResponse {
  export class User {
    readonly id: number
    readonly login: string
    readonly fullName?: string
    readonly roles: UserEntity.Role[]

    constructor(props: UserEntity) {
      this.id = props.id
      this.login = props.login
      this.fullName = props.fullName
      this.roles = props.roles
    }
  }
}
