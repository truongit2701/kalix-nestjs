import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ExceptionResponse } from 'src/repsonse/exceptions/response.exception';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findUser(body: any) {
    const user = await this.userRepo.findOne({
      where: {
        email: body.email,
      },
    });

    if (!user) throw new ExceptionResponse();

    return user;
  }

  async createUser(body: any) {
    const user = await this.userRepo.create(body);
    await this.userRepo.save(user);
    return user;
  }
}
