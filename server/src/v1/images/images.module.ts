import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';

/**
 * The module for binding ImagesController and ImagesService, for using httpModule.
 */
@Module({
  controllers: [ImagesController],
  providers: [ImagesService],
  imports: [HttpModule],
})
export class ImagesModule {}
