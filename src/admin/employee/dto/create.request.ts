import { DepartmentPositionShort } from '@common/dto/department-position-short'
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator'

export namespace CreateRequest {
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
    description!: string

    @IsOptional()
    @IsString()
    photoPath?: string

    @IsOptional()
    @IsNumber()
    photoId?: number

    @IsArray()
    departmentPositions!: DepartmentPositionShort[]
  }
}
