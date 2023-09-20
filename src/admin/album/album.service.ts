import { Album } from '@common/entities/album.entity'
import { notFoundHandler } from '@common/utils/fail-handler'
import { Photo } from '@entities'
import { InjectLogger, Logger } from '@logger'
import { EntityManager } from '@mikro-orm/core'
import { Injectable } from '@nestjs/common'
import { CreateRequest } from './dto/create.request'
import { FindAllResponse } from './dto/find-all.response'
import { FindResponse } from './dto/find.response'
import { UpdateRequest } from './dto/update.request'

@Injectable()
export class AlbumService {
  constructor(
    @InjectLogger(AlbumService)
    private readonly logger: Logger,
    private readonly em: EntityManager,
  ) {
    this.logger.child('constructor').trace('<>')
  }

  public async findAll(): Promise<FindAllResponse.Album[]> {
    const logger = this.logger.child('findAll')
    logger.trace('>')
    const albums = await this.em.find(
      Album,
      {},
      {
        orderBy: { createdAt: 'desc' },
      },
    )
    logger.trace({ albums })
    const res: FindAllResponse.Album[] = albums.map((a: Album) => new FindAllResponse.Album(a))
    logger.trace({ res })
    return res
  }

  public async find(id: number) {
    const logger = this.logger.child('find')
    logger.trace('>')
    const album = await this.em.findOneOrFail(
      Album,
      {
        id,
      },
      {
        failHandler: notFoundHandler(logger),
        populate: ['photos'],
      },
    )

    logger.traceObject({ album })

    const res = new FindResponse.Album({ ...album, photos: album.photos.getItems() })
    logger.trace({ res }, '<')
    return res
  }

  public async update(id: number, req: UpdateRequest.Album) {
    const logger = this.logger.child('update')
    logger.trace('>')
    const album = await this.em.findOneOrFail(
      Album,
      {
        id,
      },
      {
        failHandler: notFoundHandler(logger),
      },
    )

    const photos = await this.em.find(Photo, {
      id: { $in: req.photos },
    })
    album.name = req.name
    album.date = req.date

    photos.forEach((p) => {
      p.album = album
      this.em.persist(p)
    })

    await this.em.persistAndFlush(album)

    logger.traceObject({ album, photos })
  }

  public async create(req: CreateRequest.Album) {
    const logger = this.logger.child('create')
    logger.trace('>')
    const album = new Album(req)
    this.em.persist(album)

    const photos = await this.em.find(Photo, {
      id: { $in: req.photos },
    })

    photos.forEach((p) => {
      p.album = album
      this.em.persist(p)
    })

    await this.em.flush()

    logger.traceObject({ album, photos })
  }
}
