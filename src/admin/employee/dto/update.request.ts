import { DepartmentPositionShort } from '@common/dto/department-position-short'
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
    departmentPositions!: DepartmentPositionShort[]
  }
}
