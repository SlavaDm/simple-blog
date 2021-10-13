import { PostDTO } from '../dto/post.dto';

export interface IPostSlice {
  posts: PostDTO[];
  currentPage: number;
  allPages: null | number;
}
