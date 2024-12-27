import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssociateToProjectDto {
	@ApiProperty({ description: 'UUID of the project', format: 'uuid' })
	@IsString()
	@IsUUID()
	@IsNotEmpty()
	project_id: string;

	@ApiProperty({ description: 'UUID of the team', format: 'uuid' })
	@IsString()
	@IsUUID()
	@IsNotEmpty()
	team_id: string;
}
