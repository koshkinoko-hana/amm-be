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
    photoPath?: string

    @IsOptional()
    @IsNumber()
    photoId?: number

    @IsArray()
    positions!: number[]

    @IsArray()
    departments!: number[]
  }
}
