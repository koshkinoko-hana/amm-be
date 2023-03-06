import { InjectLogger, Logger } from '@logger'
import { AuthGuard } from './auth.guard'
import {User} from '@entities'

export class ContentModeratorAuthGuard extends AuthGuard {
  constructor(
    @InjectLogger(ContentModeratorAuthGuard)
    logger: Logger,
  ) {
    super(logger, User.Role.CONTENT_MODERATOR)
  }
}
