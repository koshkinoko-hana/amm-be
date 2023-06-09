import { LoggerModule } from '@logger'
import { Module } from '@nestjs/common'
import { PositionController } from './position.controller'
import { PositionService } from './position.service'

@Module({
  imports: [LoggerModule.forFeature([PositionController, PositionService])],
  controllers: [PositionController],
  providers: [PositionService],
})
export class ClientPositionModule {}
