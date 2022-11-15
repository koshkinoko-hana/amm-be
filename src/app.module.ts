import { LoggerFactory, LoggerModule } from '@logger';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import mikroOrmConfig from '../mikro-orm.config';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      useFactory: (loggerFactory: LoggerFactory) => {
        const logger = loggerFactory.getLogger().child('MikroORM');
        return {
          ...mikroOrmConfig,

          logger: (message: string) => logger.trace(message),
        };
      },
      inject: [LoggerFactory],
      imports: [LoggerModule, AdminModule],
    }),
  ],
})
export class AppModule {}
