import { PaginationQuery } from '@common/dto'
import { Option } from '@common/dto/option'
import { PageInfo } from '@common/dto/page-info'
import { News } from '@common/entities/news.entity'
import { notFoundHandler } from '@common/utils/fail-handler'
import { Department } from '@entities'
import { InjectLogger, Logger } from '@logger'
import { EntityManager } from '@mikro-orm/core'
import { Injectable } from '@nestjs/common'
import { FindAllResponse } from './dto/find-all.response'
import { FindResponse } from './dto/find.response'

@Injectable()
export class NewsService {
  constructor(
    @InjectLogger(NewsService)
    private readonly logger: Logger,
    private readonly em: EntityManager,
  ) {
    this.logger.child('constructor').trace('<>')
  }

  public async findAll(
    pagination: PaginationQuery,
  ): Promise<Promise<[FindAllResponse.News[], PageInfo]>> {
    const logger = this.logger.child('findAll')
    logger.trace('>')
    const [news, total] = await this.em.findAndCount(
      News,
      {},
      {
        ...pagination,
      },
    )
    logger.trace({ news })
    const res: FindAllResponse.News[] = news.map((n: News) => new FindAllResponse.News(n))

    logger.trace({ res })
    return [res, { ...pagination, total }]
  }

  public async findOptions(): Promise<Option[]> {
    const logger = this.logger.child('findOptions')
    logger.trace('>')
    const departments = await this.em.find(Department, {})
    logger.trace({ departments })
    const res: Option[] = departments.map((item) => ({ label: item.name, value: item.id }))
    logger.trace({ res })
    return res
  }

  public async find(slug: string) {
    const logger = this.logger.child('find')
    logger.trace('>')
    const news = await this.em.findOneOrFail(
      News,
      {
        slug,
      },
      {
        failHandler: notFoundHandler(logger),
      },
    )

    logger.traceObject({ news })

    const res = new FindResponse.News(news)
    logger.trace({ res }, '<')
    return res
  }
}
