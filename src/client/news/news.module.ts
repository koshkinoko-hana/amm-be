import { LoggerModule } from '@logger'
import { Module } from '@nestjs/common'
import { NewsController } from './news.controller'
import { NewsService } from './news.service'

@Module({
  imports: [LoggerModule.forFeature([NewsController, NewsService])],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
