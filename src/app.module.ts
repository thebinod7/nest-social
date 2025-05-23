import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './database/prisma.module';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';
import { ChallengeModule } from './challenge/challenge.module';
import { ChallengeParticipantModule } from './challenge-participant/challenge-participant.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    CategoryModule,
    UserModule,
    ChallengeModule,
    ChallengeParticipantModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
