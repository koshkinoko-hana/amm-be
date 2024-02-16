import { UpdateRequest } from '@admin/news/dto/update.request'
import { FirebaseStorageProvider } from '@common/file-helper/firebase-storage.provider'
import { CreateRequest } from './dto/create.request'
import { PaginationQuery } from '@common/dto'
import { PageInfo } from '@common/dto/page-info'
import { News } from '@common/entities/news.entity'
import { conflictHandler, failIfExists, notFoundHandler } from '@common/utils/fail-handler'
import { Photo } from '@entities'
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

    const res: FindAllResponse.News[] = []
    for (const n of news) {
      const photoPath = n.photo && (await this.firebaseStorageProvider.getFile(n.photo))
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
      },
    )

    logger.traceObject({ news })

    const photoPath = news.photo && (await this.firebaseStorageProvider.getFile(news.photo))
    const res = new FindResponse.News({
      ...news,
      photoPath,
      photoAlt: news.photo?.title,
    })
    logger.trace({ res }, '<')
    return res
  }

  public async create(req: CreateRequest.News) {
    const logger = this.logger.child('create', { req })
    logger.trace('>')
    await failIfExists(
      this.em,
      News,
      { slug: req.slug },
      conflictHandler(logger, {
        message: () => `Id новости ${req.slug} уже испольщзуется.`,
      }),
    )
    const news = new News(req)

    if (req.photoId) {
      const photo = await this.em.findOneOrFail(
        Photo,
        {
          id: req.photoId,
        },
        {
          failHandler: notFoundHandler(logger),
        },
      )
      news.photo = photo
    }
    await this.em.persistAndFlush(news)

    logger.traceObject({ news })

    return news.createdAt
  }

  public async update(slug: string, req: UpdateRequest.News) {
    const logger = this.logger.child('update', { slug, req })
    logger.trace('>')
    const news = await this.em.findOneOrFail(
      News,
      { slug },
      {
        failHandler: notFoundHandler(logger),
        populate: ['photo'],
      },
    )

    news.name = req.name
    news.description = req.description
    news.article = req.article

    if (req.photoId !== news.photo?.id) {
      if (req.photoId) {
        const photo = await this.em.findOneOrFail(
          Photo,
          {
            id: req.photoId,
          },
          {
            failHandler: notFoundHandler(logger),
          },
        )
        news.photo = photo
      } else {
        news.photo = undefined
      }
    }
    await this.em.persistAndFlush(news)

    logger.traceObject({ news })

    return news.updatedAt
  }
}
