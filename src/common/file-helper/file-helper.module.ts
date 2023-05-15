import { FileHelperService } from '@common/file-helper/file-helper.service'
import { FirebaseStorageProvider } from '@common/file-helper/firebase-storage.provider'
import { LoggerModule } from '@logger'
import { Module } from '@nestjs/common'

@Module({
  imports: [LoggerModule.forFeature([FirebaseStorageProvider, FileHelperService])],
  providers: [FirebaseStorageProvider, FileHelperService],
  exports: [FirebaseStorageProvider, FileHelperService],
})
export class FileHelperModule {}
