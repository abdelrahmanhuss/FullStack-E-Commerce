import { VercelNestAdapter } from '@vercel/nest';
import { AppModule } from './app.module';

export default VercelNestAdapter(AppModule, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  },
  globalPipes: [
    {
      pipe: 'ValidationPipe',
      options: {
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      },
    },
  ],
});
