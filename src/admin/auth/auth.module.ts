import { LoggerModule } from '@logger'
import { Global, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import {
  AdminAuthGuard,
  AuthenticatedGuard,
  CompanyModeratorAuthGuard,
  ContentModeratorAuthGuard,
  NewsModeratorAuthGuard,
  ScheduleModeratorAuthGuard,
  StructureDataAuthGuard,
} from './guards'
import { JwtStrategy } from './jwt.strategy'

@Global()
@Module({
  controllers: [AuthController],
  imports: [
    LoggerModule.forFeature([
      AuthController,
      AuthService,
      AdminAuthGuard,
      AuthenticatedGuard,
      CompanyModeratorAuthGuard,
      ContentModeratorAuthGuard,
      JwtStrategy,
      NewsModeratorAuthGuard,
      ScheduleModeratorAuthGuard,
      StructureDataAuthGuard,
    ]),
    JwtModule.register({
      secret: 'secretKey',
      signOptions: {
        expiresIn: 14400,
        audience: 'vsuAmmBackend',
      },
    }),
  ],
  exports: [
    LoggerModule.forFeature([
      AuthenticatedGuard,
      AdminAuthGuard,
      CompanyModeratorAuthGuard,
      NewsModeratorAuthGuard,
      ScheduleModeratorAuthGuard,
      StructureDataAuthGuard,
      AuthService,
    ]),
    AuthService,
  ],
  providers: [
    AuthService,
    JwtStrategy,
    AuthenticatedGuard,
    AdminAuthGuard,
    CompanyModeratorAuthGuard,
    NewsModeratorAuthGuard,
    ScheduleModeratorAuthGuard,
    StructureDataAuthGuard,
  ],
})
export class AuthModule {}
