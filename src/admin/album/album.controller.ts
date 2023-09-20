import { InjectLogger, Logger } from '@logger'
import { Body, Controller, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common'
import { Response } from 'express'
import { CreateRequest } from './dto/create.request'
import { FindAllResponse } from './dto/find-all.response'
import { FindResponse } from './dto/find.response'
import { UpdateRequest } from './dto/update.request'
import { AlbumService } from './album.service'

@Controller('/admin/position')
export class AlbumController {
  constructor(
    @InjectLogger(AlbumController)
    private readonly logger: Logger,
    private readonly albumService: AlbumService,
  ) {
    this.logger.child('constructor').trace('<>')
  }

  @Get(':id')
  public async find(@Param('id') id: number): Promise<FindResponse.Album> {
    const logger = this.logger.child('find')
    logger.trace('>')
    const res = await this.albumService.find(id)

    logger.trace({ res }, '<')
    return res
  }

  @Get()
  public async findAll(): Promise<FindAllResponse.Album[]> {
    const logger = this.logger.child('findAll')
    logger.trace('>')
    const albums = await this.albumService.findAll()
    logger.trace({ albums }, '<')
    return albums
  }

  @Put(':id')
  public async update(
    @Param('id') id: number,
    @Body() req: UpdateRequest.Album,
    @Res() res: Response,
  ) {
    const logger = this.logger.child('update')
    logger.trace('>')
    await this.albumService.update(id, req)
    logger.trace({ id, req }, '<')
    res.status(HttpStatus.NO_CONTENT).send()
  }

  @Post()
  public async create(@Body() req: CreateRequest.Album, @Res() res: Response) {
    const logger = this.logger.child('create')
    logger.trace('>')
    await this.albumService.create(req)
    logger.trace('<')

    res.status(HttpStatus.CREATED).send()
  }
}
