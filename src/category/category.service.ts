import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/database/prisma.service';
import { BasePaginationDto } from 'src/common/common.dto';
import { paginate } from 'src/utils/paginate';
import { DEFAULT_PAGE_SIZE } from 'src/constants/contants';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}
  create(dto: CreateCategoryDto) {
    return this.prisma.category.create({
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
      this.prisma.category,
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
    return this.prisma.category.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, dto: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: {
        id,
      },
      data: dto,
    });
  }
}
