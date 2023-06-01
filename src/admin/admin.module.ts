import { DepartmentModule } from '@admin/department'
import { EmployeeModule } from '@admin/employee'
import { Module } from '@nestjs/common'
import { PositionModule } from './position'
import { AuthModule } from './auth'
import { UserModule } from './user'
import { GalleryPhotoModule } from './galleryPhoto'
import { DirectionModule } from './direction'

@Module({
  imports: [
    AuthModule,
    DepartmentModule,
    EmployeeModule,
    PositionModule,
    UserModule,
    GalleryPhotoModule,
    DirectionModule,
  ],
})
export class AdminModule {}
