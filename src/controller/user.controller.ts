import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { UserService } from '../service/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 初回ログイン判定API
  @Get('check/:sub')
  async check(@Param('sub') sub: string) {
    return await this.userService.checkUser(sub);
  }

  @Post()
  async create(@Body() body: any) {
    return await this.userService.createUser(body);
  }

  @Get(':sub')
  async getOne(@Param('sub') sub: string) {
    return await this.userService.getUser(sub);
  }

  @Put(':sub')
  async update(@Param('sub') sub: string, @Body() body: any) {
    return await this.userService.updateUser(sub, body);
  }
}