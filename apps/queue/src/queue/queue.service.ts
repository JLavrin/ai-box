import { Injectable }     from '@nestjs/common';
import { InjectQueue }    from '@nestjs/bull'
import { Queue }          from 'bull'

@Injectable()
export class QueueService {
  constructor(@InjectQueue('posts') private readonly postsQueue: Queue) {
  }

  async create(data: any) {
    await this.postsQueue.add('new-post', data)
  }
}
