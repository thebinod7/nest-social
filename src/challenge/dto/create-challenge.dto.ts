import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNumber, IsString } from 'class-validator';
import { VISIBILITY_ENUM } from 'src/constants/enum';

export class CreateChallengeDto {
  @IsString()
  @ApiProperty({
    example: 'Kickstart Challenge',
  })
  title: string;

  @IsString()
  @ApiProperty({
    example: 'This is a challenge description.',
  })
  description: string;

  @ApiProperty({
    example: 'PUBLIC',
  })
  @IsEnum(VISIBILITY_ENUM)
  visibility: VISIBILITY_ENUM;

  @IsNumber()
  @ApiProperty({
    example: 5,
  })
  durationDays: number;

  @IsDateString({ strict: true })
  @ApiProperty({
    example: '2023-10-01',
    description: 'Date in YYYY-MM-DD format',
    type: String,
    format: 'date',
  })
  startDate: string;

  @IsDateString({ strict: true })
  @ApiProperty({
    example: '2023-10-01',
    description: 'Date in YYYY-MM-DD format',
    type: String,
    format: 'date',
  })
  endDate: string;

  @IsString()
  @ApiProperty({
    example: 'cmaepokmm0001a5tyvcheqqj0',
    description: 'Category ID',
  })
  categoryId: string;

  @IsString()
  @ApiProperty({
    example: 'cmaepor3n0003a5tyzb577559',
    description: 'Creator ID',
  })
  creatorId: string;
}
