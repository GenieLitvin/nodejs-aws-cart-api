import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token',
  });
  const PORT = 3001;
  await app.listen(PORT); // Открываем сервер на порту 3000
  console.log(`Application is running on: http://localhost:${PORT}`);
}
bootstrap();
