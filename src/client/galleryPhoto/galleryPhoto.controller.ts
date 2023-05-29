import { FindAllResponse } from './dto/find-all.response'
import { InjectLogger, Logger } from '@logger'
import { Controller, Get, Query } from '@nestjs/common'
import { GalleryPhotoService } from './galleryPhoto.service'
import { PaginatedResponseWrapper } from '@common/dto/wrappers/paginated.response-wrapper'
import { PaginationQuery } from '@common/dto'

@Controller('/gallery')
export class GalleryPhotoController {
  constructor(
    @InjectLogger(GalleryPhotoController)
    private readonly logger: Logger,
    private readonly galleryPhotoService: GalleryPhotoService,
  ) {
    this.logger.child('constructor').trace('<>')
  }

  @Get()
  public async findAll(
    @Query() pagination: PaginationQuery,
  ): Promise<PaginatedResponseWrapper<FindAllResponse.GalleryPhoto>> {
    const logger = this.logger.child('findAll')
    logger.trace('>')
    const [res, pageInfo] = await this.galleryPhotoService.findAll(pagination)

    logger.trace({ res }, '<')
    return new PaginatedResponseWrapper<FindAllResponse.GalleryPhoto>(res, pageInfo)
  }
}
