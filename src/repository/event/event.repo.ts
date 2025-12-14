import { SupabaseClient } from '@supabase/supabase-js';
export  abstract class EventRepository  {
  protected client: SupabaseClient;
  constructor(supabaseClient: SupabaseClient){
    this.client = supabaseClient;
  };
  abstract bulkInsert(events: any[]): Promise<void>;
  abstract findAll(): Promise<any[]>;
  abstract findById(event_id: number): Promise<any>;
}