import { DepartmentResponse } from '@admin/department/dto/department.response'
import { InjectLogger, Logger } from '@logger'
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common'
import { CreateRequest } from './dto/create.request'
import { FindAllResponse } from './dto/find-all.response'
import { UpdateRequest } from './dto/update.request'
import { DepartmentService } from './department.service'
import { StructureDataAuthGuard } from '@admin/auth/guards'

@UseGuards(StructureDataAuthGuard)
@Controller('/admin/department')
export class DepartmentController {
  constructor(
    @InjectLogger(DepartmentController)
    private readonly logger: Logger,
    private readonly departmentService: DepartmentService,
  ) {
    this.logger.child('constructor').trace('<>')
  }

  @Get()
  public async findAll(): Promise<FindAllResponse.Department[]> {
    const logger = this.logger.child('findAll')
    logger.trace('>')
    const res = await this.departmentService.findAll()

    logger.trace({ res }, '<')
    return res
  }

  @Put(':id')
  public async update(
    @Param('id') id: number,
    @Body() req: UpdateRequest.Department,
  ): Promise<DepartmentResponse> {
    const logger = this.logger.child('update')
    logger.trace('>')
    const res = await this.departmentService.update(id, req)

    logger.trace({ res }, '<')
    return res
  }

  @Post()
  public async create(@Body() req: CreateRequest.Department): Promise<DepartmentResponse> {
    const logger = this.logger.child('update')
    logger.trace('>')
    const res = await this.departmentService.create(req)

    logger.trace({ res }, '<')
    return res
  }

  @Delete(':id')
  public async delete(@Param('id') id: number): Promise<number> {
    const logger = this.logger.child('update')
    logger.trace('>')
    const res = await this.departmentService.delete(id)

    logger.trace({ res }, '<')
    return res
  }
}
