import { LoggerModule } from '@logger'
import { Global, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import {
  AuthenticatedGuard,
  AuthGuard,
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
      AuthGuard,
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
    LoggerModule.forFeature([AuthGuard]),
    LoggerModule.forFeature([AuthenticatedGuard]),
    LoggerModule.forFeature([CompanyModeratorAuthGuard]),
    LoggerModule.forFeature([ContentModeratorAuthGuard]),
    LoggerModule.forFeature([NewsModeratorAuthGuard]),
    LoggerModule.forFeature([ScheduleModeratorAuthGuard]),
    LoggerModule.forFeature([StructureDataAuthGuard]),
    AuthService,
  ],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
