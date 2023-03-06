import { IsString } from 'class-validator'

export namespace AuthorizarionRequest {
  export class Credentials {
    @IsString()
    readonly login!: string

    @IsString()
    readonly password!: string
  }
}
