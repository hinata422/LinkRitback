import { Injectable } from '@nestjs/common';
import { EventRepository } from '../repository/event/event.repo';

@Injectable()
export class EventService {
  constructor(private readonly eventRepo: EventRepository) {}

  async getAll() {
    return await this.eventRepo.findAll();
  }

  async get(event_id: number) {
    return await this.eventRepo.findById(event_id);
  }
}