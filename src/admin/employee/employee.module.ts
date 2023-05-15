import { FileHelperModule } from '@common/file-helper/file-helper.module'
import { LoggerModule } from '@logger'
import { Module } from '@nestjs/common'
import { EmployeeController } from './employee.controller'
import { EmployeeService } from './employee.service'

@Module({
  imports: [LoggerModule.forFeature([EmployeeController, EmployeeService]), FileHelperModule],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
