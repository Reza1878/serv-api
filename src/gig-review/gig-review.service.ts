import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGigReview } from './types';

@Injectable()
export class GigReviewService {
  constructor(private prisma: PrismaService) {}

  async create(gigReview: CreateGigReview) {
    const review = await this.prisma.gigReview.create({
      data: gigReview,
    });

    return review;
  }
}
