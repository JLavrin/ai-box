import { Process, Processor } from '@nestjs/bull'
import { Logger } from '@nestjs/common'
import { Job } from 'bull'
import * as fs from 'fs'
import * as FormData from 'form-data'
import { OpenApiService } from 'src/open-api/open-api.service'
import { StrapiService } from 'src/strapi/strapi.service'

@Processor('posts')
export class QueueProcessor {
  private readonly logger = new Logger(QueueProcessor.name)

  constructor(
    private readonly openApiService: OpenApiService,
    private readonly strapiService: StrapiService,
  ) {}

  @Process('new-post')
  async handleNewPost(job: Job) {
    const start = Date.now()
    console.log('test')
    this.logger.verbose(`Processing job ${job.id} of type ${job.name}`)

    try {
      const completion = await this.openApiService.generateContent(
        job.data.title,
      )
      const image = await this.openApiService.generateImage(job.data.title)

      const tempFileName = `generated_image_${job.id}.jpg`

      fs.writeFileSync(tempFileName, image)

      this.logger.verbose(`Job ${job.id} content generated`)

      const newPostId = await this.strapiService.createArticle(
        job.data.title,
        completion,
      )

      const formData = new FormData()

      formData.append('files', fs.createReadStream(tempFileName))
      formData.append('refId', newPostId)
      formData.append('ref', 'api::post.post')
      formData.append('field', 'image')

      await this.strapiService.uploadImage(formData)

      this.logger.verbose(`Job ${job.id} post sent to strapi`)

      await this.strapiService.deleteDraft(job.data.id)

      fs.unlinkSync(tempFileName)
    } catch (error) {
      this.logger.error(`Job ${job.id} failed`)
    }

    this.logger.verbose(
      `Job ${job.id} completed in ${(Date.now() - start) / 1000} s`,
    )
  }
}
