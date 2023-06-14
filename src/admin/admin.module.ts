import { DepartmentModule } from '@admin/department'
import { EmployeeModule } from '@admin/employee'
import { NewsModule } from '@admin/news'
import { Module } from '@nestjs/common'
import { PositionModule } from './position'
import { AuthModule } from './auth'
import { UserModule } from './user'
import { GalleryPhotoModule } from './galleryPhoto'
import { DirectionModule } from './direction'
import { FaqModule } from './faq'

@Module({
  imports: [
    AuthModule,
    DepartmentModule,
    EmployeeModule,
    NewsModule,
    PositionModule,
    UserModule,
    GalleryPhotoModule,
    DirectionModule,
    FaqModule,
  ],
})
export class AdminModule {}
