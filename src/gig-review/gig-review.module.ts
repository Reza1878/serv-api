import { Module } from '@nestjs/common';
import { GigReviewService } from './gig-review.service';

@Module({
  providers: [GigReviewService]
})
export class GigReviewModule {}
