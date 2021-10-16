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
  /**
   * The method gets images by query params. If "from", "to" don't exist - use default params.
   * @returns the array with images.
   */
  private getImages(
    @Query('from') from: string,
    @Query('to') to: string,
  ): Observable<ImageDTO[]> {
    return this.imagesService.getImages(from, to);
  }

  @Get('count')
  /**
   * The method gets count of the images.
   * @returns the count of the images.
   */
  private getCountOfTheImages(): Observable<number> {
    return this.imagesService.getCountOfTheImages();
  }

  @Get(':id')
  /**
   * The method for getting image by id.
   * @param id the param for getting image by id.
   * @returns the post by id.
   */
  private getImage(@Param('id') id: string): Observable<ImageDTO> {
    return this.imagesService.getImage(id);
  }
}
