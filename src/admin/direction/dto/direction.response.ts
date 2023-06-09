import { IsArray, IsNumber, IsString } from 'class-validator'

export class DirectionResponse {
  @IsNumber()
  id!: number

  @IsString()
  number!: string

  @IsString()
  type!: string

  @IsString()
  name!: string

  @IsArray()
  features!: string[]

  @IsArray()
  profiles!: string[]

  @IsArray()
  forms!: string[]

  @IsNumber()
  price!: number

  @IsArray()
  exams!: string[]
}
