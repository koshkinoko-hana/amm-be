import { Module } from '@nestjs/common'
import { NewsModule } from './news'

@Module({
  imports: [NewsModule],
})
export class ClientModule {}
