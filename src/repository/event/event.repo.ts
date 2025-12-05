export interface EventRepository {
  bulkUpsert(events: any[]): Promise<void>;
  findAll(): Promise<any[]>;
  findById(event_id: string): Promise<any>;
}