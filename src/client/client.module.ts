import { Module } from '@nestjs/common'
import { NewsModule } from './news'
import { GalleryPhotoModule } from './galleryPhoto'
import { DirectionModule } from './direction'

@Module({
  imports: [NewsModule, GalleryPhotoModule, DirectionModule],
})
export class ClientModule {}
