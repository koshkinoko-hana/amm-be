import { InjectLogger, Logger } from '@logger'
import { AuthGuard } from './auth.guard'
import {User} from '@entities'

export class NewsModeratorAuthGuard extends AuthGuard {
  constructor(
    @InjectLogger(NewsModeratorAuthGuard)
    logger: Logger,
  ) {
    super(logger, User.Role.NEWS_MODERATOR)
  }
}
