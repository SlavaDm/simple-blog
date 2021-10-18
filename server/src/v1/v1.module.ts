import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { V1Controller } from './v1.controller';
import { V1Service } from './v1.service';
import { ImagesModule } from './images/images.module';

/**
 * The module for binding all modules of the 1 version of REST API.
 */
@Module({
  imports: [PostsModule, ImagesModule],
  controllers: [V1Controller],
  providers: [V1Service],
})
export class V1Module {}
