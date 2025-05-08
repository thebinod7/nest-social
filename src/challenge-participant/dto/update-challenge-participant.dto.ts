import { PartialType } from '@nestjs/mapped-types';
import { CreateChallengeParticipantDto } from './create-challenge-participant.dto';

export class UpdateChallengeParticipantDto extends PartialType(CreateChallengeParticipantDto) {}
