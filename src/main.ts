import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const docConfig = new DocumentBuilder()
    .setTitle('Coupon Service')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, docConfig);
  SwaggerModule.setup('/docs', app, document, {
    swaggerOptions: {
      docExpansion: 'list',
      defaultModelsExpandDepth: 99, // Schemas 섹션 펼침
      defaultModelExpandDepth: 99,  // 요청/응답 본문의 스키마 펼침
      displayRequestDuration: true
    }
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
