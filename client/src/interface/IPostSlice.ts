import { PostDTO } from '../dto/post.dto';

/**
 * Interface for redux post-slice.
 */
export interface IPostSlice {
  posts: PostDTO[];
  currentPage: number;
  allPages: null | number;
  postById: null | PostDTO;
}
