import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common'
import { QueueService }                                                           from 'src/queue/queue.service'
import { every }                                                                  from 'rxjs'

@Controller('queue')
export class QueueController {
  constructor(private readonly queueService: QueueService) {
  }

  @Post()
  create(@Body() body: any) {

    if (body.event !== 'entry.create') {
      return
    }

    if (!body.entry) {
      return
    }

    if (body.model !== 'draft') {
      return
    }

    if (!body.entry.title) {
      return
    }

    return this.queueService.create({
      title: body.entry.title,
      id: body.entry.id,
    })
  }
}
