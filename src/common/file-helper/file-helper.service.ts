import { UploadedFileResponse } from '@common/file-helper/dto/uploaded-file.response'
import { FirebaseStorageProvider } from '@common/file-helper/firebase-storage.provider'
import { notFoundHandler } from '@common/utils/fail-handler'
import { Album, Photo } from '@entities'
import { InjectLogger, Logger } from '@logger'
import { EntityManager } from '@mikro-orm/core'
import { Injectable } from '@nestjs/common'
import { uuid } from 'uuidv4'
import LinkResource = Photo.LinkResource
import PhotoType = Photo.PhotoType

@Injectable()
export class FileHelperService {
  constructor(
    @InjectLogger(FileHelperService)
    private readonly logger: Logger,
    private readonly em: EntityManager,
    private readonly storageProvider: FirebaseStorageProvider,
  ) {
    this.logger.child('constructor').trace('<>')
  }

  public async uploadPhoto(
    file: Express.Multer.File,
    folder: PhotoType,
    title?: string,
    albumId?: number,
  ): Promise<UploadedFileResponse> {
    const logger = this.logger.child('uploadPhoto', { file, folder, title, albumId })
    logger.trace('>')
    const uuidName = uuid()

    const path = await this.storageProvider.upload(file, folder, uuidName)

    const album = await this.em.findOneOrFail(
      Album,
      { id: albumId },
      {
        failHandler: notFoundHandler(logger),
      },
    )
    const photo = new Photo({
      title: title || '',
      path,
      type: folder,
      linkResource: LinkResource.FIREBASE,
      album,
    })
    await this.em.persistAndFlush(photo)
    const fp = await this.storageProvider.getFile(photo)
    return { id: photo.id, path: fp, title }
  }

  public async deleteFile(path: string): Promise<void> {
    const logger = this.logger.child('deleteFile', { path })
    logger.trace('>')

    const photo = await this.em.findOneOrFail(
      Photo,
      { path },
      {
        failHandler: notFoundHandler(logger, {
          message: () => 'Фото не найдено!',
          logLevel: 'warn',
        }),
      },
    )

    await this.storageProvider.deleteFile(photo)

    if (photo) {
      this.em.remove(photo)
      await this.em.flush()
    }

    logger.trace('<')
  }
}
