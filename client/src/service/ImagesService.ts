import axios from 'axios';
import { ImageDTO } from '../dto/image.dto';
import { ServerVariables } from '../enum/ServerVariables';

export class ImagesService {
  static async getImages(from: number, to: number): Promise<ImageDTO[]> {
    try {
      const images = await axios.get<ImageDTO[]>(
        `${ServerVariables.HOST}/v1/images?from=${from}&to=${to}`
      );

      return images.data;
    } catch (e) {
      return [];
    }
  }

  static async getCountOfTheImages(): Promise<number> {
    try {
      const count = await axios.get<number>(
        `${ServerVariables.HOST}/v1/images/count`
      );

      if (typeof count.data === 'number') {
        return count.data;
      }

      return 0;
    } catch (e) {
      return 0;
    }
  }

  static async getImage(id: number): Promise<ImageDTO> {
    try {
      const image = await axios.get<ImageDTO>(
        `${ServerVariables.HOST}/v1/images/${id}`
      );

      return image.data;
    } catch (e) {
      return { id: -1, title: '', thumbnailUrl: '', url: '', albumId: -1 };
    }
  }
}