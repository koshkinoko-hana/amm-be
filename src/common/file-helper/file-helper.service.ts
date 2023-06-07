import { UploadedFileResponse } from '@common/file-helper/dto/uploaded-file.response'
import { FirebaseStorageProvider } from '@common/file-helper/firebase-storage.provider'
import { Photo } from '@entities'
import { InjectLogger, Logger } from '@logger'
import { EntityManager } from '@mikro-orm/core'
import { Injectable } from '@nestjs/common'
import { uuid } from 'uuidv4'
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
  ): Promise<UploadedFileResponse> {
    const uuidName = uuid()

    const path = await this.storageProvider.upload(file, folder, uuidName)
    const photo = new Photo({ title: title || '', path, type: folder, createdAt: new Date() })
    await this.em.persistAndFlush(photo)
    const fp = await this.storageProvider.getFile(path)
    return { id: photo.id, path: fp, title }
  }
}
