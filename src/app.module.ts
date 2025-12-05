import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { UserRepositoryImpl } from './repository/user/psql/user.repo.impl';

import { EventController } from './controller/event.controller';
import { EventService } from './service/event.service';
import { EventRepositoryImpl } from './repository/event/psql/event.repo.impl';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ← これで全ファイルから.env が使える
    }),
  ],
  controllers: [UserController, EventController],
  providers: [
    UserService,
    UserRepositoryImpl,
    EventService,
    EventRepositoryImpl,
  ],
})
export class AppModule {}