import { CreateRequest } from '@admin/employee/dto/create.request'
import { FindResponse } from '@admin/employee/dto/find.response'
import { Option } from '@common/dto/option'
import { UploadPhoto } from '@common/dto/upload-photo'
import { UploadedFileResponse } from '@common/file-helper/dto/uploaded-file.response'
import { FileHelperService } from '@common/file-helper/file-helper.service'
import { Photo } from '@entities'
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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Response } from 'express'
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
    private readonly employeeService: EmployeeService,
    private readonly fileHelperService: FileHelperService,
  ) {
    this.logger.child('constructor').trace('<>')
  }

  @Get('/options')
  public async findOptions(): Promise<Option[]> {
    const logger = this.logger.child('findOptions')
    logger.trace('>')
    const res = await this.employeeService.findOptions()

    logger.trace({ res }, '<')
    return res
  }

  @Get(':id')
  public async find(@Param('id') id: number): Promise<FindResponse.Employee> {
    const logger = this.logger.child('findAll')
    logger.trace('>')
    const res = await this.employeeService.find(id)

    logger.trace({ res }, '<')
    return res
  }

  @Get()
  public async findAll(): Promise<FindAllResponse.Employee[]> {
    const logger = this.logger.child('findAll')
    logger.trace('>')
    const res = await this.employeeService.findAll()

    logger.trace({ res }, '<')
    return res
  }

  @Put(':id')
  public async update(
    @Param('id') id: number,
    @Body() req: UpdateRequest.Employee,
    @Res() res: Response,
  ) {
    const logger = this.logger.child('update')
    logger.trace('>')
    await this.employeeService.update(id, req)

    logger.trace({ res }, '<')
    res.status(HttpStatus.NO_CONTENT).send()
  }

  @Post('photo')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadPhoto(
    @UploadedFile() file: Express.Multer.File,
    @Body() req: UploadPhoto,
  ): Promise<UploadedFileResponse> {
    const logger = this.logger.child('uploadPhoto')
    logger.trace('>')

    const res = await this.fileHelperService.uploadPhoto(
      file,
      Photo.PhotoType.UserPhoto,
      req.fileName,
    )

    logger.trace({ res }, '<')
    return res
  }

  @Post()
  public async create(@Body() req: CreateRequest.Employee, @Res() res: Response) {
    const logger = this.logger.child('create')
    logger.trace('>')
    await this.employeeService.create(req)
    logger.trace({ res }, '<')
    res.status(HttpStatus.CREATED).send()
  }

  @Delete(':id')
  public async delete(@Param('id') id: number, @Res() res: Response) {
    const logger = this.logger.child('update')
    logger.trace('>')
    await this.employeeService.delete(id)

    logger.trace({ res }, '<')
    res.status(HttpStatus.NO_CONTENT).send()
  }
}
