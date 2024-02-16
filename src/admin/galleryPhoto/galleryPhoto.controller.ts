import { CreateRequest } from '@admin/galleryPhoto/dto/create.request'
import { FindResponse } from './dto/find.response'
import { FindAllResponse } from './dto/find-all.response'
import { UploadPhoto } from './dto/upload-photo'
import { UploadedFileResponse } from '@common/file-helper/dto/uploaded-file.response'
import { FileHelperService } from '@common/file-helper/file-helper.service'
import { Photo } from '@entities'
import { InjectLogger, Logger } from '@logger'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { GalleryPhotoService } from './galleryPhoto.service'
import { StructureDataAuthGuard } from '@admin/auth/guards'
import { PaginatedResponseWrapper } from '@common/dto/wrappers/paginated.response-wrapper'
import { PaginationQuery } from '@common/dto'

@UseGuards(StructureDataAuthGuard)
@Controller('/admin/gallery')
export class GalleryPhotoController {
  constructor(
    @InjectLogger(GalleryPhotoController)
    private readonly logger: Logger,
    private readonly galleryPhotoService: GalleryPhotoService,
    private readonly fileHelperService: FileHelperService,
  ) {
    this.logger.child('constructor').trace('<>')
  }

  @Get(':id')
  public async find(@Param('id') id: number): Promise<FindResponse.GalleryPhoto> {
    const logger = this.logger.child('findAll')
    logger.trace('>')
    const res = await this.galleryPhotoService.find(id)

    logger.trace({ res }, '<')
    return res
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

  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadPhoto(
    @UploadedFile() file: Express.Multer.File,
    @Body() req: UploadPhoto,
  ): Promise<UploadedFileResponse> {
    const logger = this.logger.child('uploadPhoto')
    logger.trace('>')
    const res = await this.fileHelperService.uploadPhoto(
      file,
      Photo.PhotoType.GalleryPhoto,
      req.title,
      req.albumId,
    )

    logger.trace({ res }, '<')
    return res
  }

  @Post()
  public async createPhoto(@Body() req: CreateRequest.GalleryPhoto): Promise<number> {
    const logger = this.logger.child('uploadPhoto', { req })
    logger.trace('>')
    const id = await this.galleryPhotoService.create(req)
    logger.traceObject({ id })

    logger.trace('<')
    return id
  }

  @Delete(':id')
  public async delete(@Param('id') id: number): Promise<number> {
    const logger = this.logger.child('update')
    logger.trace('>')
    const res = await this.galleryPhotoService.delete(id)

    logger.trace({ res }, '<')
    return res
  }
}
