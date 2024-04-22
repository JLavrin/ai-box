import { Module } from '@nestjs/common';
import { OpenApiService } from 'src/open-api/open-api.service';
import { ConfigModule } from 'src/common/config/config.module';

@Module({
  imports: [ConfigModule],
  providers: [OpenApiService],
  exports: [OpenApiService],
})
export class OpenApiModule {}
