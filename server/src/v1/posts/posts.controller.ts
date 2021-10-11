import { Controller, Get, Param, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PostDTO } from 'src/dto/post.dto';
import { PostsService } from './posts.service';

/**
 * The controller for getting data about posts from JSONPlaceHolder API.
 */
@Controller('v1/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  /**
   * The method gets posts by query params. If "from", "to" don't exist - use default params.
   * @returns the array with posts.
   */
  private getPosts(
    @Query('from') from: string,
    @Query('to') to: string,
  ): Observable<PostDTO[]> {
    return this.postsService.getPosts(from, to);
  }

  /**
   * The method gets count of the posts.
   * @returns the count of the posts.
   */
  @Get('count')
  private getCountOfThePosts(): Observable<number> {
    return this.postsService.getCountOfThePosts();
  }

  /**
   * The method for getting post by id.
   * @param id - The param for getting post by id.
   * @returns the post by id.
   */
  @Get(':id')
  private getPost(@Param('id') id: string): Observable<PostDTO> {
    return this.postsService.getPost(id);
  }
}
