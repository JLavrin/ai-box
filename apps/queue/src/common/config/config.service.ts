import { Injectable } from '@nestjs/common';
import { ConfigService as ConfigServiceBase } from '@nestjs/config';
import { EnvVariable } from 'src/common/config/config.types';

@Injectable()
export class ConfigService {
  constructor(private readonly configServiceBase: ConfigServiceBase) {}

  public get<Key extends keyof EnvVariable>(key: Key): EnvVariable[Key] {
    return this.configServiceBase.get(key, { infer: true });
  }
}
