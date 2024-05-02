import { Injectable, Logger } from '@nestjs/common'
import OpenAI from 'openai'
import { ConfigService } from 'src/common/config/config.service'
import axios from 'axios'

@Injectable()
export class OpenApiService {
  private readonly openAi: OpenAI
  private readonly logger = new Logger(OpenApiService.name)
  private readonly TEXT_GEN_MODEL: string
  private readonly IMAGE_GEN_MODEL: string
  private readonly IMAGE_SIZE = '1024x1024'

  constructor(private readonly configService: ConfigService) {
    this.openAi = new OpenAI({
      apiKey: this.configService.get('OPENAI_API_TOKEN'),
    })
    this.TEXT_GEN_MODEL = this.configService.get('OPENAI_TEXT_GEN_MODEL')
    this.IMAGE_GEN_MODEL = this.configService.get('OPENAI_IMAGE_GEN_MODEL')
  }

  public async generateContent(title: string) {
    try {
      const completion = await this.openAi.chat.completions.create({
        messages: [
          {
            role: 'user',
            content: `Write about "${title}". Generate it as plain text. Write at least 1000 words.`,
          },
        ],
        model: this.TEXT_GEN_MODEL,
      })

      return completion.choices[0].message.content
    } catch (e) {
      this.logger.error(e)
    }
  }

  public async generateImage(title: string) {
    try {
      const image = await this.openAi.images.generate({
        model: this.IMAGE_GEN_MODEL,
        prompt: title,
        n: 1,
        size: this.IMAGE_SIZE,
      })

      const { data } = await axios.get(image.data[0].url, {
        responseType: 'arraybuffer',
      })

      return data
    } catch (e) {
      this.logger.error(e)
    }
  }
}
