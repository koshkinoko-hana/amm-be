import { PaginationQuery } from '@common/dto'
import { PaginatedResponseWrapper } from '@common/dto/wrappers/paginated.response-wrapper'
import { InjectLogger, Logger } from '@logger'
import { Controller, Get, Param, Query } from '@nestjs/common'
import { FindAllResponse } from './dto/find-all.response'
import { FindResponse } from './dto/find.response'
import { NewsService } from './news.service'

@Controller('/news')
export class NewsController {
  constructor(
    @InjectLogger(NewsController)
    private readonly logger: Logger,
    private readonly newsService: NewsService,
  ) {
    this.logger.child('constructor').trace('<>')
  }

  @Get(':slug')
  public async find(@Param('slug') slug: string): Promise<FindResponse.News> {
    const logger = this.logger.child('find')
    logger.trace('>')
    const res = await this.newsService.find(slug)

    logger.trace({ res }, '<')
    return res
  }

  @Get()
  public async findAll(
    @Query() pagination: PaginationQuery,
  ): Promise<PaginatedResponseWrapper<FindAllResponse.News>> {
    const logger = this.logger.child('findAll')
    logger.trace('>')
    const [res, pageInfo] = await this.newsService.findAll(pagination)

    logger.trace({ res }, '<')
    return new PaginatedResponseWrapper<FindAllResponse.News>(res, pageInfo)
  }
}
