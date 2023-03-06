import { InjectLogger, Logger } from '@logger'
import { AuthGuard } from './auth.guard'
import {User} from '@entities'

export class CompanyModeratorAuthGuard extends AuthGuard {
  constructor(
    @InjectLogger(CompanyModeratorAuthGuard)
    logger: Logger,
  ) {
    super(logger, User.Role.COMPANY_MODERATOR)
  }
}
