import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { catchError, map, Observable } from 'rxjs';
import { ImageDTO } from 'src/dto/image.dto';
import { BoundaryCondition } from 'src/enum/boundary-condition';

/**
 * The service for getting data from the JSONPlaceHolder API.
 */
@Injectable()
export class ImagesService {
  /**
   * init HttpService for sending requests.
   */
  constructor(private readonly httpService: HttpService) {}

  /**
   * The method gets images by query params. If "from", "to" don't exist - use default params.
   * @returns the array with images.
   */
  public getImages(from: string, to: string): Observable<ImageDTO[]> {
    if (Number.isInteger(Number(from)) && Number.isInteger(Number(to))) {
      return this.httpService
        .get('https://jsonplaceholder.typicode.com/photos')
        .pipe(
          catchError((error) => {
            throw new BadRequestException(error);
          }),
          map((response) => {
            return response.data.filter(
              (image: ImageDTO) =>
                image.id >= Number(from) && image.id <= Number(to),
            );
          }),
        );
    }

    return this.httpService
      .get('https://jsonplaceholder.typicode.com/photos')
      .pipe(
        catchError((error) => {
          throw new BadRequestException(error);
        }),
        map((response) => {
          return response.data.filter(
            (image: ImageDTO) =>
              image.id >= BoundaryCondition.FROM &&
              image.id <= BoundaryCondition.TO,
          );
        }),
      );
  }

  /**
   * The method gets count of the images.
   * @returns the count of the images.
   */
  public getCountOfTheImages(): Observable<number> {
    return this.httpService
      .get('https://jsonplaceholder.typicode.com/photos')
      .pipe(
        catchError((error) => {
          throw new BadRequestException(error);
        }),
        map((response) => Number(response.data.length)),
      );
  }

  /**
   * The method for getting image by id.
   * @param id - The param for getting image by id.
   * @returns the image by id.
   */
  public getImage(id: string): Observable<ImageDTO> {
    if (Number.isInteger(Number(id))) {
      return this.httpService
        .get(`https://jsonplaceholder.typicode.com/photos/${id}`)
        .pipe(
          catchError((error) => {
            throw new BadRequestException(error);
          }),
          map((response) => response.data),
        );
    }

    return null;
  }
}
