import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ChallengeParticipantService } from './challenge-participant.service';
import { CreateChallengeParticipantDto } from './dto/create-challenge-participant.dto';
import { UpdateChallengeParticipantDto } from './dto/update-challenge-participant.dto';
import { BasePaginationDto } from 'src/common/common.dto';

@Controller('challenge-participant')
export class ChallengeParticipantController {
  constructor(
    private readonly challengeParticipantService: ChallengeParticipantService,
  ) {}

  @Post()
  create(@Body() dto: CreateChallengeParticipantDto) {
    return this.challengeParticipantService.create(dto);
  }

  @Get()
  findAll(@Query() query: BasePaginationDto) {
    return this.challengeParticipantService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.challengeParticipantService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateChallengeParticipantDto) {
    return this.challengeParticipantService.update(id, dto);
  }
}
