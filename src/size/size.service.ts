import { Injectable } from '@nestjs/common';
import { CreateSizeDto } from './dto/create-size.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Size } from './entities/size.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SizeService {
  constructor(
    @InjectRepository(Size)
    private readonly sizeRepo: Repository<Size>,
  ) {}
  async create(createSizeDto: CreateSizeDto) {
    return await this.sizeRepo
      .create({
        ...createSizeDto,
      })
      .save();
  }

  async findAllSize() {
    return await this.sizeRepo.find();
  }
}
