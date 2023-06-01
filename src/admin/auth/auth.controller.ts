import { InjectLogger, Logger } from '@logger'
import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthorizarionRequest, AuthorizationResponse } from './dto'
import { RegisterRequest } from './dto/register.request'

@Controller('/admin/auth')
export class AuthController {
  constructor(
    @InjectLogger(AuthController)
    private readonly logger: Logger,
    private readonly authService: AuthService,
  ) {
    this.logger.child('constructor').trace('<>')
  }

  @Post()
  async auth(
    @Body() req: AuthorizarionRequest.Credentials,
  ): Promise<AuthorizationResponse.AuthToken> {
    const logger = this.logger.child('auth', { req })
    logger.trace('>')

    const res = await this.authService.login(req)
    logger.trace({ res }, '<')
    return res
  }

  @Post('/register')
  async register(
  @Body() req: RegisterRequest.Credentials,
  ): Promise<boolean> {
    const logger = this.logger.child('register', { req })
    logger.trace('>')

    await this.authService.register(req)
    logger.trace('<')
    return true
  }
}
