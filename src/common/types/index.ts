import { Request } from 'express';
import { Logger } from '@nestjs/common';

export enum NodeEnv {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TEST = 'test',
  E2E = 'end2end',
  DEBUG = 'debug',
}

export type ExpressRequest = Request & {
  logger: Logger;
};
