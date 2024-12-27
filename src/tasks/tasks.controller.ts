import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateTaskDto, TaskPaginationDto, UpdateTaskDto } from './dto';
import { TasksService } from './tasks.service';
import { PaginationDto } from 'src/shared/dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @MessagePattern('tasks.create')
  create(@Payload() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

  @MessagePattern('tasks.find.all')
  findAll(@Payload() taskPaginationDto: TaskPaginationDto) {
    return this.tasksService.findAll(taskPaginationDto);
  }

  @MessagePattern('tasks.find.one')
  findOne(@Payload() searching_term: string) {
    return this.tasksService.findOne(searching_term);
  }

  @MessagePattern('tasks.update')
  update(@Payload() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.updateTask(updateTaskDto);
  }

  @MessagePattern('tasks.delete')
  delete(@Payload() id: string) {
    return this.tasksService.deleteTask(id);
  }
}
