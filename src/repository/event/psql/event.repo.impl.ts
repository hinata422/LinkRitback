import { Injectable } from '@nestjs/common';
import { supabaseClient } from '../../../lib/supabase/supabase.client';

@Injectable()
export class EventRepositoryImpl {
  private supabase = supabaseClient(); // ← ここに移動（必須）

  async findAll() {
    const { data, error } = await this.supabase
      .from('events')
      .select('*');

    if (error) throw error;
    return data;
  }

  async findById(event_id: string) {
    const { data, error } = await this.supabase
      .from('events')
      .select('*')
      .eq('event_id', event_id)
      .single();

    if (error) throw error;
    return data;
  }
}