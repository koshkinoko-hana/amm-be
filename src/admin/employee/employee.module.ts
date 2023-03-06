import { LoggerModule } from '@logger'
import { Module } from '@nestjs/common'
import { EmployeeController } from './employee.controller'
import { EmployeeService } from './employee.service'

@Module({
  imports: [LoggerModule.forFeature([EmployeeController, EmployeeService])],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
