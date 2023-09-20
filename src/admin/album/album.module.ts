import { LoggerModule } from '@logger'
import { Module } from '@nestjs/common'
import { AlbumController } from './album.controller'
import { AlbumService } from './album.service'

@Module({
  imports: [LoggerModule.forFeature([AlbumController, AlbumService])],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
