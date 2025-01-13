import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter,NestFastifyApplication} from '@nestjs/platform-fastify';
import fastifyMultipart from '@fastify/multipart';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  app.enableCors(); 

  await app.register(fastifyMultipart as any, {
    limits: {
      fileSize: 5 * 1024 * 1024
    }
  });

  await app.listen(process.env.PORT ?? 3001,'0.0.0.0');
}
bootstrap();
