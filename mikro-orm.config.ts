import {MySqlDriver} from '@mikro-orm/mysql'
import {MikroOrmModuleOptions} from '@mikro-orm/nestjs/typings'
import * as entities from './src/common/entities'

// tslint:disable-next-line:no-var-requires
require('dotenv').config()

export default {
  entitiesTs: ['./src/entities'],
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dbName: 'amm_db',
  logging: 'all',
  glob: '!(*.d).{js,ts}',
  entities: Object.values(entities),
  migrations: {
    path: './migrations', // путь до папки с миграциями
    pattern: /^[\w-]+\d+\.[tj]s$/, // регулярное выражение для поиска файлов миграций
    transactional: true, // обернуть каждую миграцию в транзакцию
    disableForeignKeys: true, // автоматически отключить foreign keys во время миграции
    allOrNothing: true, // обернуть все миграции в master транзакцию
    dropTables: true, // автоматически отключить foreign keys во время миграции
    safe: false, // позволить выполнять миграции "вне очереди"
    emit: 'ts', // использовать TypeScript для генерации миграций
},
  tsNode: false,
  cache: {
    enabled: false,
  },
} as MikroOrmModuleOptions<MySqlDriver>
