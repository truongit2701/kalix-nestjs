import { Injectable } from '@nestjs/common';
import { CreateFeedBackDto } from './dto/create-feed_back.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Feedback } from './entities/feed_back.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FeedBackService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepo: Repository<Feedback>,
  ) {}
  async create(product_id: number, body: CreateFeedBackDto) {
    return await this.feedbackRepo
      .create({
        product: { id: product_id },
        ...body,
      })
      .save();
  }
}
