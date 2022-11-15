import {
  Inject,
  Injectable,
  LoggerService as INestLogger,
  Type,
} from '@nestjs/common';
import { undefinedToNull } from '@utils';
import pino from 'pino';

@Injectable()
export class LoggerFactory {
  private rootLogger: pino.Logger;

  constructor() {
    this.rootLogger = pino({
      colorize: true,
      translateTime: true,
      level: 'info',
    });
  }

  getLogger(): Logger {
    return new Logger(this.rootLogger);
  }

  getNestLogger(): NestLogger {
    return new NestLogger(new Logger(this.rootLogger));
  }
}

export const InjectLogger = (type: Type<any>) => Inject(`${type.name}Logger`);

export class Logger {
  constructor(
    private readonly logger: pino.Logger,
    private readonly level: number = 0,
  ) {}

  traceObject(obj: object) {
    undefinedToNull(obj);
    const keys = Object.keys(obj).join(', ');
    this.trace(obj, `? ${keys}`);
  }

  trace(mergeObjOrMsg: object | string, ...args: any[]) {
    this.logger.trace(mergeObjOrMsg as any, ...args);
  }

  debug(mergeObjOrMsg: object | string, ...args: any[]) {
    this.logger.debug(mergeObjOrMsg as any, ...args);
  }

  info(mergeObjOrMsg: object | string, ...args: any[]) {
    this.logger.info(mergeObjOrMsg as any, ...args);
  }

  warn(mergeObjOrMsg: object | string, ...args: any[]) {
    this.logger.warn(mergeObjOrMsg as any, ...args);
  }

  error(mergeObjOrMsg: object | string, ...args: any[]) {
    this.logger.error(mergeObjOrMsg as any, ...args);
  }

  child(cnxt: string, obj?: object): Logger {
    return new Logger(
      this.logger.child({ [`context-${this.level}`]: cnxt, ...obj }),
      this.level + 1,
    );
  }
}

export class NestLogger implements INestLogger {
  private readonly logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  log(msg: any, context?: string) {
    const _logger = context ? this.logger.child(context) : this.logger;
    _logger.info(msg);
  }

  error(msg: any, trace?: string, context?: string) {
    const _logger = context ? this.logger.child(context) : this.logger;
    _logger.error(msg, trace);
  }

  warn(msg: any, context?: string) {
    const _logger = context ? this.logger.child(context) : this.logger;
    _logger.warn(msg);
  }
}
