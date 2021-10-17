import { ImageDTO } from '../dto/image.dto';

import { IImage } from '../interface/Image/IImage';

export class ImageMapper {
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
