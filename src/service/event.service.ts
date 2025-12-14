import { Injectable } from '@nestjs/common';
import { EventRepositoryImpl } from '../repository/event/psql/event.repo.impl';

@Injectable()
export class EventService {
  constructor(private readonly eventRepo: EventRepositoryImpl) {}

  async getAllEvents() {
    return await this.eventRepo.findAll();
  }

  async getEventDetail(event_id: number) {
    return await this.eventRepo.findById(event_id);
  }
}