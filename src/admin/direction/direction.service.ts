import { conflictHandler, failIfExists, notFoundHandler } from '@common/utils/fail-handler'
import { Department } from '@entities'
import { InjectLogger, Logger } from '@logger'
import { EntityManager } from '@mikro-orm/core'
import { Injectable } from '@nestjs/common'
import { CreateRequest } from './dto/create.request'
import { FindAllResponse } from './dto/find-all.response'
import { UpdateRequest } from './dto/update.request'
import { Direction } from '@common/entities/direction.entity'

@Injectable()
export class DirectionService {
  constructor(
    @InjectLogger(DirectionService)
    private readonly logger: Logger,
    private readonly em: EntityManager,
  ) {
    this.logger.child('constructor').trace('<>')
  }

  public async findAll(): Promise<FindAllResponse.Direction[]> {
    const logger = this.logger.child('findAll')
    logger.trace('>')
    const directions = await this.em.find(Direction, {})
    logger.trace({ directions })
    const res: FindAllResponse.Direction[] = directions.map(
      (d: Direction) => new FindAllResponse.Direction(d),
    )

    logger.trace({ res })
    return res
  }

  public async update(id: number, req: UpdateRequest.Direction) {
    const logger = this.logger.child('update')
    logger.trace('>')
    const direction = await this.em.findOneOrFail(
      Direction,
      {
        id,
      },
      {
        failHandler: notFoundHandler(logger),
      },
    )
    await failIfExists(
      this.em,
      Department,
      { name: req.name, $not: { id } },
      conflictHandler(logger, {
        message: () => `Название направления ${req.name} уже используется.`,
      }),
    )

    direction.type = req.type
    direction.name = req.name
    direction.features = req.features
    direction.profiles = req.profiles
    direction.forms = req.forms
    direction.price = req.price
    direction.exams = req.exams

    await this.em.persistAndFlush(direction)

    logger.traceObject({ direction })

    return direction
  }

  public async create(req: CreateRequest.Direction) {
    const logger = this.logger.child('create')
    logger.trace('>')
    await failIfExists(
      this.em,
      Direction,
      { name: req.name },
      conflictHandler(logger, {
        message: () => `Название направления ${req.name} уже используется.`,
      }),
    )
    const direction = new Direction(req)
    await this.em.persistAndFlush(direction)

    logger.traceObject({ direction })

    return direction
  }

  public async delete(id: number) {
    const logger = this.logger.child('delete', { id })
    logger.trace('>')

    const direction = await this.em.findOneOrFail(
      Direction,
      {
        id,
      },
      {
        failHandler: notFoundHandler(logger),
      },
    )

    await this.em.removeAndFlush(direction)

    logger.traceObject({ direction })

    return direction.id
  }
}
