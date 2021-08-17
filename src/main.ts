import { NestFactory, NestApplicationContext } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('API do sistema')
    .setDescription('Todos os endpoints da api do sistema')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: [
      'http://localhost:8080',
      'http://localhost:3000'
    ],
    credentials: true
  });
  await app.listen(1234);
}
bootstrap();
