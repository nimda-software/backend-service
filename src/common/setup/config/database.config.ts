import { Env } from '../../env';
import { registerAs } from '@nestjs/config';
import * as path from 'path';

export default registerAs('database', () => ({
  database: Env.isTest ? ':memory:' : process.env.DB_DATABASE,
  type: 'sqlite',
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  ...(!Env.isProd && {
    synchronize: true,
    synchronizeOptions: {
      force: true,
    },
  }),
  autoLoadEntities: true,
  entities: [
    Env.isTest
      ? 'src/**/*.entity{.ts,.js}'
      : path.join(__dirname, './**/*.entity{.ts,.js}'),
  ],
  keepConnectionAlive: true,
  logging: Env.isDev ? 'all' : 'error',
}));
