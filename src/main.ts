import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Command } from 'commander';
import { LoggerService } from './common/setup/logger/logger.service';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { RequestInterceptor } from './common/interceptors/request.interceptor';
import { ExceptionInterceptor } from './common/interceptors/exception-handler.interceptor';
import { configureOrigin, saveSwaggerDocument, subscribeNodeSignals, swaggerConfig } from './common/bootstrap';
import { SwaggerModule } from '@nestjs/swagger';
import { Env } from './common/env';
import * as chalk from 'chalk';

const program = new Command();
program
  .description('Specify port value to override env variable PORT')
  .option('-p, --port <port>', 'Port to listen')
  .option('-s, --swagger', 'Signal to generate swagger documentation')
  .action(() => {
    if (program.swagger) process.env.SWAGGER = 'generate';
    if (!isNaN(+program.port)) {
      console.log(chalk.yellow('Port value has been overridden by command line argument. Port: ' + program.port));
      process.env.PORT = program.port;
    }
  })
  .parse(process.argv);

(async function bootstrap() {
  const scriptMode = process.env.SWAGGER === 'generate';
  const app = await NestFactory.create(AppModule);
  const logger = app.get(LoggerService);
  const config = app.get(ConfigService);
  subscribeNodeSignals(logger);
  app.enableCors({
    origin: configureOrigin,
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    allowedHeaders: 'Authorization, Content-Type',
    exposedHeaders: 'Authorization',
    credentials: true,
  });
  app.useLogger(scriptMode ? false : logger);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalInterceptors(new RequestInterceptor(), new ExceptionInterceptor());
  app.setGlobalPrefix('/api');
  app.enableVersioning({
    prefix: 'v',
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  saveSwaggerDocument(document);
  SwaggerModule.setup('docs', app, document);
  const appPort = parseInt(config.get('PORT'), 10);
  app.getHttpAdapter().getInstance().disable('x-powered-by');
  await app.listen(appPort, '0.0.0.0', async () => {
    const url = await app.getUrl();
    if (Env.isDev)
      return console.log(
        chalk.bold(`
          Application started at: ${url}
          Swagger docs: ${url}/docs
          Mode: ${chalk.bgCyan(Env.NodeEnv)}
        `),
      );

    logger.log(`Application started at: ${url}`, 'InstanceLoader');
  });
})();
