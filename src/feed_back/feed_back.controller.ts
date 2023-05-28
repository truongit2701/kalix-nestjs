import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { FeedBackService } from './feed_back.service';
import { CreateFeedBackDto } from './dto/create-feed_back.dto';
import { BaseResponse } from 'src/repsonse/exceptions/base-reponse';

@Controller('feed-back')
export class FeedBackController {
  constructor(private readonly feedBackService: FeedBackService) {}

  @Post('create')
  async create(
    @Query() query: any,
    @Body() body: CreateFeedBackDto,
    @Res() res: any,
  ) {
    await this.feedBackService.create(query.product_id, body);
    return res.status(HttpStatus.OK).send(new BaseResponse({}));
  }
}
