import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-up')
  async signUp(@Body() dto: SignUpDto) {
    const { access_token } = await this.authService.signUp(dto);
    return {
      msg: 'Register success',
      data: { access_token },
    };
  }

  @Post('/sign-in')
  async signIn(@Body() dto: SignInDto) {
    const { access_token } = await this.authService.signIn(dto);
    return {
      data: { access_token },
      msg: 'Sign in success',
    };
  }
}
