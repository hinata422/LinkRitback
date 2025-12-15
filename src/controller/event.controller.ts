import { Controller, Get, Param } from '@nestjs/common';
import { EventService } from '../service/event.service';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  async allEvents() {
    return await this.eventService.getAll();
  }

  @Get(':event_id')
  async get(@Param('event_id') event_id: number) {
    return await this.eventService.get(event_id);
  }
}
