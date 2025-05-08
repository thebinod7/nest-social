import { Module } from '@nestjs/common';
import { ChallengeParticipantService } from './challenge-participant.service';
import { ChallengeParticipantController } from './challenge-participant.controller';

@Module({
  controllers: [ChallengeParticipantController],
  providers: [ChallengeParticipantService],
})
export class ChallengeParticipantModule {}
