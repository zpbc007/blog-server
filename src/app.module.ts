import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticlesModule } from './articles/articles.module';
import { TagsModule } from './tags/tags.module';
import { ImgsModule } from './imgs/imgs.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    UsersModule,
    ArticlesModule,
    TagsModule,
    ImgsModule,
  ],
})
export class AppModule {}
