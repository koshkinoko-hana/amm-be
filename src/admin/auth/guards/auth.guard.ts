import { Logger } from '@logger'
import { ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { AuthGuard as PAuthGuard } from '@nestjs/passport'
import { User } from '@entities'

export class AuthGuard extends PAuthGuard('jwt') {
  constructor(private readonly logger: Logger, private readonly role: User.Role) {
    super()
    this.logger.child('constructor').trace({ role }, '<>')
  }

  canActivate(executionContext: ExecutionContext) {
    const logger = this.logger.child('canActivate')
    logger.trace('>')

    const res = super.canActivate(executionContext)
    logger.trace('<')
    return res
  }

  handleRequest(err: any, user: any, info: any) {
    const logger = this.logger.child('handleRequest', { err, user, info })
    logger.trace('>')

    if (err) {
      logger.warn({ err, user, info }, '! error')
      throw err
    }

    if (!user || (!user.roles.includes(this.role) && !user.roles.includes(User.Role.ADMIN))) {
      const e = new UnauthorizedException()
      logger.warn({ err: e }, '! unauthorized')
      throw e
    }

    const res = user
    logger.trace({ res }, '<')
    return res
  }
}
