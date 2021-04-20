import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('NPS Swagger')
  .setDescription('The NPS API description')
  .setVersion('1.0')
  .addTag('nps')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);

  // global prefix
  //app.setGlobalPrefix('api')
  app.enableCors({
    origin: [
      'http://172.31.25.78:443',
      'http://localhost:443',
    ],
    credentials: true,
    methods: ['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE'],
  });

  await app.listen(443, () => {
    console.log(`server started listening on ${443}`);
  });
}
bootstrap();
