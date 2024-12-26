import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { TaskState, TaskStateList } from '../enum/tasks-status.enum';
import { Type } from 'class-transformer';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsUUID()
  assignee_id: string;

  @IsBoolean()
  is_active: boolean = true;

  @IsEnum(TaskStateList, { message: `Valid status are: ${TaskStateList}` })
  status = TaskState.TODO;

  @IsUUID()
  @IsNotEmpty()
  project_id: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  due_date: Date;
}
