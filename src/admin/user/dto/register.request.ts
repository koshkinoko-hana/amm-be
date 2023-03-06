import {IsEnum, IsString} from 'class-validator'
import {User} from '@entities'

export namespace RegisterRequest {
  export class Credentials {
    @IsString()
    readonly login!: string

    @IsString()
    readonly password!: string

    @IsEnum(User.Role)
    readonly role?: User.Role
  }
}
