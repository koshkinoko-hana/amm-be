import { InjectLogger, Logger } from '@logger'
import { AuthGuard } from './auth.guard'
import {User} from '@entities'

export class StructureDataAuthGuard extends AuthGuard {
  constructor(
    @InjectLogger(StructureDataAuthGuard)
    logger: Logger,
  ) {
    super(logger, User.Role.STRUCTURE_DATA_MODERATOR)
  }
}
