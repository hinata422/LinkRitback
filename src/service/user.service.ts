import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user/user.repo';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {
    this.userRepo = userRepo;
  }

  // 初回ログイン判定API
  async check(auth0Id: number) {
    const user = await this.userRepo.findById(auth0Id);
    return { exists: !!user };
  }

  async create(data: any) {
    return await this.userRepo.create(data);
  }

  async get(auth0Id: number) {
    return await this.userRepo.findById(auth0Id);
  }

  async update(auth0Id: number, data: any) {
    return await this.userRepo.update(auth0Id, data);
  }
}