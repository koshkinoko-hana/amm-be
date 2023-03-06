import {IsArray, IsOptional, IsString} from 'class-validator'

export namespace UpdateRequest {
  export class Department {
    @IsString()
    name!: string

    @IsOptional()
    description?: string

    @IsArray()
    competencies!: string[]
  }
}
