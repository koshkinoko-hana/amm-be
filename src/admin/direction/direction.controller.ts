import { InjectLogger, Logger } from '@logger'
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common'
import { CreateRequest } from './dto/create.request'
import { FindAllResponse } from './dto/find-all.response'
import { UpdateRequest } from './dto/update.request'
import { DirectionService } from './direction.service'
import { StructureDataAuthGuard } from '@admin/auth/guards'
import { DirectionResponse } from './dto/direction.response'

@UseGuards(StructureDataAuthGuard)
@Controller('/admin/direction')
export class DirectionController {
  constructor(
    @InjectLogger(DirectionController)
    private readonly logger: Logger,
    private readonly directionService: DirectionService,
  ) {
    this.logger.child('constructor').trace('<>')
  }

  @Get()
  public async findAll(): Promise<FindAllResponse.Direction[]> {
    const logger = this.logger.child('findAll')
    logger.trace('>')
    const res = await this.directionService.findAll()

    logger.trace({ res }, '<')
    return res
  }

  @Put(':id')
  public async update(
    @Param('id') id: number,
    @Body() req: UpdateRequest.Direction,
  ): Promise<DirectionResponse> {
    const logger = this.logger.child('update')
    logger.trace('>')
    const res = await this.directionService.update(id, req)

    logger.trace({ res }, '<')
    return res
  }

  @Post()
  public async create(@Body() req: CreateRequest.Direction): Promise<DirectionResponse> {
    const logger = this.logger.child('create')
    logger.trace('>')
    const res = await this.directionService.create(req)

    logger.trace({ res }, '<')
    return res
  }

  @Delete(':id')
  public async delete(@Param('id') id: number): Promise<number> {
    const logger = this.logger.child('delete')
    logger.trace('>')
    const res = await this.directionService.delete(id)

    logger.trace({ res }, '<')
    return res
  }
}
