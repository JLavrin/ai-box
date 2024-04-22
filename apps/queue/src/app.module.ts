import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QueueModule } from 'src/queue/queue.module';
import { BullModule } from '@nestjs/bull';
import { OpenApiModule } from 'src/open-api/open-api.module';
import { ConfigModule } from 'src/common/config/config.module';
import { StrapiModule } from 'src/strapi/strapi.module';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    QueueModule,
    OpenApiModule,
    ConfigModule,
    StrapiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
