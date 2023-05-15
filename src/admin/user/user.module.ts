import { LoggerModule } from '@logger'
import { Global, Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Global()
@Module({
  controllers: [UserController],
  imports: [LoggerModule.forFeature([UserController, UserService])],
  exports: [UserService],
  providers: [UserService],
})
export class UserModule {}