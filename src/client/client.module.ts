import { Module } from '@nestjs/common'
import { NewsModule } from './news'
import { GalleryPhotoModule } from './galleryPhoto'
import { DirectionModule } from './direction'
import { ClientDepartmentModule } from './department'
import { ClientEmployeeModule } from './employee'
import { ClientPositionModule } from './position'
import { ClientFaqModule } from './faq'

@Module({
  imports: [
    NewsModule,
    GalleryPhotoModule,
    DirectionModule,
    ClientEmployeeModule,
    ClientPositionModule,
    ClientDepartmentModule,
    ClientFaqModule,
  ],
})
export class ClientModule {}
