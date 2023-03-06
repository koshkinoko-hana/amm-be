import {User} from '@entities'

export namespace AuthorizationResponse {
  export class AuthToken {
    readonly authToken: string
    readonly role: User.Role

    constructor(props: AuthToken) {
      this.authToken = props.authToken
      this.role = props.role
    }
  }
}
