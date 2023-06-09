import { notFoundHandler } from '@common/utils/fail-handler'
import { Photo } from '@entities'
import { InjectLogger, Logger } from '@logger'
import { EntityManager } from '@mikro-orm/core'
import { Injectable } from '@nestjs/common'
import { FindAllResponse } from './dto/find-all.response'
import { FindResponse } from './dto/find.response'
import { PageInfo } from '@common/dto/page-info'
import { PaginationQuery } from '@common/dto'
import { FirebaseStorageProvider } from '@common/file-helper/firebase-storage.provider'

@Injectable()
export class GalleryPhotoService {
  constructor(
    @InjectLogger(GalleryPhotoService)
    private readonly logger: Logger,
    private readonly em: EntityManager,
    private readonly firebaseStorageProvider: FirebaseStorageProvider,
  ) {
    this.logger.child('constructor').trace('<>')
  }

  public async findAll(
    pagination: PaginationQuery,
  ): Promise<Promise<[FindAllResponse.GalleryPhoto[], PageInfo]>> {
    const logger = this.logger.child('findAll')
    logger.trace('>')
    const [galleryPhotos, total] = await this.em.findAndCount(
      Photo,
      {
        type: Photo.PhotoType.GalleryPhoto,
      },
      {
        ...pagination,
      },
    )

    logger.trace({ galleryPhotos })

    const castedGalleryPhotos = await Promise.all(
      galleryPhotos.map(async (photo) => ({
        id: photo.id,
        title: photo.title,
        createdAt: photo.createdAt,
        path: await this.firebaseStorageProvider.getFile(photo.path),
      })),
    )

    logger.trace({ castedGalleryPhotos })

    return [castedGalleryPhotos, { ...pagination, total }]
  }

  public async find(id: number) {
    const logger = this.logger.child('findAll')
    logger.trace('>')
    const galleryPhoto = await this.em.findOneOrFail(
      Photo,
      {
        id,
      },
      {
        failHandler: notFoundHandler(logger),
      },
    )

    logger.traceObject({ galleryPhoto })

    const castedGalleryPhoto = {
      id: galleryPhoto.id,
      title: galleryPhoto.title,
      path: await this.firebaseStorageProvider.getFile(galleryPhoto.path),
    }
    const res = new FindResponse.GalleryPhoto({
      ...castedGalleryPhoto,
    })
    logger.trace({ res }, '<')
    return res
  }

  public async delete(id: number) {
    const logger = this.logger.child('delete', { id })
    logger.trace('>')

    const galleryPhoto = await this.em.findOneOrFail(
      Photo,
      {
        id,
      },
      {
        failHandler: notFoundHandler(logger),
      },
    )

    await this.em.removeAndFlush(galleryPhoto)

    logger.traceObject({ galleryPhoto })

    return galleryPhoto.id
  }
}
