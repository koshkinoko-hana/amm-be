import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator'

export namespace CreateRequest {
  export class Department {
    @IsString()
    name!: string

    @IsOptional()
    @IsString()
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
