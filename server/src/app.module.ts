import { Module } from '@nestjs/common';
import { V1Module } from './v1/v1.module';

/**
 * The module for binding all app modules in 1 place.
 */
@Module({
  imports: [V1Module],
})
export class AppModule {}
