import { ReqAuthInfo } from '@common/decorators/req-auth-info.decorator'
import { InjectLogger, Logger } from '@logger'
import { Controller, Get, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard'
import { FindMeResponse } from './dto/find-me.response'
import { AuthInfo } from '../auth/interfaces'

@UseGuards(AuthenticatedGuard)
@Controller('/admin/user')
export class UserController {
  constructor(
    @InjectLogger(UserController)
    private readonly logger: Logger,
    private readonly userService: UserService,
  ) {
    this.logger.child('constructor').trace('<>')
  }

  @Get('/me')
  async getMe(@ReqAuthInfo() authInfo: AuthInfo): Promise<FindMeResponse.User> {
    const logger = this.logger.child('getMe')
    logger.trace('>')

    const res = await this.userService.findMe(authInfo)
    logger.trace({ res }, '<')
    return res
  }
}
