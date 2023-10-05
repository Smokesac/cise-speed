import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const cors = require('cors');
  app.use(cors());
  app.enableCors();
  await app.listen(5000);
}
bootstrap();
