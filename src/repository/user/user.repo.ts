 import { SupabaseClient } from '@supabase/supabase-js';
export abstract class UserRepository  {
  protected client: SupabaseClient;
  constructor(supabaseClient: SupabaseClient){
    this.client = supabaseClient;
  };
  abstract create(user: any): Promise<any>;
  abstract findById(id: number): Promise<any>;
  abstract update(id: number, data: any): Promise<any>;
}