import { User } from '@entities'
import { InjectLogger, Logger } from '@logger'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { unauthorizedHandler } from '@common/utils/fail-handler'
import { EntityManager } from '@mikro-orm/core'
import { AuthInfo } from '../auth/interfaces'
import { FindMeResponse } from './dto/find-me.response'

@Injectable()
export class UserService {
  constructor(
    private readonly em: EntityManager,
    @InjectLogger(UserService)
    private readonly logger: Logger,
  ) {
    this.logger.child('constructor').trace('<>')
  }

  public async findMe(authInfo: AuthInfo): Promise<FindMeResponse.User> {
    const logger = this.logger.child('createManagementToken', { authInfo })
    logger.trace('>')

    const { id } = authInfo

    const user = await this.em.findOneOrFail<User>(
      User,
      { id },
      {
        failHandler: unauthorizedHandler(logger, {
          message: () => 'User not found!',
          logLevel: 'warn',
        }),
      },
    )

    logger.traceObject({ user })

    if (user.status === User.Status.DEACTIVATED) {
      const err = new UnauthorizedException('User not found!')
      logger.warn({ err, user }, '! user is deactivated')
      throw err
    }

    const res = new FindMeResponse.User(user)
    logger.trace({ res }, '<')
    return res
  }
}
