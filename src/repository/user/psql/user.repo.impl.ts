import { Injectable } from '@nestjs/common';
import { SupabaseClient, User } from '@supabase/supabase-js';
import { UserRepository } from '../user.repo';


@Injectable()
export class UserRepositoryImpl extends UserRepository {
  constructor(supabaseClient: SupabaseClient){
    super(supabaseClient);
  }

  async findById(id: number) {
    const { data, error } = await this.client
      .from('users')
      .select('*')
      .eq('auth0Id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async create(user: any) {
    const { data, error } = await this.client
      .from('users')
      .insert(user)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(sub: number, user: any) {
    const { data, error } = await this.client
      .from('users')
      .update(user)
      .eq('auth0Id', sub)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}