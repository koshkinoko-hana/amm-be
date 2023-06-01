import { IsArray, IsEnum, IsNumber, IsString } from 'class-validator'
import { Direction as DirectionNamespace } from '@common/entities/direction.entity'

export namespace CreateRequest {
  export class Direction {
    @IsString()
    number!: string

    @IsEnum(DirectionNamespace.Type)
    type!: DirectionNamespace.Type

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
}
