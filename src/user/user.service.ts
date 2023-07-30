import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async update(id: number, dto: UpdateUserDto) {
    const { experiences, ...restData } = dto;
    console.log({ dto });
    await this.prisma.$transaction([
      this.prisma.user.update({
        where: {
          id,
        },
        data: {
          ...restData,
        },
      }),
      this.prisma.userExperience.deleteMany({
        where: {
          userId: id,
        },
      }),
      this.prisma.userExperience.createMany({
        data: experiences.map((experience) => ({
          userId: id,
          experience,
        })),
      }),
    ]);
  }
}
