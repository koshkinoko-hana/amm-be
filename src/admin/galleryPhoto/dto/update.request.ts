import { IsDate, IsOptional, IsString } from 'class-validator'

export namespace UpdateRequest {
  export class GalleryPhoto {
    @IsOptional()
    @IsString()
    title?: string

    @IsDate()
    photoDate!: Date

    @IsOptional()
    @IsString()
    link?: string
  }
}
