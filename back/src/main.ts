import * as express from 'express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use('/images', express.static('uploads'));

  // تفعيل CORS
  app.enableCors({
    origin: 'https://full-stack-e-commerce-liard.vercel.app', // عنوان Frontend (Vite)
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT ?? 4000);
  console.log(`Server is running on port ${process.env.PORT ?? 4000}`);
}
bootstrap().catch((error) => {
  // Surface bootstrap failures and terminate with non-zero exit code.
  console.error('Application failed to start:', error);
  process.exit(1);
});
