import { InjectLogger, Logger } from '@logger'
import { AuthGuard } from './auth.guard'
import { User } from '@entities'

export class AdminAuthGuard extends AuthGuard {
  constructor(
    @InjectLogger(AdminAuthGuard)
    logger: Logger,
  ) {
    super(logger, User.Role.ADMIN)
  }
}
