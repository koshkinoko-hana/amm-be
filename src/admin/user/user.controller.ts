import { ReqAuthInfo } from '@common/decorators/req-auth-info.decorator'
import { InjectLogger, Logger } from '@logger'
import { Controller, Get, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { AuthenticatedGuard } from '@admin/auth/guards'
import { FindResponse } from '@admin/user/dto'
import { AuthInfo } from '@admin/auth/interfaces'

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
  async getMe(@ReqAuthInfo() authInfo: AuthInfo): Promise<FindResponse.User> {
    const logger = this.logger.child('getMe')
    logger.trace('>')

    const res = await this.userService.findMe(authInfo)
    logger.trace({ res }, '<')
    return res
  }
}
