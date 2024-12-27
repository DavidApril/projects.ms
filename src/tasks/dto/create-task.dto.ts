import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { TaskState, TaskStateList } from '../enum/tasks-status.enum';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ description: 'The title of the task' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'The description of the task' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'The UUID of the assignee' })
  @IsUUID()
  assignee_id: string;

  @ApiProperty({
    description: 'Indicates if the task is active',
    default: true,
  })
  @IsBoolean()
  is_active: boolean = true;

  @ApiProperty({
    description: 'The current status of the task',
    enum: TaskStateList,
    default: TaskState.TODO,
  })
  @IsEnum(TaskStateList, { message: `Valid status are: ${TaskStateList}` })
  status = TaskState.TODO;

  @IsUUID()
  @IsOptional()
  @ApiProperty({
    description: 'the UUID of the team this task belongs to',
    default: null,
  })
  team_id: string = null;

  @ApiProperty({ description: 'The UUID of the project this task belongs to' })
  @IsUUID()
  @IsNotEmpty()
  project_id: string;

  @ApiProperty({
    description: 'The optional due date of the task',
    type: String,
  })
  @IsString()
  @IsOptional()
  @Type(() => String)
  due_date: string;
}
