import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './error/http-exception.filter';

/**
 * The function for starting project. App has been started on 4000 port.
 */
(async () => {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://localhost:3000',
      credentials: true,
    },
  });
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(4000);
})();
