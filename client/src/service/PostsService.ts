import axios from 'axios';

import { PostMapper } from '../mapper/post.mapper';

import { PostDTO } from '../dto/post.dto';

import { ServerVariables } from '../enum/ServerVariables';

import { IPost } from '../interface/Post/IPost';

/**
 * Service for working with posts by server api.
 */
export class PostsService {
  /**
   * The function for getting posts.
   * @param from left boundary condition for pagination.
   * @param to right boundary condition for pagination.
   * @returns the array with posts.
   */
  public static async getPosts(from: number, to: number): Promise<IPost[]> {
    try {
      const posts = await axios.get<PostDTO[]>(
        `${ServerVariables.HOST}/v1/posts?from=${from}&to=${to}`
      );

      return PostMapper.postsFromDTO(posts.data);
    } catch (_) {
      return [] as IPost[];
    }
  }

  /**
   * The function is getting count of the posts.
   * @returns the count of the all posts.
   */
  public static async getCountOfThePosts(): Promise<number> {
    try {
      const count = await axios.get<number>(
        `${ServerVariables.HOST}/v1/posts/count`
      );

      if (typeof count.data === 'number') {
        return count.data;
      }

      return 0;
    } catch (_) {
      return 0;
    }
  }

  /**
   * The function for getting post by id.
   * @param id search param for find the post.
   * @returns the object with post info.
   */
  public static async getPost(id: number): Promise<IPost> {
    try {
      const posts = await axios.get<PostDTO>(
        `${ServerVariables.HOST}/v1/posts/${id}`
      );

      return PostMapper.postFromDTO(posts.data);
    } catch (_) {
      return {} as IPost;
    }
  }
}
