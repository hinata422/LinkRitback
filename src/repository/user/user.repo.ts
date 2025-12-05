export interface UserRepository {
  create(user: any): Promise<any>;
  findById(id: string): Promise<any>;
  update(id: string, data: any): Promise<any>;
}