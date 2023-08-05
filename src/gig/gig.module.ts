import { Module } from '@nestjs/common';
import { GigReviewService } from 'src/gig-review/gig-review.service';
import { GigService } from './gig.service';
import { GigController } from './gig.controller';

@Module({
  providers: [GigService, GigReviewService],
  controllers: [GigController],
})
export class GigModule {}
