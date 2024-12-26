import { CreateProjectDto } from './dto';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectPaginationDto } from './dto/project-pagination.dto';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';
import { validate as isUUID } from 'uuid';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async createProject(createProjectDto: CreateProjectDto) {
    const { name, description, owner } = createProjectDto;

    try {
      const project = this.projectRepository.create({
        name,
        description,
        owner,
      });

      await this.projectRepository.save(project);
      return project;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async findOne(searching_term: string) {
    let project: Project;
    try {
      if (isUUID(searching_term)) {
        project = await this.projectRepository.findOne({
          where: { id: searching_term },
        });
      } else {
        const queryBuilder =
          this.projectRepository.createQueryBuilder('projects');
        project = await queryBuilder
          .where(`UPPER(name) = :name`, {
            name: searching_term.toUpperCase(),
          })
          .getOne();
      }

      if (!project)
        throw new RpcException(`Project with term ${searching_term} not found`);

      return project;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async findAll(projectPaginationDto: ProjectPaginationDto) {
    const { limit = 10, page = 1 } = projectPaginationDto;
    try {
      const total = await this.projectRepository.count();
      return {
        data: await this.projectRepository.find({
          take: limit,
          skip: (page - 1) * limit,
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
}
