import { FileHelperModule } from '@common/file-helper/file-helper.module'
import { LoggerModule } from '@logger'
import { Module } from '@nestjs/common'
import { DepartmentController } from './department.controller'
import { DepartmentService } from './department.service'

@Module({
  imports: [LoggerModule.forFeature([DepartmentController, DepartmentService]), FileHelperModule],
  controllers: [DepartmentController],
  providers: [DepartmentService],
})
export class ClientDepartmentModule {}
