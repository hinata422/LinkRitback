import { Inject, Injectable } from '@nestjs/common';
import { EventRepository } from '../repository/event/event.repo';
import { TYPES } from '../../common/Types';

@Injectable()
export class EventService {
  constructor(
    @Inject(TYPES.EventRepository)
    private readonly eventRepo: EventRepository,
  ) {}
  async getAll() {
    return await this.eventRepo.findAll();
  }

  async get(event_id: number) {
    return await this.eventRepo.findById(event_id);
  }
}