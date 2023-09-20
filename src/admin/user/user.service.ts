import { AuthService } from '@admin/auth/auth.service'
import { CreateRequest } from '@admin/user/dto/create.request'
import { FindAllResponse } from '@admin/user/dto/find-all.response'
import { UpdateRequest } from '@admin/user/dto/update.request'
import {
  conflictHandler,
  failIfExists,
  notFoundHandler,
  unauthorizedHandler,
} from '@common/utils/fail-handler'
import { User } from '@entities'
import { InjectLogger, Logger } from '@logger'
import { EntityManager } from '@mikro-orm/core'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthInfo } from '../auth/interfaces'
import { FindResponse } from './dto/find.response'
import Status = User.Status

@Injectable()
export class UserService {
  constructor(
    private readonly em: EntityManager,
    @InjectLogger(UserService)
    private readonly logger: Logger,
    private readonly authService: AuthService,
  ) {
    this.logger.child('constructor').trace('<>')
  }

  public async findMe(authInfo: AuthInfo): Promise<FindResponse.User> {
    const logger = this.logger.child('findMe', { authInfo })
    logger.trace('>')

    const { id } = authInfo

    const user = await this.em.findOneOrFail<User>(
      User,
      { id },
      {
        failHandler: unauthorizedHandler(logger, {
          message: () => 'Пользователь не найден!',
          logLevel: 'warn',
        }),
      },
    )

    logger.traceObject({ user })

    if (user.status === User.Status.DEACTIVATED) {
      const err = new UnauthorizedException('Пользователь не найден')
      logger.warn({ err, user }, '! user is deactivated')
      throw err
    }

    const res = new FindResponse.User(user)
    logger.trace({ res }, '<')
    return res
  }

  public async findById(id: number): Promise<FindResponse.User> {
    const logger = this.logger.child('findById', { id })
    logger.trace('>')

    const user = await this.em.findOneOrFail<User>(
      User,
      { id },
      {
        failHandler: notFoundHandler(logger, {
          message: () => 'Пользователь не найден!',
          logLevel: 'warn',
        }),
      },
    )

    logger.traceObject({ user })

    const res = new FindResponse.User(user)
    logger.trace({ res }, '<')
    return res
  }

  public async find(): Promise<FindResponse.User[]> {
    const logger = this.logger.child('find')
    logger.trace('>')

    const users = await this.em.find(User, {})

    logger.traceObject({ users })

    const res = users.map((u) => new FindAllResponse.User(u))
    logger.trace({ res }, '<')
    return res
  }

  public async create(req: CreateRequest.User) {
    const logger = this.logger.child('create', { req: { ...req, password: undefined } })
    await failIfExists(
      this.em,
      User,
      { login: req.login },
      conflictHandler(logger, {
        message: () => `Логин ${req.login} уже испольщзуется.`,
      }),
    )

    const passwordHash = await this.authService.hashPassword(req.password)
    logger.trace({ passwordHash })

    const user = new User({ ...req, passwordHash, status: Status.ACTIVE })

    await this.em.persistAndFlush(user)
  }

  public async update(id: number, req: UpdateRequest.User) {
    const logger = this.logger.child('update', { id, req: { ...req, password: undefined } })
    const user = await this.em.findOneOrFail(User, { id })
    logger.trace({ user })

    user.status = req.status
    user.roles = req.roles

    if (req.password) {
      user.passwordHash = await this.authService.hashPassword(req.password)
    }

    await this.em.persistAndFlush(user)
  }
}
