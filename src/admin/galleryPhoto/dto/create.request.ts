import { IsOptional, IsString } from 'class-validator'

export namespace CreateRequest {
  export class GalleryPhoto {
    @IsOptional()
    @IsString()
    title?: string

    @IsString()
    link!: string
  }
}
