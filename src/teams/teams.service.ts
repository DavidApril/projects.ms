import {
  AssociateToProjectDto,
  AssociateUserDto,
  CreateTeamDto,
  TeamPaginationDto,
} from './dto';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team, TeamMembership } from './entities';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { validate as isUUID } from 'uuid';
import { Project } from 'src/projects/entities';
import { firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from 'src/config';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(TeamMembership)
    private readonly teamMembershipRepository: Repository<TeamMembership>,

    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) {}

  async createTeam(createTeamDto: CreateTeamDto) {
    try {
      const team = this.teamRepository.create(createTeamDto);
      await this.teamRepository.save(team);
      return team;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async findOne(searching_term: string) {
    let team: Team;
    try {
      if (isUUID(searching_term)) {
        team = await this.teamRepository.findOne({
          where: { id: searching_term },
        });
      } else {
        const queryBuilder = this.teamRepository.createQueryBuilder('teams');
        team = await queryBuilder
          .where(`UPPER(name) = :name`, {
            name: searching_term.toUpperCase(),
          })
          .getOne();
      }

      if (!team)
        throw new RpcException(`Team with term ${searching_term} not found`);

      const members = await this.teamMembershipRepository.find({
        where: { team_id: team.id },
      });

      return { ...team, members };
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async findAllTeams(teamPaginationDto: TeamPaginationDto) {
    const { limit = 10, page = 1 } = teamPaginationDto;
    try {
      const total = await this.teamRepository.count();
      return {
        data: await this.teamRepository.find({
          take: limit,
          skip: (page - 1) * limit,
          relations: {
            tasks: true,
          },
        }),
        meta: {
          page: page,
          lastPage: Math.ceil(total / limit),
          total,
        },
      };
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async associateToProject(associateToProject: AssociateToProjectDto) {
    const { project_id, team_id } = associateToProject;

    const team = await this.findOne(team_id);

    const project = await this.projectRepository.findOne({
      where: { id: project_id },
    });

    if (!project) {
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: `Project with id ${project_id} not found`,
      });
    }

    project.team = team;

    try {
      return this.projectRepository.save(project);
    } catch (error) {
      console.error(error);
      throw new RpcException(error);
    }
  }

  async associateUser(associateUserDto: AssociateUserDto) {
    const { team_id, user_id } = associateUserDto;

    await this.findOne(team_id);

    const user = await firstValueFrom(
      this.client.send('user.find.one', user_id),
    );

    if (!user) {
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: `User with id ${user_id} not found`,
      });
    }
    try {
      const membership = this.teamMembershipRepository.create({
        team_id,
        user_id,
      });
      return this.teamMembershipRepository.save(membership);
    } catch (error) {
      console.error(error);
      throw new RpcException(error);
    }
  }
}
