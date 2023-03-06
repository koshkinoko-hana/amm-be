import { InjectLogger, Logger } from '@logger'
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthService } from './auth.service'
import { AuthInfo, TokenPayload } from './interfaces'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectLogger(JwtStrategy)
    private readonly logger: Logger,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secretKey',
      audience: 'vsuAmmBackend',
      issuer: 'vsuAmmBackend',
    })

    this.logger.child('constructor').trace('<>')
  }

  async validate(tokenPayload: TokenPayload): Promise<AuthInfo> {
    const logger = this.logger.child('validate', { tokenPayload })
    logger.trace('>')

    const res = this.authService.validateToken(tokenPayload)
    logger.trace({ res }, '<')
    return res
  }
}
