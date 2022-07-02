import { LoggerService } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import * as chalk from 'chalk';
import * as yaml from 'js-yaml';
import * as fs from 'fs';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('../../../package.json');
export const configureOrigin = (origin, callback) => {
  const corsWhitelist = process.env.ORIGIN.split(',');
  const originNotDefined = !origin;
  const isWhitelisted = corsWhitelist.indexOf(origin) !== -1;
  const isLocalhost = new RegExp(/^https?:\/\/(localhost|127.0.0.1)/).test(origin);
  const isMegrulad = new RegExp(/^https?:\/\/(.*)\.megrulad\.ge/).test(origin);
  const corsAllowed = originNotDefined || isLocalhost || isWhitelisted || isMegrulad;

  if (corsAllowed) return callback(null, true);
  callback(new Error(`Origin [${origin}] Not allowed by CORS`));
};

export const subscribeNodeSignals = (logger: LoggerService) => {
  const signalsNames: NodeJS.Signals[] = ['SIGTERM', 'SIGINT', 'SIGHUP'];

  signalsNames.forEach((signalName) =>
    process.on(signalName, (signal) => {
      logger.log(`Retrieved signal: ${signal}, application terminated`, 'main');
      process.exit(0);
    }),
  );

  process.on('uncaughtException', (error: Error) => {
    logger.error({ error }, 'main');
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    logger.error(`Unhandled Promise Rejection, reason: ${reason}`, 'main');
    promise.catch((error: Error) => {
      logger.error({ error });
      process.exit(1);
    });
  });
};

export const swaggerConfig = new DocumentBuilder()
  .addBearerAuth({
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    name: 'JWT',
    description: 'Enter JWT auth token',
    in: 'header',
  })
  .setTitle('Megrulad.ge [PLACEHOLDER]')
  .setDescription('Description [PLACEHOLDER]')
  .setVersion(packageJson.version)
  .build();

export const saveSwaggerDocument = (document: OpenAPIObject) => {
  if (process.env.SWAGGER === 'generate') {
    console.log(chalk.yellow('Swagger documentation has been requested. Generating...'));
    try {
      const yamlString = yaml.dump(document);
      fs.writeFileSync('./docs/swagger.yaml', yamlString);
      console.log(chalk.green('Swagger documentation has been generated successfully.'));
    } catch (error) {
      console.error(`Error while writing swagger.yaml file: ${error}`, 'InstanceLoader');
    } finally {
      process.exit(0);
    }
  }
};
