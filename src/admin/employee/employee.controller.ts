import { EmployeeResponse } from '@admin/employee/dto/employee.response'
import { InjectLogger, Logger } from '@logger'
import { Body, Controller, Delete, Get, Param, Put, UseGuards } from '@nestjs/common'
import { FindAllResponse } from './dto/find-all.response'
import { UpdateRequest } from './dto/update.request'
import { EmployeeService } from './employee.service'
import { StructureDataAuthGuard } from '@admin/auth/guards'

@UseGuards(StructureDataAuthGuard)
@Controller('/admin/employee')
export class EmployeeController {
  constructor(
    @InjectLogger(EmployeeController)
    private readonly logger: Logger,
    private readonly departmentService: EmployeeService,
  ) {
    this.logger.child('constructor').trace('<>')
  }

  @Get()
  public async findAll(): Promise<FindAllResponse.Employee[]> {
    const logger = this.logger.child('findAll')
    logger.trace('>')
    const res = await this.departmentService.findAll()

    logger.trace({ res }, '<')
    return res
  }

  @Put(':id')
  public async update(
    @Param('id') id: number,
    @Body() req: UpdateRequest.Employee,
  ): Promise<EmployeeResponse> {
    const logger = this.logger.child('update')
    logger.trace('>')
    const res = await this.departmentService.update(id, req)

    logger.trace({ res }, '<')
    return res
  }

  // @Post()
  // public async create(@Body() req: CreateRequest.Employee): Promise<DepartmentResponse> {
  //   const logger = this.logger.child('update')
  //   logger.trace('>')
  //   const res = await this.departmentService.create(req)
  //
  //   logger.trace({ res }, '<')
  //   return res
  // }

  @Delete(':id')
  public async delete(@Param('id') id: number): Promise<number> {
    const logger = this.logger.child('update')
    logger.trace('>')
    const res = await this.departmentService.delete(id)

    logger.trace({ res }, '<')
    return res
  }
}
