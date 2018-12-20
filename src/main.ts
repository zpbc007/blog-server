import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from '../server.config';
import { ValidationExceptionFactory } from './exception/validation.exception';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ exceptionFactory: ValidationExceptionFactory }));
  await app.listen(config.port);
  console.log(`listen on port ${config.port}`);
}
bootstrap();
