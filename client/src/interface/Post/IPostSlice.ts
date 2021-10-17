import { IPost } from './IPost';

/**
 * Interface for redux post-slice.
 */
export interface IPostSlice {
  posts: IPost[];
  currentPage: number;
  allPages: number;
  postById: IPost;
}
