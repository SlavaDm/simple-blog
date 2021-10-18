import { PostDTO } from '../dto/post.dto';

import { IPost } from '../interface/Post/IPost';

/**
 * Mapper for transform data.
 */
export class PostMapper {
  /**
   * The method for transforming post data from server to client format.
   * @param postDTO the post from server.
   * @returns the post with client keys.
   */
  public static postFromDTO(postDTO: PostDTO): IPost {
    const post: IPost = {
      id: postDTO.id,
      userId: postDTO.userId,
      title: postDTO.title,
      body: postDTO.body,
    };

    return post;
  }

  /**
   * The method for transforming posts data from server to client format.
   * @param PostDTO the post array from server.
   * @returns the post array with post with client keys.
   */
  public static postsFromDTO(postsDTO: PostDTO[]): IPost[] {
    const posts: IPost[] = postsDTO.map((postDTO: PostDTO) => {
      return {
        id: postDTO.id,
        userId: postDTO.userId,
        title: postDTO.title,
        body: postDTO.body,
      };
    });

    return posts;
  }
}
