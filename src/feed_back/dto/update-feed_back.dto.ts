import { PartialType } from '@nestjs/mapped-types';
import { CreateFeedBackDto } from './create-feed_back.dto';

export class UpdateFeedBackDto extends PartialType(CreateFeedBackDto) {}
