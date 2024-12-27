import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TeamsService } from './teams.service';
import {
  AssociateToProjectDto,
  AssociateUserDto,
  CreateTeamDto,
  TeamPaginationDto,
} from './dto';

@Controller('projects')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @MessagePattern('teams.create')
  create(@Payload() createTeamDto: CreateTeamDto) {
    return this.teamsService.createTeam(createTeamDto);
  }

  @MessagePattern('teams.find')
  findTeams(@Payload() teamsPaginationDto: TeamPaginationDto) {
    return this.teamsService.findAllTeams(teamsPaginationDto);
  }

  @MessagePattern('teams.find.one')
  findOne(@Payload() searching_term: string) {
    return this.teamsService.findOne(searching_term);
  }

  @MessagePattern('teams.associate.project')
  associateToProject(associateProjectDto: AssociateToProjectDto) {
    return this.teamsService.associateToProject(associateProjectDto);
  }

  @MessagePattern('teams.associate.user')
  associateUser(associateUser: AssociateUserDto) {
    return this.teamsService.associateUser(associateUser);
  }
}
