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

  // @Get()
  // getPosts(@Query('from') from: string, @Query('to') to: string): any {
  //   return this.postsService.getPosts(from, to);
  // }
  @Get()
  getPosts(
    @Query('from') from: string,
    @Query('to') to: string,
  ): Observable<PostDTO[]> {
    return this.postsService.getPosts(from, to);
  }

  @Get('count')
  getCountOfThePosts(): Observable<number> {
    return this.postsService.getCountOfThePosts();
  }

  @Get(':id')
  getPost(@Param('id') id: string): Observable<PostDTO> {
    return this.postsService.getPost(id);
  }
}
