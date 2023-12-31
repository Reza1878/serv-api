import {
  Controller,
  UseGuards,
  Get,
  Put,
  Body,
  Post,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { diskStorage } from 'multer';
import * as crypto from 'crypto';
import * as path from 'path';
import { GigService } from 'src/gig/gig.service';
import { UpdateUserDto } from './dto';
import { UserService } from './user.service';
import { GigQueryDto } from 'src/gig/dto';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private gigService: GigService,
  ) {}

  @Get('/me')
  async getMe(@GetUser() user: User) {
    return {
      msg: 'Success get user',
      data: { user },
    };
  }

  @Post('/avatar')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './public/avatar',
        filename(req, file, callback) {
          const ext = path.extname(file.originalname)
            ? path.extname(file.originalname)
            : '.png';

          const fileName = crypto.randomBytes(64).toString('hex');
          callback(null, `${fileName}${ext}`);
        },
      }),
    }),
  )
  async postAvatar(@UploadedFile() file: Express.Multer.File) {
    return {
      msg: 'Success upload avatar',
      data: {
        path: `avatar/${file.filename}`,
      },
    };
  }

  @Put('/profile')
  async updateProfile(@GetUser('id') id: number, @Body() dto: UpdateUserDto) {
    await this.userService.update(id, dto);

    return {
      msg: 'Success update profile',
    };
  }

  @Get('/gig')
  async getUserGig(@GetUser('id') id: number, @Query() dto: GigQueryDto) {
    const data = await this.gigService.getAll({
      ...dto,
      sellerId: id,
      withTrashed: true,
    });

    return {
      msg: 'Success get gig data',
      data,
    };
  }
}
