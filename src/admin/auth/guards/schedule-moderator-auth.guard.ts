import { InjectLogger, Logger } from '@logger'
import { AuthGuard } from './auth.guard'
import { User } from '@entities'

export class ScheduleModeratorAuthGuard extends AuthGuard {
  constructor(
    @InjectLogger(ScheduleModeratorAuthGuard)
    logger: Logger,
  ) {
    super(logger, User.Role.SCHEDULE_MODERATOR)
  }
}
