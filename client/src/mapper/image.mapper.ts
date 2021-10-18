import { ImageDTO } from '../dto/image.dto';

import { IImage } from '../interface/Image/IImage';

/**
 * Mapper for transform data.
 */
export class ImageMapper {
  /**
   * The method for transforming image data from server to client format.
   * @param imageDTO the image from server.
   * @returns the image with client keys.
   */
  public static imageFromDTO(imageDTO: ImageDTO): IImage {
    const image: IImage = {
      id: imageDTO.id,
      albumId: imageDTO.albumId,
      title: imageDTO.title,
      url: imageDTO.url,
      thumbnailUrl: imageDTO.thumbnailUrl,
    };

    return image;
  }

  /**
   * The method for transforming images data from server to client format.
   * @param imagesDTO the image array from server.
   * @returns the image array with image with client keys.
   */
  public static imagesFromDTO(imagesDTO: ImageDTO[]): IImage[] {
    const images: IImage[] = imagesDTO.map((imageDTO: ImageDTO) => {
      return {
        id: imageDTO.id,
        albumId: imageDTO.albumId,
        title: imageDTO.title,
        url: imageDTO.url,
        thumbnailUrl: imageDTO.thumbnailUrl,
      };
    });

    return images;
  }
}
