import { Injectable } from '@nestjs/common';
import { UserRepositoryImpl } from '../repository/user/psql/user.repo.impl';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepositoryImpl) {}

  // 初回ログイン判定API
  async checkUser(sub: string) {
    const user = await this.userRepo.findBySub(sub);
    return { exists: !!user };
  }

  async createUser(data: any) {
    return await this.userRepo.create(data);
  }

  async getUser(sub: string) {
    return await this.userRepo.findBySub(sub);
  }

  async updateUser(sub: string, data: any) {
    return await this.userRepo.update(sub, data);
  }
}