import { PaginationQuery } from '@common/dto'
import { PageInfo } from '@common/dto/page-info'
import { News } from '@common/entities/news.entity'
import { FirebaseStorageProvider } from '@common/file-helper/firebase-storage.provider'
import { notFoundHandler } from '@common/utils/fail-handler'
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
    private readonly firebaseStorageProvider: FirebaseStorageProvider,
  ) {
    this.logger.child('constructor').trace('<>')
  }

  public async findAll(
    pagination: PaginationQuery,
  ): Promise<Promise<[FindAllResponse.News[], PageInfo]>> {
    const logger = this.logger.child('findAll', { pagination })
    logger.trace('>')
    const [news, total] = await this.em.findAndCount(
      News,
      {},
      {
        ...pagination,
        populate: ['photo'],
      },
    )
    logger.trace({ news })

    const res: FindAllResponse.News[] = []
    for (const n of news) {
      const photoPath = n.photo && (await this.firebaseStorageProvider.getFile(n.photo.path))
      const item = new FindAllResponse.News({
        ...n,
        photoPath,
        photoAlt: n.photo?.title,
      })
      res.push(item)
    }

    logger.trace({ res })
    return [res, { ...pagination, total }]
  }

  public async find(slug: string) {
    const logger = this.logger.child('find', { slug })
    logger.trace('>')
    const news = await this.em.findOneOrFail(
      News,
      {
        slug,
      },
      {
        failHandler: notFoundHandler(logger),
        populate: ['photo'],
      },
    )

    logger.traceObject({ news })

    const photoPath = news.photo && (await this.firebaseStorageProvider.getFile(news.photo.path))
    const res = new FindResponse.News({
      ...news,
      photoPath,
      photoAlt: news.photo?.title,
    })
    logger.trace({ res }, '<')
    return res
  }
}
