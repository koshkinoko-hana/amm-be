import { IsNumber, IsOptional, IsString } from 'class-validator'

export namespace CreateRequest {
  export class News {
    @IsString()
    slug!: string

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
