import { Injectable } from '@nestjs/common';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { PrismaService } from 'src/database/prisma.service';
import { paginate } from 'src/utils/paginate';
import { BasePaginationDto } from 'src/common/common.dto';
import { DEFAULT_PAGE_SIZE } from 'src/constants/contants';

@Injectable()
export class ChallengeService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateChallengeDto) {
    return this.prisma.challenge.create({
      data: {
        ...dto,
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
      },
    });
  }

  findAll(query: BasePaginationDto) {
    const { page, perPage, search } = query;
    const filter = {};
    if (search) {
      filter['title'] = {
        contains: search,
        mode: 'insensitive',
      };
    }
    return paginate(
      this.prisma.challenge,
      {
        where: filter,
      },
      {
        page: page || 1,
        perPage: perPage || DEFAULT_PAGE_SIZE,
      },
    );
  }

  findOne(id: string) {
    return this.prisma.challenge.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, dto: UpdateChallengeDto) {
    return this.prisma.challenge.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    });
  }
}
