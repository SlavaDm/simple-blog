import { IImage } from './IImage';

/**
 * Interface for redux image-slice.
 */
export interface IImageSlice {
  images: IImage[] | null;
  currentPage: number;
  allPages: number;
}
