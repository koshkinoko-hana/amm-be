import {User} from '@entities'

export namespace AuthorizationResponse {
  export class AuthToken {
    readonly authToken: string
    readonly roles: User.Role[]

    constructor(props: AuthToken) {
      this.authToken = props.authToken
      this.roles = props.roles
    }
  }
}
