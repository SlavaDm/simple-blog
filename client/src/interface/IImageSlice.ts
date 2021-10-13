import { ImageDTO } from '../dto/image.dto';

export interface IImageSlice {
  images: ImageDTO[] | null;
  currentPage: number;
  allPages: null | number;
}
