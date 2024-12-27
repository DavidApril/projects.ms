import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamsController } from './teams.controller';
import { Team, TeamMembership } from './entities';
import { TeamsService } from './teams.service';
import { Project } from 'src/projects/entities';
import { NatsModule } from 'src/transports';

@Module({
  imports: [
    TypeOrmModule.forFeature([Team, TeamMembership, Project]),
    NatsModule,
  ],
  controllers: [TeamsController],
  providers: [TeamsService],
  exports: [TypeOrmModule, TeamsService],
})
export class TeamsModule {}
