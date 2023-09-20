import { MySqlDriver } from '@mikro-orm/mysql'
import { MikroOrmModuleOptions } from '@mikro-orm/nestjs/typings'
import * as entities from './src/common/entities'

// tslint:disable-next-line:no-var-requires
require('dotenv').config()

export default {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'rootroot',
  dbName: 'amm_db',
  logging: 'all',
  glob: '!(*.d).{js,ts}',
  entities: Object.values(entities),
  migrations: {
    tableName: 'migrations', // name of database table with log of executed transactions
    path: './migrations', // path to the folder with migrations
    transactional: true, // wrap each migration in a transaction
    disableForeignKeys: true, // wrap statements with `set foreign_key_checks = 0` or equivalent
    allOrNothing: true, // wrap all migrations in master transaction
  },
  tsNode: false,
  cache: {
    enabled: false,
  },
} as MikroOrmModuleOptions<MySqlDriver>
