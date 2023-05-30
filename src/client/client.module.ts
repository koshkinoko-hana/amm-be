import { Module } from '@nestjs/common'
import { NewsModule } from './news'
import { DepartmentModule } from './department'
import { EmployeeModule } from './employee'
import { PositionModule } from './position'

@Module({
  imports: [DepartmentModule, EmployeeModule, PositionModule, NewsModule],
})
export class ClientModule {}
