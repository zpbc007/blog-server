import { Module } from '@nestjs/common';
import { MockService } from './mock.service';
import { MockController } from './mock.controller';
import { UsersModule } from '../users/users.module';
import { ArticlesModule } from '../articles/articles.module';
import { TagsModule } from 'dist/src/module/tags/tags.module';

@Module({
    imports: [
        UsersModule,
        ArticlesModule,
        TagsModule,
    ],
    providers: [MockService],
    controllers: [MockController],
})
export class MockModule {}
