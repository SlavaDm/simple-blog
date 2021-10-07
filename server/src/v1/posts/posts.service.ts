import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { catchError, map, Observable } from 'rxjs';
import { PostDTO } from 'src/dto/post.dto';
import { BoundaryCondition } from 'src/enum/boundary-condition';

/**
 * The service for getting data from the JSONPlaceHolder API.
 */
@Injectable()
export class PostsService {
  constructor(private readonly httpService: HttpService) {}

  getCountOfThePosts(): Observable<number> {
    return this.httpService
      .get('https://jsonplaceholder.typicode.com/posts')
      .pipe(map((response) => Number(response.data.length)));
  }

  /**
   *
   * @returns
   */
  getPosts(from: string, to: string): Observable<PostDTO[]> {
    if (Number.isInteger(Number(from) && Number.isInteger(Number(to)))) {
      // const a = await lastValueFrom(
      //   this.httpService.get('https://jsonplaceholder.typicode.com/posts').pipe(
      //     catchError((error) => {
      //       throw new BadRequestException(error);
      //     }),
      //     map((el) => {
      //       return el.data
      //         .map((el) => (el.id >= 2 && el.id <= 5 ? el : null))
      //         .filter((el) => el !== null);
      //     }),
      //   ),
      // );
      // return a;
      return this.httpService
        .get('https://jsonplaceholder.typicode.com/posts')
        .pipe(
          catchError((error) => {
            throw new BadRequestException(error);
          }),
          map((response) => {
            return response.data
              .map((post: PostDTO) =>
                post.id >= Number(from) && post.id <= Number(to) ? post : null,
              )
              .filter((post: PostDTO) => post !== null);
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
            .map((post: PostDTO) =>
              post.id >= BoundaryCondition.FROM &&
              post.id <= BoundaryCondition.TO
                ? post
                : null,
            )
            .filter((post: PostDTO) => post !== null);
        }),
      );
  }

  /**
   * The function for getting post by id.
   * @param id - The param for getting post by id.
   * @returns the post by id.
   */
  getPost(id: string): Observable<PostDTO> {
    if (Number.isInteger(Number(id))) {
      return this.httpService
        .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
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
