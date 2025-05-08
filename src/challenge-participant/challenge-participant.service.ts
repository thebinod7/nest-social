import { Injectable } from '@nestjs/common';
import { CreateChallengeParticipantDto } from './dto/create-challenge-participant.dto';
import { UpdateChallengeParticipantDto } from './dto/update-challenge-participant.dto';
import { PrismaService } from 'src/database/prisma.service';
import { paginate } from 'src/utils/paginate';
import { BasePaginationDto } from 'src/common/common.dto';
import { DEFAULT_PAGE_SIZE } from 'src/constants/contants';

@Injectable()
export class ChallengeParticipantService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateChallengeParticipantDto) {
    return this.prisma.challengeParticipant.create({
      data: dto,
    });
  }

  findAll(query: BasePaginationDto) {
    const { page, perPage, search } = query;
    const filter = {};
    if (search) {
      filter['userId'] = search;
    }

    return paginate(
      this.prisma.challengeParticipant,
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
    return this.prisma.challengeParticipant.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, dto: UpdateChallengeParticipantDto) {
    return this.prisma.challengeParticipant.update({
      where: {
        id,
      },
      data: dto,
    });
  }
}
