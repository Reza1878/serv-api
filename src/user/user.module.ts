import { Module } from '@nestjs/common';
import { GigService } from 'src/gig/gig.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, GigService],
})
export class UserModule {}
