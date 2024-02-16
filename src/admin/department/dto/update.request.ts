import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator'

export namespace UpdateRequest {
  export class Department {
    @IsString()
    name!: string

    @IsOptional()
    description?: string

    @IsNumber()
    head!: number

    @IsArray()
    competencies!: string[]

    @IsString()
    address!: string

    @IsArray()
    phones!: string[]

    @IsString()
    email!: string
  }
}
