import { PostDTO } from '../dto/post.dto';

export interface IPostSlice {
  posts: PostDTO[] | null;
  currentPage: number;
  allPages: null | number;
  error: null | string;
  status: null | string;
}
