import { NewsModeratorAuthGuard } from '@admin/auth/guards'
import { UploadPhoto } from '@common/dto/upload-photo'
import { CreateRequest } from '@admin/news/dto/create.request'
import { UpdateRequest } from '@admin/news/dto/update.request'
import { PaginationQuery } from '@common/dto'
import { PaginatedResponseWrapper } from '@common/dto/wrappers/paginated.response-wrapper'
import { UploadedFileResponse } from '@common/file-helper/dto/uploaded-file.response'
import { FileHelperService } from '@common/file-helper/file-helper.service'
import { Photo } from '@entities'
import { InjectLogger, Logger } from '@logger'
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { FindAllResponse } from './dto/find-all.response'
import { FindResponse } from './dto/find.response'
import { NewsService } from './news.service'

@UseGuards(NewsModeratorAuthGuard)
@Controller('/admin/news')
export class NewsController {
  constructor(
    @InjectLogger(NewsController)
    private readonly logger: Logger,
    private readonly newsService: NewsService,
    private readonly fileHelperService: FileHelperService,
  ) {
    this.logger.child('constructor').trace('<>')
  }

  @Get(':slug')
  public async find(@Param('slug') slug: string): Promise<FindResponse.News> {
    const logger = this.logger.child('find')
    logger.trace('>')
    const res = await this.newsService.find(slug)

    logger.trace({ res }, '<')
    return res
  }

  @Get()
  public async findAll(
    @Query() pagination: PaginationQuery,
  ): Promise<PaginatedResponseWrapper<FindAllResponse.News>> {
    const logger = this.logger.child('findAll')
    logger.trace('>')
    const [res, pageInfo] = await this.newsService.findAll(pagination)

    logger.trace({ res }, '<')
    return new PaginatedResponseWrapper<FindAllResponse.News>(res, pageInfo)
  }

  @Post('photo')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadPhoto(
    @UploadedFile() file: Express.Multer.File,
    @Body() req: UploadPhoto,
  ): Promise<UploadedFileResponse> {
    const logger = this.logger.child('uploadPhoto')
    logger.trace('>')
    const res = await this.fileHelperService.uploadPhoto(
      file,
      Photo.PhotoType.NewsImage,
      req.fileName,
    )

    logger.trace({ res }, '<')
    return res
  }

  @Post()
  public async create(@Body() req: CreateRequest.News): Promise<Date> {
    const logger = this.logger.child('create', { req })
    logger.trace('>')
    const createdAt = await this.newsService.create(req)
    logger.trace({ createdAt }, '<')
    return createdAt
  }

  @Put(':slug')
  public async update(@Param('slug') slug: string, @Body() req: UpdateRequest.News): Promise<Date> {
    const logger = this.logger.child('update', { req })
    logger.trace('>')
    const updatedAt = await this.newsService.update(slug, req)
    logger.trace({ updatedAt }, '<')
    return updatedAt
  }
}
