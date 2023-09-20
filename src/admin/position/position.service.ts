import { PaginationQuery } from '@common/dto'
import { Option } from '@common/dto/option'
import { PageInfo } from '@common/dto/page-info'
import { conflictHandler, failIfExists, notFoundHandler } from '@common/utils/fail-handler'
import { Position } from '@entities'
import { InjectLogger, Logger } from '@logger'
import { EntityManager } from '@mikro-orm/core'
import { Injectable } from '@nestjs/common'
import { CreateRequest } from './dto/create.request'
import { FindAllRequest } from './dto/find-all.request'
import { FindAllResponse } from './dto/find-all.response'
import { FindResponse } from './dto/find.response'
import { UpdateRequest } from './dto/update.request'

@Injectable()
export class PositionService {
  constructor(
    @InjectLogger(PositionService)
    private readonly logger: Logger,
    private readonly em: EntityManager,
  ) {
    this.logger.child('constructor').trace('<>')
  }

  public async findAll(
    pagination: PaginationQuery,
    sorting: FindAllRequest.SortingQuery,
    filters: FindAllRequest.FiltersQuery,
  ): Promise<[FindAllResponse.Position[], PageInfo]> {
    const logger = this.logger.child('findAll')
    logger.trace('>')
    const [positions, total] = await this.em.findAndCount(
      Position,
      {
        ...(filters.name ? { name: { $like: `${filters.name}%` } } : {}),
      },
      {
        ...pagination,
      },
    )
    logger.trace({ positions, total })
    const res: [FindAllResponse.Position[], PageInfo] = [
      positions.map((pos: Position) => new FindAllResponse.Position(pos)),
      { total, ...pagination },
    ]
    logger.trace({ res })
    return res
  }

  public async findOptions(): Promise<Option[]> {
    const logger = this.logger.child('findOptions')
    logger.trace('>')
    const positions = await this.em.find(Position, {})
    logger.trace({ positions })
    const res: Option[] = positions.map((item) => ({ label: item.name, value: item.id }))
    logger.trace({ res })
    return res
  }

  public async find(id: number) {
    const logger = this.logger.child('find')
    logger.trace('>')
    const position = await this.em.findOneOrFail(
      Position,
      {
        id,
      },
      {
        failHandler: notFoundHandler(logger),
      },
    )

    logger.traceObject({ position })

    const res = new FindResponse.Position(position)
    logger.trace({ res }, '<')
    return res
  }

  public async update(id: number, req: UpdateRequest.Position) {
    const logger = this.logger.child('update')
    logger.trace('>')
    const position = await this.em.findOneOrFail(
      Position,
      {
        id,
      },
      {
        failHandler: notFoundHandler(logger),
      },
    )
    position.name = req.name
    await this.em.persistAndFlush(position)

    logger.traceObject({ position })

    return position.id
  }

  public async create(req: CreateRequest.Position) {
    const logger = this.logger.child('create')
    logger.trace('>')
    await failIfExists(
      this.em,
      Position,
      { name: req.name },
      conflictHandler(logger, {
        message: () => `Название должности ${req.name} уже используется`,
      }),
    )
    const position = new Position(req)
    await this.em.persistAndFlush(position)

    logger.traceObject({ position })

    return position.id
  }
}
