import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('team_memberships')
export class TeamMembership {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  user_id: string;

  @Column('text')
  team_id: string;
}
