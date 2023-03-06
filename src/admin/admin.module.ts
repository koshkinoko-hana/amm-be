import { DepartmentModule } from '@admin/department'
import { Module } from '@nestjs/common'
import { PositionModule } from './position'
import { AuthModule } from './auth'
import { UserModule } from './user'

@Module({
  imports: [AuthModule, DepartmentModule, PositionModule, UserModule],
})
export class AdminModule {}
