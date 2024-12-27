import { IsOptional, IsUUID } from 'class-validator';
import { PaginationDto } from '../../shared/dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TeamPaginationDto extends PaginationDto {
  @IsUUID()
  @ApiProperty({
    description: 'Unique identifier for the user',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  user_id: string;

  @IsOptional()
  @ApiPropertyOptional({
    description: 'Optional project identifier',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  project_id?: string;
}
