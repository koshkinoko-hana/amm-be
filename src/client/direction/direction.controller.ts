import { InjectLogger, Logger } from '@logger'
import { Controller, Get } from '@nestjs/common'
import { FindAllResponse } from './dto/find-all.response'
import { DirectionService } from './direction.service'

@Controller('/direction')
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
}
