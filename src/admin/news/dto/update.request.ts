import { IsNumber, IsOptional, IsString } from 'class-validator'

export namespace UpdateRequest {
  export class News {
    @IsString()
    name!: string

    @IsOptional()
    @IsString()
    description?: string

    @IsOptional()
    @IsString()
    article?: string

    @IsNumber()
    photoId?: number
  }
}
