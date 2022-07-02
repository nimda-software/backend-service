import { Injectable, LoggerService as ILogger } from '@nestjs/common';
import { RequestService } from '../request/request.service';
import { LoggerUtils } from './logger.utils';
import { LogType } from './logger.enum';
import { Env } from '../../env';

/**
 * @Description Custom Logger service with built-in request ID logging. NB! Do not use outside of the
 * controllers(use in controllers with the caution). Instead reference Nest Logger service. This service is
 * dependant on Request service(RequestService) which is scoped to REQUEST. And it will result creating new
 * instances of the service(s) for each request. So, using it in the services is prohibited unless you know what you
 * are doing.
 *
 * Following in-house requirements:
 * @link https://rangeforce.atlassian.net/wiki/spaces/PLAT/pages/2065367045/Requirements+for+log+output
 * @export
 * @class LoggerService
 * @implements {ILogger}
 */
@Injectable()
export class LoggerService implements ILogger {
  constructor(private readonly request: RequestService) {}

  /** Same as INFO */
  log(message: unknown, context?: string) {
    console.log(this.format(LogType.INFO, message, context));
  }

  /** Kibana won't parse it and won't be logged in production. */
  verbose(message: unknown, context?: string) {
    if (Env.isProd) return;
    console.log(this.format(LogType.VERBOSE, message, context));
  }

  /** Kibana won't parse it and won't be logged in production. */
  debug(message: unknown, context?: string) {
    if (Env.isProd) return;
    console.debug(this.format(LogType.DEBUG, message, context));
  }

  /** Kibana filter support `logLevel` */
  info(message: unknown, context?: string) {
    console.info(this.format(LogType.INFO, message, context));
  }

  /** Kibana filter support `logLevel` */
  error(message: unknown, context?: string, trace?: string) {
    console.error(
      this.format(LogType.ERROR, LoggerUtils.stringify(message), context) +
        ` ${trace ?? ''}`,
    );
  }

  /** Kibana filter support `logLevel` */
  warn(message: unknown, context?: string) {
    console.warn(this.format(LogType.WARN, message, context));
  }

  /** Kibana filter support `logLevel` */
  fatal(message: unknown, context?: string) {
    console.error(this.format(LogType.FATAL, message, context));
  }

  private format(level: LogType, message: unknown, context?: string) {
    context = this.request?.getRequestId() || context;

    return LoggerUtils.format(level, context, message);
  }
}
