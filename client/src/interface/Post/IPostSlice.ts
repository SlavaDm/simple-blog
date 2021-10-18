import { IPost } from './IPost';

/**
 * Interface for redux post-slice.
 */
export interface IPostSlice {
  posts: IPost[];
  currentPage: number;
  countOfTheAllPages: number;
  postById: IPost;
}
