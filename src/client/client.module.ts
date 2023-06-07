import { Module } from '@nestjs/common'
import { NewsModule } from './news'
import { GalleryPhotoModule } from './galleryPhoto'
import { DirectionModule } from './direction'
import { DepartmentModule } from './department'
import { EmployeeModule } from './employee'
import { PositionModule } from './position'

@Module({
  imports: [
    DepartmentModule,
    EmployeeModule,
    PositionModule,
    NewsModule,
    GalleryPhotoModule,
    DirectionModule,
  ],
})
export class ClientModule {}
