import { Injectable } from '@nestjs/common';

/**
 * The service for v1 of the REST API.
 */
@Injectable()
export class V1Service {
  getInfo(): string {
    return 'the first version of the rest api';
  }
}
