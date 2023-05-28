import { Module } from '@nestjs/common';
import { FeedBackService } from './feed_back.service';
import { FeedBackController } from './feed_back.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from './entities/feed_back.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Feedback])],
  controllers: [FeedBackController],
  providers: [FeedBackService]
})
export class FeedBackModule {}
