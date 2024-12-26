import { CreateTaskDto, UpdateTaskDto } from './dto';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/shared/dto';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';
import { Task } from './entities';
import { validate as isUUID } from 'uuid';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async createTask(createTaskDto: CreateTaskDto) {
    try {
      const task = this.taskRepository.create(createTaskDto);

      await this.taskRepository.save(task);
      return task;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async findOne(searching_term: string) {
    let task: Task;
    try {
      if (isUUID(searching_term)) {
        task = await this.taskRepository.findOne({
          where: { id: searching_term },
        });
      } else {
        const queryBuilder = this.taskRepository.createQueryBuilder('tasks');
        task = await queryBuilder
          .where(`UPPER(title) = :title`, {
            title: searching_term.toUpperCase(),
          })
          .getOne();
      }

      if (!task)
        throw new RpcException(`Task with term ${searching_term} not found`);

      return task;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async findAll(payload: { limit: number; page: number; project_id: string }) {
    const { limit = 10, page = 1, project_id } = payload;

    console.log({ payload });

    try {
      const total = await this.taskRepository.count();
      return {
        data: await this.taskRepository.find({
          take: limit,
          skip: (page - 1) * limit,
          where: { is_active: true, project_id },
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

  async updateTask(updateTaskDto: UpdateTaskDto) {
    const { id, ...to_update } = updateTaskDto;

    const task = await this.findOne(id);
    const { affected } = await this.taskRepository.update(id, to_update);
    if (affected === 0)
      throw new RpcException(`Task with id ${id} not updated`);
    return { ...task, ...to_update, id } as Task;
  }

  async deleteTask(id: string) {
    const { is_active } = await this.findOne(id);

    if (!is_active)
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: `Task with id ${id} is already deleted`,
      });

    try {
      const user = await this.updateTask({ id, is_active: false });
      return user;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
