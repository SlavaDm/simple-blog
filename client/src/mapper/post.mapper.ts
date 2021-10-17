import { PostDTO } from '../dto/post.dto';

import { IPost } from '../interface/Post/IPost';

export class PostMapper {
  public static postFromDTO(postDTO: PostDTO): IPost {
    const post: IPost = {
      id: postDTO.id,
      userId: postDTO.userId,
      title: postDTO.title,
      body: postDTO.body,
    };

    return post;
  }

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
