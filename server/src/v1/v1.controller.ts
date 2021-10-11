import { Controller, Get } from '@nestjs/common';
import { V1Service } from './v1.service';

/**
 * The controller for describing goal of the version this REST API.
 */
@Controller('v1')
export class V1Controller {
  constructor(private readonly v1Service: V1Service) {}

  @Get()
  /**
   * The method gets info about the version api.
   * @returns the description about the version api.
   */
  private getInfo() {
    return this.v1Service.getInfo();
  }
}
