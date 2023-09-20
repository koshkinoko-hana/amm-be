import { AuthModule } from '@admin/auth'
import { AdminUserController } from '@admin/user/admin-user.controller'
import { LoggerModule } from '@logger'
import { Global, Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Global()
@Module({
  controllers: [UserController, AdminUserController],
  imports: [
    LoggerModule.forFeature([UserController, UserService, AdminUserController]),
    AuthModule,
  ],
  exports: [UserService],
  providers: [UserService],
})
export class UserModule {}
