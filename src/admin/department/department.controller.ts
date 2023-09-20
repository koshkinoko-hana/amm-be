import { FindResponse } from '@admin/department/dto/find.response'
import { EmployeePositionShort } from '@common/dto/employee-short'
import { Option } from '@common/dto/option'
import { InjectLogger, Logger } from '@logger'
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common'
import { Response } from 'express'
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

  @Get(':id')
  public async find(@Param('id') id: number): Promise<FindResponse.Department> {
    const logger = this.logger.child('findAll')
    logger.trace('>')
    const res = await this.departmentService.find(id)

    logger.trace({ res }, '<')
    return res
  }

  @Get('/options')
  public async findOptions(): Promise<Option[]> {
    const logger = this.logger.child('findOptions')
    logger.trace('>')
    const res = await this.departmentService.findOptions()
    logger.trace({ res }, '<')
    return res
  }

  @Put(':id/employees')
  public async updateDepartmentEmployees(
    @Param('id') id: number,
    @Body() req: EmployeePositionShort[],
    @Res() res: Response,
  ) {
    const logger = this.logger.child('update')
    logger.trace('>')
    await this.departmentService.updateDepartmentEmployees(id, req)

    logger.trace({ res }, '<')
    res.status(HttpStatus.NO_CONTENT).send()
  }

  @Put(':id')
  public async update(
    @Param('id') id: number,
    @Body() req: UpdateRequest.Department,
    @Res() res: Response,
  ) {
    const logger = this.logger.child('update')
    logger.trace('>')
    await this.departmentService.update(id, req)

    logger.trace({ res }, '<')
    res.status(HttpStatus.NO_CONTENT).send()
  }

  @Post()
  public async create(@Body() req: CreateRequest.Department, @Res() res: Response) {
    const logger = this.logger.child('update')
    logger.trace('>')
    await this.departmentService.create(req)

    logger.trace('<')
    res.status(HttpStatus.CREATED).send()
  }

  @Delete(':id')
  public async delete(@Param('id') id: number, @Res() res: Response) {
    const logger = this.logger.child('update')
    logger.trace('>')
    await this.departmentService.delete(id)

    logger.trace('<')
    res.status(HttpStatus.NO_CONTENT).send()
  }
}
