import { Module } from '@nestjs/common';
import { QueueService } from 'src/queue/queue.service';
import { QueueController } from 'src/queue/queue.controller';
import { BullModule } from '@nestjs/bull';
import { QueueProcessor } from 'src/queue/queue.processor';
import { OpenApiModule } from 'src/open-api/open-api.module';
import { StrapiModule } from 'src/strapi/strapi.module';

@Module({
  imports: [
    StrapiModule,
    OpenApiModule,
    BullModule.registerQueue({
      name: 'posts',
    }),
  ],
  controllers: [QueueController],
  providers: [QueueService, QueueProcessor],
})
export class QueueModule {}
