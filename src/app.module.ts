import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './module/auth/auth.module';
import { UsersModule } from './module/users/users.module';
import { ArticlesModule } from './module/articles/articles.module';
import { TagsModule } from './module/tags/tags.module';
import { ImgsModule } from './module/imgs/imgs.module';
import { MockModule } from './module/mock/mock.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    UsersModule,
    ArticlesModule,
    TagsModule,
    ImgsModule,
    MockModule,
  ],
})
export class AppModule {}
