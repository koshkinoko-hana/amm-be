import {PaginationQuery} from '@common/dto/pagination.query'
import {PaginatedResponseWrapper} from '@common/dto/wrappers/paginated.response-wrapper'
import {InjectLogger, Logger} from '@logger'
import {Body, Controller, Get, Param, Post, Put, Query} from '@nestjs/common'
import {CreateRequest} from './dto/create.request'
import {FindAllRequest} from './dto/find-all.request'
import {FindAllResponse} from './dto/find-all.response'
import {FindResponse} from './dto/find.response'
import {UpdateRequest} from './dto/update.request'
import {PositionService} from './position.service'

@Controller('/admin/position')
export class PositionController {
  constructor(
    @InjectLogger(PositionController)
    private readonly logger: Logger,
    private readonly positionService: PositionService,
  ) {
    this.logger.child('constructor').trace('<>')
  }

  @Get()
  public async findAll(
    @Query() pagination: PaginationQuery,
    @Query() sorting: FindAllRequest.SortingQuery,
    @Query() filters: FindAllRequest.FiltersQuery,
  ): Promise<PaginatedResponseWrapper<FindAllResponse.Position>> {
    const logger = this.logger.child('findAll')
    logger.trace('>')
    const [positions, pageInfo] = await this.positionService.findAll(pagination, sorting, filters)

    logger.traceObject({positions, pageInfo})

    const res = new PaginatedResponseWrapper(positions, pageInfo)
    logger.trace({res}, '<')
    return res
  }

  @Get(':id')
  public async find(@Param('id') id: number): Promise<FindResponse.Position> {
    const logger = this.logger.child('find')
    logger.trace('>')
    const res = await this.positionService.find(id)

    logger.trace({res}, '<')
    return res
  }

  @Put(':id')
  public async update(
    @Param('id') id: number,
    @Body() req: UpdateRequest.Position,
  ): Promise<number> {
    const logger = this.logger.child('update')
    logger.trace('>')
    const res = await this.positionService.update(id, req)

    logger.trace({res}, '<')
    return res
  }

  @Post()
  public async create(@Body() req: CreateRequest.Position): Promise<number> {
    const logger = this.logger.child('update')
    logger.trace('>')
    const res = await this.positionService.create(req)

    logger.trace({res}, '<')
    return res
  }
}
