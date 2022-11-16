import { NestFactory } from '@nestjs/core';
import { SiteModule } from './site/site.module';

async function bootstrap() {
  const app = await NestFactory.create(SiteModule);
  await app.listen(5000);
}

bootstrap();

// controller -> routing 처리 / return 처리
// module -> 의존성
// service -> 비즈니스 관련 => 실제 로직을 처리한다
