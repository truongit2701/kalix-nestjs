import { Body, Controller, Post, HttpStatus, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { BaseResponse } from 'src/repsonse/exceptions/base-reponse';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUpAccount(@Res() res: any, @Body() body: any) {
    const signup = await this.authService.signUp(body.email);
    return res.status(HttpStatus.OK).send(new BaseResponse({}));
  }

  @Post('/signin')
  async Login(@Res() res: any, @Body() body: any) {
    const { email, password } = body;
    const account = await this.authService.signIn(body);
    return res.status(HttpStatus.OK).send(new BaseResponse({}));
  }
}
