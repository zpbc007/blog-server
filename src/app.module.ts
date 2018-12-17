import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticlesModule } from './articles/articles.module';
import { TagsModule } from './tags/tags.module';
import { ImgsModule } from './imgs/imgs.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    ArticlesModule,
    TagsModule,
    ImgsModule,
  ],
})
export class AppModule {}
