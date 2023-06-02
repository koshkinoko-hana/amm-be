import { IsEmail, IsOptional, IsString } from 'class-validator'

export namespace UpdateRequest {
  export class Faq {
    @IsString()
    firstName!: string

    @IsOptional()
    @IsString()
    middleName!: string

    @IsString()
    lastName!: string

    @IsEmail()
    email!: string

    @IsString()
    question!: string

    @IsOptional()
    @IsString()
    answer!: string

    @IsOptional()
    @IsString()
    respondent!: string
  }
}
