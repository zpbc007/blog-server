import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from '../server.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(config.port);
  console.log(`listen on port ${config.port}`);
}
bootstrap();
