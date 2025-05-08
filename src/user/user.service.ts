import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/prisma.service';
import { BasePaginationDto } from 'src/common/common.dto';
import { paginate } from 'src/utils/paginate';
import { DEFAULT_PAGE_SIZE } from 'src/constants/contants';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateUserDto) {
    return this.prisma.user.create({
      data: dto,
    });
  }

  findAll(query: BasePaginationDto) {
    const { page, perPage, search } = query;
    const filter = {};
    if (search) {
      filter['name'] = {
        contains: search,
        mode: 'insensitive',
      };
    }
    return paginate(
      this.prisma.user,
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
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, dto: UpdateUserDto) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: dto,
    });
  }
}
