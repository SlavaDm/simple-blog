import axios from 'axios';
import { PostDTO } from '../dto/post.dto';
import { ServerVariables } from '../enum/ServerVariables';

export class PostsService {
  public static async getPosts(from: number, to: number): Promise<PostDTO[]> {
    try {
      const posts = await axios.get<PostDTO[]>(
        `${ServerVariables.HOST}/v1/posts?from=${from}&to=${to}`
      );

      return posts.data;
    } catch (e) {
      return [];
    }
  }

  public static async getCountOfThePosts(): Promise<number> {
    try {
      const count = await axios.get<number>(
        `${ServerVariables.HOST}/v1/posts/count`
      );

      if (typeof count.data === 'number') {
        return count.data;
      }

      return 0;
    } catch (e) {
      return 0;
    }
  }

  public static async getPost(id: number): Promise<PostDTO> {
    try {
      const posts = await axios.get<PostDTO>(
        `${ServerVariables.HOST}/v1/posts/${id}`
      );

      return posts.data;
    } catch (e) {
      return { userId: -1, id: -1, title: '', body: '' };
    }
  }
}
