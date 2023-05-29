import { IsString } from 'class-validator'

export namespace CreateRequest {
  export class GalleryPhoto {
    @IsString()
    title!: string
  }
}
