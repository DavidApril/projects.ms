import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { CreateTaskDto } from './create-task.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;
}
