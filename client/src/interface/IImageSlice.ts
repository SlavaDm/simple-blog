import { ImageDTO } from '../dto/image.dto';

export interface IImageSlice {
  images: ImageDTO[];
  currentPage: number;
  allPages: null | number;
}