import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssociateUserDto {
	@ApiProperty({ description: 'UUID of the user', format: 'uuid', example: 'c8661452-f705-49ee-a4b7-d09a5d586ee4' })
	@IsString()
	@IsUUID()
	@IsNotEmpty()
	user_id: string;

	@ApiProperty({ description: 'UUID of the team', format: 'uuid', example: 'dcff4dd3-f9e0-4175-aad4-f2284cd1ce29' })
	@IsString()
	@IsUUID()
	@IsNotEmpty()
	team_id: string;
}
