import { Controller, Get, Param, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ImageDTO } from 'src/dto/image.dto';
import { ImagesService } from './images.service';

/**
 * The controller for getting data about photos from JSONPlaceHolder API.
 */
@Controller('v1/images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get()
  getImages(
    @Query('from') from: string,
    @Query('to') to: string,
  ): Observable<ImageDTO[]> {
    return this.imagesService.getImages(from, to);
  }

  @Get('count')
  getCountOfThePosts(): Observable<number> {
    return this.imagesService.getCountOfTheImages();
  }

  @Get(':id')
  getImage(@Param('id') id: string): Observable<ImageDTO> {
    return this.imagesService.getImage(id);
  }
}
