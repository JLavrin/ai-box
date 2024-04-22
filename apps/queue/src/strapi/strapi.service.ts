import { Injectable, Logger } from '@nestjs/common';
import axios, { Axios } from 'axios';
import { ConfigService } from 'src/common/config/config.service';
import * as FormData from 'form-data';

@Injectable()
export class StrapiService {
  private readonly strapiClient: Axios;
  private readonly logger = new Logger(StrapiService.name);

  constructor(private readonly configService: ConfigService) {
    this.strapiClient = axios.create({
      baseURL: this.configService.get('STRAPI_HOSTNAME'),
      headers: {
        Authorization: `Bearer ${this.configService.get('STRAPI_TOKEN')}`,
      },
    });
  }

  public async createArticle(title: string, content: string) {
    try {
      const post = await this.strapiClient.post('/api/posts', {
        data: {
          title,
          content,
        },
      });

      return post.data.data.id;
    } catch (e) {
      this.logger.error(e);
    }
  }

  public async uploadImage(formData: FormData) {
    try {
      await this.strapiClient.post('/api/upload', formData, {
        maxBodyLength: Infinity,
        headers: {
          'Content-Type': 'multipart/form-data',
          ...formData.getHeaders(),
        },
      });
    } catch (e) {
      this.logger.error(e);
    }
  }

  public async deleteDraft(id: string) {
    try {
      await this.strapiClient.delete(`/api/drafts/${id}`);
    } catch (e) {
      this.logger.error(e);
    }
  }
}
