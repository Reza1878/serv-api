import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GigDto } from './dto';
import { convertToSlug } from 'src/utils/generator';
import { User } from '@prisma/client';

@Injectable()
export class GigService {
  constructor(private prisma: PrismaService) {}

  async create(user: User, dto: GigDto) {
    const { perks, sellerPerks, images, taglines, ...restItems } = dto;

    const gig = await this.prisma.gig.create({
      data: {
        slug: convertToSlug(`${user.name} ${restItems.title} ${Date.now()}`),
        sellerId: user.id,
        ...restItems,
        images: {
          createMany: {
            data: images.map((image) => ({
              image,
            })),
          },
        },
        perks: {
          createMany: {
            data: perks.map((perk) => ({
              perk,
            })),
          },
        },
        taglines: {
          createMany: {
            data: taglines.map((tagline) => ({ tagline })),
          },
        },
        sellerPerks: {
          createMany: {
            data: sellerPerks.map((perk) => ({ perk })),
          },
        },
      },
    });

    return gig;
  }

  async getBySlug(slug: string) {
    const gig = await this.prisma.gig.findFirst({
      where: {
        slug,
      },
    });

    return gig;
  }

  async getById(id: number) {
    const gig = await this.prisma.gig.findFirst({
      where: {
        id,
      },
    });

    return gig;
  }

  async update(gigId: number, user: User, dto: GigDto) {
    const { perks, sellerPerks, images, taglines, ...restItems } = dto;

    const gig = await this.getById(gigId);

    let slug = gig.slug;

    if (gig.title !== restItems.title) {
      slug = convertToSlug(`${user.name} ${restItems.title} ${Date.now()}`);
    }

    await this.prisma.$transaction([
      this.prisma.gig.update({
        where: {
          id: gigId,
        },
        data: {
          slug,
          ...restItems,
        },
      }),
      // Gig Image
      this.prisma.gigImage.deleteMany({
        where: {
          gigId,
        },
      }),
      this.prisma.gigImage.createMany({
        data: images.map((image) => ({ image, gigId })),
      }),
      // Gig Perks
      this.prisma.gigPerk.deleteMany({
        where: { gigId },
      }),
      this.prisma.gigPerk.createMany({
        data: perks.map((perk) => ({ perk, gigId })),
      }),
      // Gig Seller Perks
      this.prisma.gigSellerPerk.deleteMany({ where: { gigId } }),
      this.prisma.gigSellerPerk.createMany({
        data: sellerPerks.map((perk) => ({ perk, gigId })),
      }),
      // Taglines
      this.prisma.gigTagline.deleteMany({ where: { gigId } }),
      this.prisma.gigTagline.createMany({
        data: taglines.map((tagline) => ({ tagline, gigId })),
      }),
    ]);
  }

  async activate(gigId: number) {
    await this.prisma.gig.update({
      where: {
        id: gigId,
      },
      data: {
        isActive: 1,
      },
    });
  }

  async deactivate(gigId: number) {
    await this.prisma.gig.update({
      where: {
        id: gigId,
      },
      data: {
        isActive: 0,
      },
    });
  }

  async getAll(
    payload: {
      limit?: number;
      sellerId?: number;
      title?: string;
      start?: number;
      withTrashed?: boolean;
    } = {},
  ) {
    const { start, limit, sellerId, title, withTrashed } = payload;
    const params = [];

    if (title)
      params.push({
        title: { contains: title, mode: 'insensitive' },
      });

    if (!withTrashed) {
      params.push({
        isActive: 1,
      });
    }

    const gigs = await this.prisma.gig.findMany({
      take: limit ? limit : undefined,
      skip: start,
      where: {
        sellerId,
        AND: params,
      },
      include: {
        images: {
          select: {
            image: true,
          },
          take: 1,
        },
      },
    });

    const ids = gigs.map((g) => g.id);

    const reviews = await this.prisma.gigReview.groupBy({
      by: ['gigId'],
      where: {
        gigId: {
          in: ids,
        },
      },
      _avg: {
        rating: true,
      },
      _count: {
        gigId: true,
      },
    });

    const data = gigs.map((gig) => {
      const currReview = reviews.filter((r) => r.gigId === gig.id)[0];
      const rating = currReview?._avg?.rating || 0;
      const totalReview = currReview?._count?.gigId || 0;
      return {
        ...gig,
        rating,
        totalReview,
      };
    });

    return data;
  }
}
