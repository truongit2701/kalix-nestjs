import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginUserResponse } from 'src/repsonse/user-login.response';
import { UserService } from 'src/user/user.service';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';

const nodeBase64 = require('nodejs-base64-converter');

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly mailService: MailerService,
    private jwtService: JwtService,
    @InjectRepository(Auth)
    private readonly authRepo: Repository<Auth>,
  ) {}

  async signUp(email: string) {
    try {
      let password = '';
      function generateRandomString() {
        const characters =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < 8; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * charactersLength),
          );
        }
        password = result;
        return result;
      }
      await this.mailService.sendMail({
        to: email,
        subject: 'Kalix gửi thông báo!',
        html: `<div style='width:600px;height:400px;background-color:#a8deff;margin: 20px auto;text-align:center;padding:25px'><img src='https://cdn.shopify.com/s/files/1/0583/3690/3348/files/Favicon_Kalix.png?v=1671700968' style='width:100px' /><h1> Đây là mật khẩu đăng nhập của bạn: </h1> <h2> ${generateRandomString()} <h2> </div>`,
      });
      const newUser = {
        email: email,
        password: nodeBase64.encode(password),
        address: '',
        name: '',
        is_admin: 0,
      };
      await this.userService.createUser(newUser);

      return { status: 200, message: 'success', data: null };
    } catch (error) {
      console.log(error);
    }
  }

  async signIn(body: any) {
    const user = await this.userService.findUser(body);
    if (
      nodeBase64.decode(user.password) !== body.password &&
      user.email !== body.email
    )
      return;

    const authUser = await this.authRepo.findOne({
      where: {
        user: { id: user.id },
      },
    });
    console.log(authUser);

    if (!authUser) {
      await this.authRepo
        .create({
          email: body?.email,
          access_token: '',
          is_login: 0,
          user: { id: user.id },
        })
        .save();
    }

    if (authUser?.is_login) return LoginUserResponse.mapToList(user);

    const payload = { meial: user.email, sub: user.id };
    const access_token = await this.jwtService.signAsync(payload);
    await this.authRepo.update(
      {
        user: { id: user.id },
      },
      {
        access_token: access_token,
        is_login: 1,
      },
    );
    return LoginUserResponse.mapToList(user);
  }
}
