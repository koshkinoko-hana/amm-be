import { IsArray, IsOptional, IsString } from 'class-validator'

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
    photo?: string

    @IsArray()
    positions!: number[]
  }
}
