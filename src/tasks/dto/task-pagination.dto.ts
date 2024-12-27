import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { PaginationDto } from 'src/shared/dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { TaskState, TaskStateList } from '../enum';

export class TaskPaginationDto extends PaginationDto {
  @ApiPropertyOptional({ description: 'The UUID of the project' })
  @IsUUID()
  @IsOptional()
  project_id: string;

  @ApiPropertyOptional({ description: 'Task status' })
  @IsOptional()
  @IsEnum(TaskState, {
    message: `Valid status are ${TaskStateList}`,
  })
  status: TaskState;

  @ApiPropertyOptional({ description: 'Due date of task' })
  @IsOptional()
  @IsString()
  due_date: string;

  @ApiPropertyOptional({ description: 'The UUID of the team' })
  @IsOptional()
  @IsUUID()
  team_id: string;
}
