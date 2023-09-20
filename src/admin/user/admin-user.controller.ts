import { AdminAuthGuard } from '@admin/auth/guards'
import { CreateRequest } from '@admin/user/dto/create.request'
import { UpdateRequest } from '@admin/user/dto/update.request'
import { ReqAuthInfo } from '@common/decorators/req-auth-info.decorator'
import { InjectLogger, Logger } from '@logger'
import { Controller, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common'
import { Response } from 'express'
import { UserService } from './user.service'

@UseGuards(AdminAuthGuard)
@Controller('/admin/user')
export class AdminUserController {
  constructor(
    @InjectLogger(AdminUserController)
    private readonly logger: Logger,
    private readonly userService: UserService,
  ) {
    this.logger.child('constructor').trace('<>')
  }

  @Post()
  async create(@ReqAuthInfo() req: CreateRequest.User, @Res() res: Response) {
    const logger = this.logger.child('getMe')
    logger.trace('>')

    await this.userService.create(req)
    logger.trace('<')
    res.status(HttpStatus.CREATED).send()
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @ReqAuthInfo() req: UpdateRequest.User,
    @Res() res: Response,
  ) {
    const logger = this.logger.child('getMe')
    logger.trace('>')

    await this.userService.update(id, req)
    logger.trace('<')
    res.status(HttpStatus.CREATED).send()
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    const logger = this.logger.child('findById')
    logger.trace('>')

    const res = await this.userService.findById(id)
    logger.trace({ res }, '<')
    return res
  }

  @Get()
  async find() {
    const logger = this.logger.child('find')
    logger.trace('>')

    const res = await this.userService.find()
    logger.trace({ res }, '<')
    return res
  }
}
