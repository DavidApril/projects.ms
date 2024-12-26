import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateProjectDto } from './dto';
import { ProjectsService } from './projects.service';
import { PaginationDto } from 'src/shared/dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @MessagePattern('projects.create')
  create(@Payload() createProjectDto: CreateProjectDto) {
    return this.projectsService.createProject(createProjectDto);
  }

  @MessagePattern('projects.find.all')
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.projectsService.findAll(paginationDto);
  }

  @MessagePattern('projects.find.one')
  findOne(@Payload() searching_term: string) {
    return this.projectsService.findOne(searching_term);
  }
}
