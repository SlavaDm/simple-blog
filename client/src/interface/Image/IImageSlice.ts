import { IImage } from './IImage';

/**
 * Interface for redux image-slice.
 */
export interface IImageSlice {
  images: IImage[];
  currentPage: number;
  countOfTheAllPages: number;
  imageById: IImage;
}
