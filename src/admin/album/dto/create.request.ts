import { IsArray, IsDate, IsString } from 'class-validator'

export namespace CreateRequest {
  export class Album {
    @IsString()
    name!: string

    @IsDate()
    date!: Date

    @IsArray()
    photos!: number[]
  }
}
