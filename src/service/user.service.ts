import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user/user.repo';
import { UserRepositoryImpl } from '../repository/user/psql/user.repo.impl';
@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {
    this.userRepo = userRepo;
  }

  // 初回ログイン判定API
  async check(auth0Id: string) {
    const user = await this.userRepo.findByAuth0Id(auth0Id);
    return { exists: !!user };
  }

  async create(data: any) {
    return await this.userRepo.create(data);
  }

  async get(auth0Id: string) {
    return await this.userRepo.findByAuth0Id(auth0Id);
  }

  async update(auth0Id: string, data: any) {
    return await this.userRepo.update(auth0Id, data);
  }
}