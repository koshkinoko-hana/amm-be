import { Module } from '@nestjs/common'
import { NewsModule } from './news'
import { GalleryPhotoModule } from './galleryPhoto'

@Module({
  imports: [NewsModule, GalleryPhotoModule],
})
export class ClientModule {}
