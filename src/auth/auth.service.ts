import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { SignInDto, SignUpDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  async signUp(dto: SignUpDto) {
    try {
      const password = await bcrypt.hash(dto.password, 10);

      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password,
          name: dto.name,
        },
      });

      delete user.password;

      return this.signToken(user);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credential taken');
        }
      }
      throw error;
    }
  }

  async signIn(dto: SignInDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new ForbiddenException('Credentials is invalid');

    const pwMatches = bcrypt.compare(dto.password, user.password);

    if (!pwMatches) throw new ForbiddenException('Credentials is invalid');

    delete user.password;

    return this.signToken(user);
  }

  async signToken(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwt.sign(payload, {
        expiresIn: '15m',
        secret: this.config.get('JWT_SECRET_KEY'),
      }),
    };
  }
}
