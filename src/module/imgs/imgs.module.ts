import { Module } from '@nestjs/common';
import { ImgsService } from './imgs.service';
import { ImgsController } from './imgs.controller';

@Module({
  providers: [ImgsService],
  controllers: [ImgsController]
})
export class ImgsModule {}
