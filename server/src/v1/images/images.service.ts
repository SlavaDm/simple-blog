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
  constructor(private readonly httpService: HttpService) {}

  getCountOfTheImages(): Observable<number> {
    return this.httpService
      .get('https://jsonplaceholder.typicode.com/photos')
      .pipe(map((response) => Number(response.data.length)));
  }

  getImages(from: string, to: string): Observable<ImageDTO[]> {
    if (Number.isInteger(Number(from) && Number.isInteger(Number(to)))) {
      return this.httpService
        .get('https://jsonplaceholder.typicode.com/photos')
        .pipe(
          catchError((error) => {
            throw new BadRequestException(error);
          }),
          map((response) => {
            return response.data
              .map((image: ImageDTO) =>
                image.id >= Number(from) && image.id <= Number(to)
                  ? image
                  : null,
              )
              .filter((image: ImageDTO) => image !== null);
          }),
        );
    }

    return this.httpService
      .get('https://jsonplaceholder.typicode.com/posts')
      .pipe(
        catchError((error) => {
          throw new BadRequestException(error);
        }),
        map((response) => {
          return response.data
            .map((image: ImageDTO) =>
              image.id >= BoundaryCondition.FROM &&
              image.id <= BoundaryCondition.TO
                ? image
                : null,
            )
            .filter((image: ImageDTO) => image !== null);
        }),
      );
  }

  /**
   *
   * @param id - The param for getting image by id.
   * @returns
   */
  getImage(id: string): Observable<ImageDTO> {
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
