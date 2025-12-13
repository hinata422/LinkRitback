import { Controller, Get, Param } from '@nestjs/common';
import { EventService } from '../service/event.service';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  async listEvents() {
    return await this.eventService.getAllEvents();
  }

  @Get(':event_id')
  async getEventDetail(@Param('event_id') event_id: string) {
    return await this.eventService.getEventDetail(event_id);
  }
}