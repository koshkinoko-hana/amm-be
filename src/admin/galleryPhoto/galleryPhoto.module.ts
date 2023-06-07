import { FileHelperModule } from '@common/file-helper/file-helper.module'
import { LoggerModule } from '@logger'
import { Module } from '@nestjs/common'
import { GalleryPhotoController } from './galleryPhoto.controller'
import { GalleryPhotoService } from './galleryPhoto.service'

@Module({
  imports: [
    LoggerModule.forFeature([GalleryPhotoController, GalleryPhotoService]),
    FileHelperModule,
  ],
  controllers: [GalleryPhotoController],
  providers: [GalleryPhotoService],
})
export class GalleryPhotoModule {}
