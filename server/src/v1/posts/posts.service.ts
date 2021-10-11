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
  /**
   * init HttpService for sending requests.
   */
  constructor(private readonly httpService: HttpService) {}

  /**
   * The method gets posts by query params. If "from", "to" don't exist - use default params.
   * @returns the array with posts.
   */
  public getPosts(from: string, to: string): Observable<PostDTO[]> {
    if (Number.isInteger(Number(from)) && Number.isInteger(Number(to))) {
      return this.httpService
        .get('https://jsonplaceholder.typicode.com/posts')
        .pipe(
          catchError((error) => {
            throw new BadRequestException(error);
          }),
          map((response) => {
            return response.data.filter(
              (post: PostDTO) =>
                post.id >= Number(from) && post.id <= Number(to),
            );
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
          return response.data.filter(
            (post: PostDTO) =>
              post.id >= BoundaryCondition.FROM &&
              post.id <= BoundaryCondition.TO,
          );
        }),
      );
  }

  /**
   * The method gets count of the posts.
   * @returns the count of the posts.
   */
  public getCountOfThePosts(): Observable<number> {
    return this.httpService
      .get('https://jsonplaceholder.typicode.com/posts')
      .pipe(
        catchError((error) => {
          throw new BadRequestException(error);
        }),
        map((response) => Number(response.data.length)),
      );
  }

  /**
   * The method for getting post by id.
   * @param id - The param for getting post by id.
   * @returns the post by id.
   */
  public getPost(id: string): Observable<PostDTO> {
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
