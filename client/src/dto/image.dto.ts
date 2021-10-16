/**
 * Class DTO for describing values from server.
 */
export class ImageDTO {
  readonly id!: number;
  readonly albumId!: number;
  readonly title!: string;
  readonly url!: string;
  readonly thumbnailUrl!: string;
}
