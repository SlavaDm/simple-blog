/**
 * Interface for image.
 */
export interface IImage {
  readonly id: number;
  readonly albumId: number;
  readonly title: string;
  readonly url: string;
  readonly thumbnailUrl: string;
}
