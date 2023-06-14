import { User } from '@entities'
import { InjectLogger, Logger } from '@logger'
import { BadRequestException, Injectable } from '@nestjs/common'
import { AuthorizationResponse, AuthorizarionRequest } from './dto'
import { badRequestHandler, failIfExists, notFoundHandler } from '@common/utils/fail-handler'
import { EntityManager } from '@mikro-orm/core'
import { JwtService } from '@nestjs/jwt'
import bcrypt from 'bcrypt'
import { TokenPayload } from './interfaces'
import { RegisterRequest } from './dto/register.request'
import { AuthInfo } from './interfaces'

@Injectable()
export class AuthService {
  private readonly tokenIssuer: string

  constructor(
    private readonly em: EntityManager,
    @InjectLogger(AuthService)
    private readonly logger: Logger,
    private readonly jwtService: JwtService,
  ) {
    this.tokenIssuer = 'vsuAmmBackend'
    this.logger.child('constructor').trace('<>')
  }

  public async login(
    req: AuthorizarionRequest.Credentials,
  ): Promise<AuthorizationResponse.AuthToken> {
    const logger = this.logger.child('createManagementToken', { req })
    logger.trace('>')

    const { login, password } = req

    const user = await this.em.findOneOrFail<User>(
      User,
      { login },
      {
        failHandler: notFoundHandler(logger, {
          message: () => 'Invalid credentials!',
          logLevel: 'warn',
        }),
      },
    )

    logger.traceObject({ user })

    if (user.status === User.Status.DEACTIVATED) {
      const err = new BadRequestException('Invalid credentials!')
      logger.warn({ err, user }, '! user is deactivated')
      throw err
    }

    const credentialsMatched = await this.checkPassword(password, user.passwordHash)

    logger.traceObject({ credentialsMatched })

    if (!credentialsMatched) {
      const err = new BadRequestException(`Invalid credentials!`)
      logger.warn({ err, user }, '! invalid credentials')
      throw err
    }

    const tokenPayload: TokenPayload = {
      sub: `${user.login}`,
      iss: this.tokenIssuer,
    }

    logger.traceObject({ tokenPayload })

    const authToken = await this.jwtService.signAsync(tokenPayload)

    const res = new AuthorizationResponse.AuthToken({ authToken, roles: user.roles })
    logger.trace({ res }, '<')
    return res
  }

  public async register(req: RegisterRequest.Credentials): Promise<void> {
    const logger = this.logger.child('createManagementToken', { req })
    logger.trace('>')

    const { login, password } = req

    await failIfExists(
      this.em,
      User,
      { login },
      badRequestHandler(logger, {
        message: () => 'Invalid credentials!456',
        logLevel: 'warn',
      }),
    )
    const passwordHash = await this.hashPassword(password)
    const user = new User({
      ...req,
      passwordHash,
      status: User.Status.ACTIVE,
      roles: req.role ? [req.role] : [User.Role.ADMIN],
    })

    this.em.persistAndFlush(user)
    logger.traceObject({ user })
    logger.trace('<')
    return
  }

  async hashPassword(password: string): Promise<string> {
    const logger = this.logger.child('hashPassword', { password })
    logger.trace('>')

    const res = await bcrypt.hash(password, 10)
    logger.trace({ res }, '<')
    return res
  }

  async checkPassword(password: string, hash: string): Promise<boolean> {
    const logger = this.logger.child('checkPassword', { password, hash })
    logger.trace('>')

    const res = await bcrypt.compare(password, hash)

    logger.trace({ res }, '<')
    return res
  }

  public async validateToken(tokenPayload: TokenPayload): Promise<AuthInfo> {
    const logger = this.logger.child('validateToken', { tokenPayload })
    logger.trace('>')

    const { sub: login, iss } = tokenPayload

    if (iss !== this.tokenIssuer) {
      const err = new BadRequestException('Invalid credentials!678')
      logger.error(err, '! invalid issuer')
      throw err
    }

    const { id, company, roles } = await this.em.findOneOrFail(
      User,
      { login },
      {
        failHandler: badRequestHandler(logger, {
          message: () => 'Invalid credentials!567',
          logLevel: 'warn',
        }),
      },
    )

    const res: AuthInfo = {
      login,
      id,
      roles,
      companyId: company?.id,
    }

    logger.trace({ res }, '<')
    return res
  }
}
