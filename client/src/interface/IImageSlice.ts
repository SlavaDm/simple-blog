import { ImageDTO } from '../dto/image.dto';

/**
 * Interface for redux image-slice.
 */
export interface IImageSlice {
  images: ImageDTO[] | null;
  currentPage: number;
  allPages: null | number;
}
