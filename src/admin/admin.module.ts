import { DepartmentModule } from '@admin/department'
import { EmployeeModule } from '@admin/employee'
import { NewsModule } from '@admin/news'
import { Module } from '@nestjs/common'
import { PositionModule } from './position'
import { AuthModule } from './auth'
import { UserModule } from './user'

@Module({
  imports: [AuthModule, DepartmentModule, EmployeeModule, NewsModule, PositionModule, UserModule],
})
export class AdminModule {}
