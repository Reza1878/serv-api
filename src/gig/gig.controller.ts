import {
  Controller,
  UseGuards,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Put,
  Param,
  NotFoundException,
  UnauthorizedException,
  Get,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from 'src/auth/guard';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as crypto from 'crypto';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
import { GigDto, GigQueryDto } from './dto';
import { GigService } from './gig.service';
import { GigReviewService } from 'src/gig-review/gig-review.service';
import { GigReviewDto } from 'src/gig-review/dto';

@Controller('gig')
export class GigController {
  constructor(
    private gigService: GigService,
    private gigReviewService: GigReviewService,
  ) {}
  @UseGuards(JwtGuard)
  @Post('/thumbnail')
  @UseInterceptors(
    FileInterceptor('thumbnail', {
      storage: diskStorage({
        destination: './public/thumbnail',
        filename(req, file, callback) {
          const ext = path.extname(file.originalname)
            ? path.extname(file.originalname)
            : '.png';

          const fileName = crypto.randomBytes(64).toString('hex');
          callback(null, `${fileName}${ext}`);
        },
      }),
    }),
  )
  async postThumbnail(@UploadedFile() file: Express.Multer.File) {
    return {
      msg: 'Success upload thumbnail',
      data: {
        path: `thumbnail/${file.filename}`,
      },
    };
  }

  @UseGuards(JwtGuard)
  @Post()
  async createGig(@GetUser() user: User, @Body() dto: GigDto) {
    const { id } = await this.gigService.create(user, dto);

    return {
      msg: 'Success create gig',
      data: { id },
    };
  }

  @UseGuards(JwtGuard)
  @Put('/:id')
  async update(
    @GetUser() user: User,
    @Param('id') id: string,
    @Body() dto: GigDto,
  ) {
    const gig = await this.gigService.getById(+id);
    if (!gig) throw new NotFoundException();

    if (gig.sellerId !== user.id) throw new UnauthorizedException();

    await this.gigService.update(+id, user, dto);

    return {
      msg: 'Success update gig',
      data: null,
    };
  }

  @UseGuards(JwtGuard)
  @Put('/:id/activate')
  async updateStatus(@Param('id') id: string, @GetUser() user: User) {
    const gig = await this.gigService.getById(+id);
    if (!gig) throw new NotFoundException();

    if (gig.sellerId !== user.id) throw new UnauthorizedException();

    if (gig.isActive) {
      await this.gigService.deactivate(+id);
    } else {
      await this.gigService.activate(+id);
    }

    return {
      msg: gig.isActive ? 'Success deactivate gig' : 'Success activate gig',
      data: null,
    };
  }

  @Get()
  async getAll(@Query() dto: GigQueryDto) {
    const gigs = await this.gigService.getAll(dto);

    return {
      msg: 'Success get gigs',
      data: gigs,
    };
  }

  @Get('/:slug')
  async getGigBySlug(@Param('slug') slug: string) {
    const gig = await this.gigService.getBySlug(slug);
    if (!gig) throw new NotFoundException();

    return {
      msg: 'Success get gig',
      data: gig,
    };
  }

  @Post('/:id/review')
  @UseGuards(JwtGuard)
  async createReview(
    @Param('id') id: string,
    @GetUser() user: User,
    @Body() dto: GigReviewDto,
  ) {
    const gig = await this.gigService.getById(+id);
    if (!gig) throw new NotFoundException();

    const gigReviewDto = {
      ...dto,
      userId: user.id,
      gigId: gig.id,
    };

    await this.gigReviewService.create(gigReviewDto);

    return {
      msg: 'Success add review',
      data: null,
    };
  }
}
