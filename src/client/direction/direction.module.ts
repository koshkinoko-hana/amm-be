import { LoggerModule } from '@logger'
import { Module } from '@nestjs/common'
import { DirectionController } from './direction.controller'
import { DirectionService } from './direction.service'

@Module({
  imports: [LoggerModule.forFeature([DirectionController, DirectionService])],
  controllers: [DirectionController],
  providers: [DirectionService],
})
export class DirectionModule {}
