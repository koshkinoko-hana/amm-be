import { Logger } from '@logger';
import {
  AnyEntity,
  Dictionary,
  EntityManager,
  EntityName,
  FilterQuery,
  IPrimaryKey,
  Utils,
} from '@mikro-orm/core';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  HttpException,
  NotFoundException,
  Type,
} from '@nestjs/common';

export type HandlerFn = (
  entityName: string,
  where: Dictionary | IPrimaryKey | any,
) => Error;

export interface FailHandlerOptions {
  message: (entityName: string) => string;
  logLevel: keyof Pick<Logger, 'trace' | 'debug' | 'info' | 'warn' | 'error'>;
  exception: Type<HttpException>;
  logMsg?: string;
}

export async function failIfExists<T extends AnyEntity<T>>(
  em: EntityManager,
  entityName: EntityName<T>,
  where: FilterQuery<T>,
  _failHandler: HandlerFn,
): Promise<void> {
  const conflict = await em
    .count<T>(entityName, where)
    .then((count) => count > 0);
  if (conflict) {
    throw _failHandler(Utils.className(entityName), where);
  }
}

export function failHandler(logger: Logger, options: FailHandlerOptions) {
  return (entityName: string, where: Dictionary | IPrimaryKey | any): Error => {
    const err = new options.exception(options.message(entityName));
    logger[options.logLevel](
      { err, entityName, where },
      `! ${options.logMsg || 'not found'}`,
    );
    return err;
  };
}

export function badRequestHandler(
  logger: Logger,
  options?: Partial<FailHandlerOptions>,
): HandlerFn {
  return failHandler(logger, {
    exception: BadRequestException,
    message: (entityName) => `Wrong parameters for ${entityName}!`,
    logLevel: 'info',
    ...options,
  });
}

export function notFoundHandler(
  logger: Logger,
  options?: Partial<FailHandlerOptions>,
): HandlerFn {
  return failHandler(logger, {
    exception: NotFoundException,
    message: (entityName) => `${entityName} not found!`,
    logLevel: 'info',
    ...options,
  });
}

export function accessDeniedHandler(
  logger: Logger,
  options?: Partial<FailHandlerOptions>,
): HandlerFn {
  return failHandler(logger, {
    exception: ForbiddenException,
    message: (entityName) => `${entityName} access denied!`,
    logLevel: 'warn',
    ...options,
  });
}

export function conflictHandler(
  logger: Logger,
  options?: Partial<FailHandlerOptions>,
): HandlerFn {
  return failHandler(logger, {
    exception: ConflictException,
    message: (entityName) => `${entityName} already exists!`,
    logLevel: 'info',
    logMsg: 'already exists',
    ...options,
  });
}
