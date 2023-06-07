import { IsArray, IsOptional, IsString } from 'class-validator'

export class DepartmentResponse {
  @IsString()
  name!: string

  @IsOptional()
  description?: string

  @IsArray()
  competencies!: string[]
}
