import { InjectLogger, Logger } from '@logger'
import { EntityManager } from '@mikro-orm/core'
import { Injectable } from '@nestjs/common'
import { FindAllResponse } from './dto/find-all.response'
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
}
