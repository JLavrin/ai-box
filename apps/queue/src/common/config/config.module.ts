import { Module } from '@nestjs/common'
import { ConfigService } from './config.service'
import { ConfigModule as ConfigModuleBase } from '@nestjs/config'

@Module({
  imports: [ConfigModuleBase.forRoot({})],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
