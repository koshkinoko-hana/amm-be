import {IsArray, IsOptional, IsString} from 'class-validator'

export namespace CreateRequest {
  export class Department {
    @IsString()
    name!: string

    @IsOptional()
    @IsString()
    description?: string

    @IsArray()
    competencies!: string[]
  }
}
