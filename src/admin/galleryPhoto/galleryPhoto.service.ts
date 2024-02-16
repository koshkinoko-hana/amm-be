import { CreateRequest } from '@admin/galleryPhoto/dto/create.request'
import { PaginationQuery } from '@common/dto'
import { PageInfo } from '@common/dto/page-info'
import { FirebaseStorageProvider } from '@common/file-helper/firebase-storage.provider'
import { conflictHandler, failIfExists, notFoundHandler } from '@common/utils/fail-handler'
import { Photo } from '@entities'
import { InjectLogger, Logger } from '@logger'
import { EntityManager } from '@mikro-orm/core'
import { Injectable } from '@nestjs/common'
import { FindAllResponse } from './dto/find-all.response'
import { FindResponse } from './dto/find.response'
import LinkResource = Photo.LinkResource
import PhotoType = Photo.PhotoType

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
  ): Promise<[FindAllResponse.GalleryPhoto[], PageInfo]> {
    const logger = this.logger.child('findAll')
    logger.trace('>')
    const [galleryPhotos, total] = await this.em.findAndCount(
      Photo,
      {
        type: Photo.PhotoType.GalleryPhoto,
      },
      {
        ...pagination,
        populate: ['album'],
      },
    )

    logger.trace({ galleryPhotos })

    const castedGalleryPhotos: FindAllResponse.GalleryPhoto[] = await Promise.all(
      galleryPhotos.map(async (photo) => ({
        id: photo.id,
        path: await this.firebaseStorageProvider.getFile(photo),
        album: photo.album?.name,
        albumId: photo.album?.id,
      })),
    )

    logger.trace({ castedGalleryPhotos })

    return [castedGalleryPhotos, { ...pagination, total }]
  }

  public async find(id: number): Promise<FindResponse.GalleryPhoto> {
    const logger = this.logger.child('find', { id })
    logger.trace('>')
    const galleryPhoto = await this.em.findOneOrFail(
      Photo,
      {
        id,
      },
      {
        failHandler: notFoundHandler(logger),
        populate: ['album'],
      },
    )

    logger.traceObject({ galleryPhoto })

    const castedGalleryPhoto = new FindResponse.GalleryPhoto({
      id: galleryPhoto.id,
      albumId: galleryPhoto.album?.id,
      path: await this.firebaseStorageProvider.getFile(galleryPhoto),
    })
    const res = new FindResponse.GalleryPhoto({
      ...castedGalleryPhoto,
    })
    logger.trace({ res }, '<')
    return res
  }

  public async create(req: CreateRequest.GalleryPhoto) {
    const logger = this.logger.child('create', { req })
    logger.trace('>')

    await failIfExists(
      this.em,
      Photo,
      { path: req.link, linkResource: LinkResource.EXTERNAL_LINK },
      conflictHandler(logger, {
        message: () => `Фото ${req.link} уже было загружено.`,
      }),
    )

    const photo = new Photo({
      ...req,
      linkResource: LinkResource.EXTERNAL_LINK,
      type: PhotoType.GalleryPhoto,
      path: req.link,
    })

    await this.em.persistAndFlush(photo)
    logger.trace('<')
    return photo.id
  }

  public async delete(id: number) {
    const logger = this.logger.child('delete', { id })
    logger.trace('>')

    const photo = await this.em.findOneOrFail(
      Photo,
      { id },
      {
        failHandler: notFoundHandler(logger, {
          message: () => 'Фото не найдено!',
          logLevel: 'warn',
        }),
      },
    )

    await this.firebaseStorageProvider.deleteFile(photo)

    await this.em.removeAndFlush(photo)

    logger.traceObject({ photo })

    return photo.id
  }
}
