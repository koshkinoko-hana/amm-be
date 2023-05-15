import { NestFactory } from '@nestjs/core'
import { initializeFirebaseApp } from '../firebase.config'
import { AppModule } from './app.module'
// eslint-disable-next-line
require('dotenv').config()

initializeFirebaseApp()

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({})
  await app.listen(3000)
}
bootstrap().catch()
