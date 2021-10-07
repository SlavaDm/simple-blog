import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

/**
 * The module for binding PostsController and PostService, for using httpModule.
 */
@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [HttpModule],
})
export class PostsModule {}
