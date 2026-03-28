import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService)

  app.enableCors({
    origin: config.get('FRONTEND_URL'),
    credentials:true
  })

  app.use(cookieParser())
  // app.useGlobalFilters(new HttpExceptionFilter());

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist:true,
  //     forbidNonWhitelisted:true,
  //     transform:true
  //   })
  // )

  await app.listen(config.get('PORT') || 3000);
}
bootstrap();
