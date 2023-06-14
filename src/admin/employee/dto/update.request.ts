import { Option } from '@common/dto/option'
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator'

export namespace UpdateRequest {
  export class Employee {
    @IsString()
    firstName!: string

    @IsOptional()
    @IsString()
    middleName!: string

    @IsString()
    lastName!: string

    @IsOptional()
    @IsString()
    description?: string

    @IsOptional()
    @IsNumber()
    photoId?: number

    @IsOptional()
    @IsString()
    photoPath?: string

    @IsArray()
    positions!: Option[]

    @IsArray()
    departments!: Option[]
  }
}
