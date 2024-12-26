import { IsOptional, IsUUID } from 'class-validator';
import { PaginationDto } from 'src/shared/dto';

export class ProjectPaginationDto extends PaginationDto {
  @IsOptional()
  @IsUUID()
  owner?: string;
}
