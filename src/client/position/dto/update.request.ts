import { IsString } from 'class-validator'

export namespace UpdateRequest {
  export class Position {
    @IsString()
    name!: string
  }
}
