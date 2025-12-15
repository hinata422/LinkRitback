 import { SupabaseClient } from '@supabase/supabase-js';
export abstract class UserRepository  {
  protected client: SupabaseClient;
  constructor(supabaseClient: SupabaseClient){
    this.client = supabaseClient;
  };
  abstract create(user: any): Promise<any>;
  abstract findByAuth0Id(id: string): Promise<any>;
  abstract update(id: string, data: any): Promise<any>;
}