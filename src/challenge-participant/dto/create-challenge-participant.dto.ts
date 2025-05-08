import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateChallengeParticipantDto {
  @IsString()
  @ApiProperty({
    example: 'cmaepor3n0003a5tyzb577559',
    description: 'The ID of the user participating in the challenge',
    required: true,
  })
  userId: string;

  @IsString()
  @ApiProperty({
    example: 'cmaepq9id0003a5xtewoqxagn',
    description: 'The ID of the challenge',
    required: true,
  })
  challengeId: string;
}
