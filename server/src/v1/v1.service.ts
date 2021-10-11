import { Injectable } from '@nestjs/common';

/**
 * The service for v1 of the REST API.
 */
@Injectable()
export class V1Service {
  /**
   * The method gets info about the version api.
   * @returns the description about the version api.
   */
  public getInfo(): string {
    return 'the first version of the rest api';
  }
}
