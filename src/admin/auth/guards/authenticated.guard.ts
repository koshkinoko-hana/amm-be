import { InjectLogger, Logger } from '@logger'
import { AuthGuard } from './auth.guard'
import { User } from '@entities'

export class AuthenticatedGuard extends AuthGuard {
  constructor(
    @InjectLogger(AuthenticatedGuard)
    logger: Logger,
  ) {
    super(logger, User.Role.AUTHENTICATED)
  }
}
