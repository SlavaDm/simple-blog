import axios from 'axios';

import { ImageMapper } from '../mapper/image.mapper';

import { ImageDTO } from '../dto/image.dto';

import { ServerVariables } from '../enum/ServerVariables';

import { IImage } from '../interface/Image/IImage';

/**
 * Service for working with images by server api.
 */
export class ImagesService {
  /**
   * The function for getting images.
   * @param from left boundary condition for pagination.
   * @param to right boundary condition for pagination.
   * @returns the array with images.
   */
  public static async getImages(from: number, to: number): Promise<IImage[]> {
    try {
      const images = await axios.get<ImageDTO[]>(
        `${ServerVariables.HOST}/v1/images?from=${from}&to=${to}`
      );

      return ImageMapper.imagesFromDTO(images.data);
    } catch (_) {
      return [] as IImage[];
    }
  }

  /**
   * The function is getting count of the images.
   * @returns the count of the all images.
   */
  public static async getCountOfTheImages(): Promise<number> {
    try {
      const count = await axios.get<number>(
        `${ServerVariables.HOST}/v1/images/count`
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
   * The function for getting image by id.
   * @param id search param for find the image.
   * @returns the object with image info.
   */
  public static async getImage(id: number): Promise<IImage> {
    try {
      const image = await axios.get<ImageDTO>(
        `${ServerVariables.HOST}/v1/images/${id}`
      );

      return ImageMapper.imageFromDTO(image.data);
    } catch (_) {
      return {} as IImage;
    }
  }
}
