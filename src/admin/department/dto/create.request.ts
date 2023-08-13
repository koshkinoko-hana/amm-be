import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator'

export namespace CreateRequest {
  export class Department {
    @IsString()
    name!: string

    @IsOptional()
    @IsString()
    description?: string

    @IsNumber()
    headId!: number

    @IsArray()
    competencies!: string[]
  }
}
