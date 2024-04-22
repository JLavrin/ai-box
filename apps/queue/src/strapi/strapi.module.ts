import { Module } from '@nestjs/common';
import { StrapiService } from 'src/strapi/strapi.service';
import { ConfigModule } from 'src/common/config/config.module';

@Module({
  imports: [ConfigModule],
  providers: [StrapiService],
  exports: [StrapiService],
})
export class StrapiModule {}
