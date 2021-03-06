/**
 * Class DTO for describing values from server.
 */
export class PostDTO {
  readonly userId!: number;
  readonly id!: number;
  readonly title!: string;
  readonly body!: string;
}
