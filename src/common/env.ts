import { trim } from 'ramda';
import { NodeEnv } from './types';

export class Env {
  public static get NodeEnv(): NodeEnv {
    const env = trim(process.env.NODE_ENV) as NodeEnv;
    if (!env) throw new TypeError('NODE_ENV is not defined');

    return env;
  }

  public static get isDev() {
    return Env.NodeEnv === NodeEnv.DEVELOPMENT;
  }

  public static get isProd() {
    return Env.NodeEnv === NodeEnv.PRODUCTION;
  }

  public static get isTest() {
    return Env.NodeEnv === NodeEnv.TEST;
  }
}
