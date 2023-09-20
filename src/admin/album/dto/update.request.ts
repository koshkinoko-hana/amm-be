import { IsArray, IsDate, IsString } from 'class-validator'

export namespace UpdateRequest {
  export class Album {
    @IsString()
    name!: string

    @IsDate()
    date!: Date

    @IsArray()
    photos!: number[]
  }
}
